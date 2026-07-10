export function BlogsSearch() {
  return (
    <section className="layout-container px-6 md:px-18 pt-12">
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <input
          type="text"
          placeholder="Search blogs..."
          className="w-full rounded-full border text-black border-slate-200 px-5 py-3 text-sm outline-none"
        />
      </div>
    </section>
  );
}