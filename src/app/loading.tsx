export default function Loading() {
  return (
    <div className="container-shell flex min-h-[50vh] items-center justify-center">
      <div className="space-y-3 text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-border border-t-primary" />
        <p className="text-sm text-muted-foreground">页面加载中...</p>
      </div>
    </div>
  );
}
