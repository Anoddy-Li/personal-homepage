import { StudyLogEditor } from "@/components/study-log-editor";

export default function NewStudyLogPage() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">新建日志</p>
        <h2 className="font-heading text-4xl font-semibold tracking-tight">创建一篇学习日志</h2>
      </div>
      <StudyLogEditor mode="create" />
    </div>
  );
}
