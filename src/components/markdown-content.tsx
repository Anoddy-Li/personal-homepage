import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function MarkdownContent({
  content,
}: {
  content: string;
}) {
  return (
    <div className="prose prose-neutral max-w-none prose-headings:font-heading prose-headings:tracking-tight prose-headings:text-foreground prose-p:text-[1.03rem] prose-p:leading-8 prose-a:text-foreground prose-strong:text-foreground prose-code:rounded prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-pre:rounded-[1.5rem] prose-pre:border prose-pre:border-border/70 prose-pre:bg-[#101622] prose-blockquote:border-border prose-blockquote:text-muted-foreground">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
