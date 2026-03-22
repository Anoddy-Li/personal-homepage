import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function StatusAlert({
  description,
  title,
  tone = "info",
}: {
  description: string;
  title: string;
  tone?: "error" | "info" | "success";
}) {
  return (
    <Alert
      className={
        tone === "error"
          ? "border-destructive/40 bg-destructive/5"
          : tone === "success"
            ? "border-emerald-600/20 bg-emerald-500/5"
            : ""
      }
    >
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
