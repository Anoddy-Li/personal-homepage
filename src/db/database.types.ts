export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      study_logs: {
        Row: {
          author_id: string | null;
          content: string;
          created_at: string;
          date: string;
          duration_minutes: number | null;
          id: string;
          is_public: boolean;
          mood: string | null;
          slug: string;
          summary: string;
          tags: string[];
          title: string;
          updated_at: string;
        };
        Insert: {
          author_id?: string | null;
          content: string;
          created_at?: string;
          date: string;
          duration_minutes?: number | null;
          id?: string;
          is_public?: boolean;
          mood?: string | null;
          slug: string;
          summary: string;
          tags?: string[];
          title: string;
          updated_at?: string;
        };
        Update: {
          author_id?: string | null;
          content?: string;
          created_at?: string;
          date?: string;
          duration_minutes?: number | null;
          id?: string;
          is_public?: boolean;
          mood?: string | null;
          slug?: string;
          summary?: string;
          tags?: string[];
          title?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

export type StudyLogRow = Database["public"]["Tables"]["study_logs"]["Row"];
