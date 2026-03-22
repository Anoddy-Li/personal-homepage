import { StudyLogEditor } from "@/components/study-log-editor";

export default function NewStudyLogPage() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">New entry</p>
        <h2 className="font-heading text-4xl font-semibold tracking-tight">Create a study log entry</h2>
      </div>
      <StudyLogEditor mode="create" />
    </div>
  );
}
