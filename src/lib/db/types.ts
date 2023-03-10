export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          created_at: string
          github: string | null
          id: string
          username: string
        }
        Insert: {
          created_at?: string
          github?: string | null
          id: string
          username: string
        }
        Update: {
          created_at?: string
          github?: string | null
          id?: string
          username?: string
        }
      }
      prompts: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          path: string | null
          prompt: string | null
          repository: string | null
          source: string
          user: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          path?: string | null
          prompt?: string | null
          repository?: string | null
          source?: string
          user: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          path?: string | null
          prompt?: string | null
          repository?: string | null
          source?: string
          user?: string
        }
      }
      test: {
        Row: {
          created_at: string | null
          id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
        }
        Update: {
          created_at?: string | null
          id?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
