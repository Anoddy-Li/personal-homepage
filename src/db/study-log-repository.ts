import type { SupabaseClient } from "@supabase/supabase-js";

import type { Database, StudyLogRow } from "@/db/database.types";
import { AppError } from "@/lib/app-error";

export interface StudyLog {
  authorId: string | null;
  content: string;
  createdAt: string;
  date: string;
  durationMinutes: number | null;
  id: string;
  isPublic: boolean;
  mood: string | null;
  slug: string;
  summary: string;
  tags: string[];
  title: string;
  updatedAt: string;
}

export interface StudyLogListFilters {
  date?: string;
  q?: string;
  tag?: string;
  visibility?: "all" | "public" | "private";
}

export interface StudyLogWriteInput {
  authorId?: string | null;
  content: string;
  date: string;
  durationMinutes: number | null;
  isPublic: boolean;
  mood: string | null;
  slug: string;
  summary: string;
  tags: string[];
  title: string;
}

export interface StudyLogRepository {
  create(input: StudyLogWriteInput): Promise<StudyLog>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<StudyLog | null>;
  findBySlug(slug: string): Promise<StudyLog | null>;
  findPublicBySlug(slug: string): Promise<StudyLog | null>;
  listAdmin(filters: StudyLogListFilters): Promise<StudyLog[]>;
  listPublic(filters: StudyLogListFilters): Promise<StudyLog[]>;
  update(id: string, input: Partial<StudyLogWriteInput>): Promise<StudyLog>;
}

type StudyLogQuery = ReturnType<SupabaseClient<Database>["from"]>;

function mapStudyLog(row: StudyLogRow): StudyLog {
  return {
    authorId: row.author_id,
    content: row.content,
    createdAt: row.created_at,
    date: row.date,
    durationMinutes: row.duration_minutes,
    id: row.id,
    isPublic: row.is_public,
    mood: row.mood,
    slug: row.slug,
    summary: row.summary,
    tags: row.tags,
    title: row.title,
    updatedAt: row.updated_at,
  };
}

function applyCommonFilters(
  query: StudyLogQuery,
  filters: StudyLogListFilters,
) {
  let nextQuery = query;

  if (filters.date) {
    nextQuery = nextQuery.eq("date", filters.date);
  }

  if (filters.tag) {
    nextQuery = nextQuery.contains("tags", [filters.tag]);
  }

  if (filters.q) {
    const escaped = filters.q.replaceAll("%", "");
    nextQuery = nextQuery.or(
      `title.ilike.%${escaped}%,summary.ilike.%${escaped}%,content.ilike.%${escaped}%`,
    );
  }

  return nextQuery.order("date", { ascending: false }).order("created_at", {
    ascending: false,
  });
}

function assertNoQueryError(error: { message: string } | null) {
  if (error) {
    throw new AppError(500, error.message);
  }
}

export function createSupabaseStudyLogRepository(
  client: SupabaseClient<Database>,
): StudyLogRepository {
  return {
    async create(input) {
      const { data, error } = (await client
        .from("study_logs")
        .insert({
          author_id: input.authorId ?? null,
          content: input.content,
          date: input.date,
          duration_minutes: input.durationMinutes,
          is_public: input.isPublic,
          mood: input.mood,
          slug: input.slug,
          summary: input.summary,
          tags: input.tags,
          title: input.title,
        })
        .select("*")
        .single()) as {
        data: StudyLogRow | null;
        error: { message: string } | null;
      };

      assertNoQueryError(error);
      if (!data) {
        throw new AppError(500, "Study log creation returned no data.");
      }

      return mapStudyLog(data);
    },
    async delete(id) {
      const { error } = await client.from("study_logs").delete().eq("id", id);

      assertNoQueryError(error);
    },
    async findById(id) {
      const { data, error } = (await client
        .from("study_logs")
        .select("*")
        .eq("id", id)
        .maybeSingle()) as {
        data: StudyLogRow | null;
        error: { message: string } | null;
      };

      assertNoQueryError(error);

      return data ? mapStudyLog(data) : null;
    },
    async findBySlug(slug) {
      const { data, error } = (await client
        .from("study_logs")
        .select("*")
        .eq("slug", slug)
        .maybeSingle()) as {
        data: StudyLogRow | null;
        error: { message: string } | null;
      };

      assertNoQueryError(error);

      return data ? mapStudyLog(data) : null;
    },
    async findPublicBySlug(slug) {
      const { data, error } = (await client
        .from("study_logs")
        .select("*")
        .eq("slug", slug)
        .eq("is_public", true)
        .maybeSingle()) as {
        data: StudyLogRow | null;
        error: { message: string } | null;
      };

      assertNoQueryError(error);

      return data ? mapStudyLog(data) : null;
    },
    async listAdmin(filters) {
      let query = client.from("study_logs").select("*");

      if (filters.visibility === "public") {
        query = query.eq("is_public", true);
      }

      if (filters.visibility === "private") {
        query = query.eq("is_public", false);
      }

      const { data, error } = (await applyCommonFilters(query, filters)) as {
        data: StudyLogRow[] | null;
        error: { message: string } | null;
      };

      assertNoQueryError(error);

      return (data ?? []).map(mapStudyLog);
    },
    async listPublic(filters) {
      const query = client.from("study_logs").select("*").eq("is_public", true);
      const { data, error } = (await applyCommonFilters(query, filters)) as {
        data: StudyLogRow[] | null;
        error: { message: string } | null;
      };

      assertNoQueryError(error);

      return (data ?? []).map(mapStudyLog);
    },
    async update(id, input) {
      const { data, error } = (await client
        .from("study_logs")
        .update({
          author_id: input.authorId,
          content: input.content,
          date: input.date,
          duration_minutes: input.durationMinutes,
          is_public: input.isPublic,
          mood: input.mood,
          slug: input.slug,
          summary: input.summary,
          tags: input.tags,
          title: input.title,
        })
        .eq("id", id)
        .select("*")
        .single()) as {
        data: StudyLogRow | null;
        error: { message: string } | null;
      };

      assertNoQueryError(error);
      if (!data) {
        throw new AppError(500, "Study log update returned no data.");
      }

      return mapStudyLog(data);
    },
  };
}
