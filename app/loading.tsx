export default function Loading() {
  return (
    <div className="page-loading" role="status" aria-live="polite">
      <span className="page-loading-spinner" aria-hidden />
      <span className="sr-only">페이지를 불러오는 중입니다.</span>
    </div>
  );
}
