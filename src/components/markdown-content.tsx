import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function MarkdownContent({
  content,
}: {
  content: string;
}) {
  return (
    <div className="prose prose-neutral max-w-none prose-headings:font-heading prose-headings:tracking-tight prose-p:text-[1.03rem] prose-p:leading-8 prose-a:text-foreground prose-strong:text-foreground">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
