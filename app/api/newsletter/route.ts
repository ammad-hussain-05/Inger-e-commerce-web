import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

/**
 * Newsletter signup endpoint.
 *
 * Requires SMTP credentials in environment variables — see .env.example.
 * Never exposed to the client: this file only ever runs on the server.
 */

const RECIPIENT = process.env.NEWSLETTER_TO_EMAIL || 'ingerkmoore247@gmail.com'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MIN_FILL_TIME_MS = 1500

// Basic in-memory rate limit (best-effort per server instance — not a substitute
// for a durable store, but enough to blunt naive scripted abuse).
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX = 5
const hits = new Map<string, number[]>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const timestamps = (hits.get(ip) || []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS)
  timestamps.push(now)
  hits.set(ip, timestamps)
  return timestamps.length > RATE_LIMIT_MAX
}

function getClientIp(req: NextRequest): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
}

let transporter: nodemailer.Transporter | null = null

function getTransporter() {
  if (transporter) return transporter

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } = process.env
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASSWORD) return null

  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true' || Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
  })

  return transporter
}

export async function POST(req: NextRequest) {
  let body: { email?: unknown; company?: unknown; ts?: unknown }

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 })
  }

  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
  const honeypot = typeof body.company === 'string' ? body.company.trim() : ''
  const renderedAt = typeof body.ts === 'number' ? body.ts : 0

  // Silently "succeed" on bot signals so scripts don't learn anything from the response.
  if (honeypot !== '' || (renderedAt && Date.now() - renderedAt < MIN_FILL_TIME_MS)) {
    return NextResponse.json({ ok: true })
  }

  if (!email || !EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json({ ok: false, error: 'Please enter a valid email address.' }, { status: 400 })
  }

  const ip = getClientIp(req)
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: 'Too many attempts. Please try again in a few minutes.' },
      { status: 429 }
    )
  }

  const mailer = getTransporter()
  if (!mailer) {
    console.error('Newsletter signup received but SMTP is not configured (see .env.example).')
    return NextResponse.json(
      { ok: false, error: 'Signups are temporarily unavailable. Please try again later.' },
      { status: 503 }
    )
  }

  try {
    await mailer.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: RECIPIENT,
      replyTo: email,
      subject: 'New newsletter signup',
      text: `New newsletter signup: ${email}`,
      html: `<p>New newsletter signup:</p><p><strong>${email}</strong></p>`,
    })
  } catch (err) {
    console.error('Failed to send newsletter signup email:', err)
    return NextResponse.json(
      { ok: false, error: 'Something went wrong. Please try again shortly.' },
      { status: 502 }
    )
  }

  return NextResponse.json({ ok: true })
}
