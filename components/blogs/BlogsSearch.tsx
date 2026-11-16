export function BlogsSearch({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <section className="layout-container px-6 md:px-18 pt-12">
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <input
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search blogs..."
          aria-label="Search blogs"
          className="w-full rounded-full border text-black border-slate-200 px-5 py-3 text-sm outline-none"
        />
      </div>
    </section>
  );
}
