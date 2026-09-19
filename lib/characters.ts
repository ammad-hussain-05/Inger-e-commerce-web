import charactersData from './characters-data.json'

export interface Character {
  id: string
  name: string
  group: string
  role: string
  race?: string
  description: string
  deceased?: boolean
}

/** Sourced from "public/List of characters Book 3.docx". */
export const characters: Character[] = charactersData as Character[]
