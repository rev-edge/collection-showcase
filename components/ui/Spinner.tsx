// V0 stub — small loading spinner.
export default function Spinner() {
  return (
    <span
      role="status"
      aria-label="loading"
      className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
    />
  );
}
