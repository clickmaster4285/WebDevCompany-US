export function Footer() {
  return (
    <footer className="relative border-t border-white/8 bg-surface-1 py-16">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 text-ink">
              <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-md bg-violet/15 ring-1 ring-violet/40">
                <span className="h-2 w-2 rounded-sm bg-violet" />
              </span>
              <span className="text-sm font-semibold tracking-wide">NOCTURNE<span className="text-violet">.</span></span>
            </div>
            <p className="mt-6 max-w-xs text-sm text-ink-mute">
              A premium web development studio crafting cinematic digital products.
            </p>
          </div>
          {[
            ["Studio", ["About", "Process", "Careers", "Journal"]],
            ["Services", ["Web Development", "UI/UX Design", "Web Applications", "Performance"]],
            ["Contact", ["studio@nocturne.dev", "Berlin · Lisbon", "Available Q2 2026", "@nocturne_studio"]],
          ].map(([h, items]) => (
            <div key={h as string}>
              <div className="text-xs uppercase tracking-widest text-ink-mute">{h as string}</div>
              <ul className="mt-5 space-y-3 text-sm text-ink-soft">
                {(items as string[]).map((x) => (
                  <li key={x}><a className="hover:text-violet-soft" href="#">{x}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-white/8 pt-8 text-xs text-ink-mute">
          <div>© {new Date().getFullYear()} Nocturne Studio. All rights reserved.</div>
          <div className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-violet" />
            Currently accepting two new projects
          </div>
        </div>
      </div>
    </footer>
  );
}