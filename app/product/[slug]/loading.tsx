export default function Loading() {
  return (
    <div className="mx-auto max-w-page space-y-4 px-4 py-6" role="status" aria-label="লোড হচ্ছে…">
      <div className="skeleton h-4 w-40" />
      <div className="skeleton h-28 w-full" />
      <div className="skeleton h-[28rem] w-full" />
    </div>
  );
}
