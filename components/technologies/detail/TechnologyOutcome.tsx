type TechnologyOutcomeProps = {
  challenge?: string;
  solution?: string;
  results?: {
    headers: string[];
    rows: Record<string, string>[];
  };
};

export function TechnologyOutcome({
  challenge,
  solution,
  results,
}: TechnologyOutcomeProps) {
  if (!challenge && !solution && !results) return null;

  return (
    <div className="mt-6 md:mt-8">
      {(challenge || solution) && (
        <div className="grid gap-4 md:gap-5 md:grid-cols-2">
          {challenge && (
            <div className="rounded-2xl border border-red-100 bg-red-50 p-4 md:p-5">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-red-500 md:text-xs md:tracking-[0.2em]">
                Challenge
              </p>

              <p className="mt-2 text-xs font-semibold leading-6 text-slate-700 md:mt-3 md:text-sm md:leading-7">
                {challenge}
              </p>
            </div>
          )}

          {solution && (
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4 md:p-5">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-600 md:text-xs md:tracking-[0.2em]">
                Solution
              </p>

              <p className="mt-2 text-xs font-semibold leading-6 text-slate-700 md:mt-3 md:text-sm md:leading-7">
                {solution}
              </p>
            </div>
          )}
        </div>
      )}

      {results && (
        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 md:mt-8">
          <div className="bg-slate-950 px-4 py-3 md:px-5 md:py-4">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-white md:text-sm md:tracking-[0.22em]">
              Results
            </p>
          </div>

          <div className="overflow-x-auto -mx-1 px-1">
            <table className="w-full min-w-[640px] border-collapse bg-white text-left md:min-w-[760px]">
              <thead className="bg-slate-100">
                <tr>
                  {results.headers.map((header) => (
                    <th
                      key={header}
                      className="px-3 py-3 text-[10px] font-black uppercase tracking-[0.15em] text-slate-500 md:px-5 md:py-4 md:text-xs md:tracking-[0.18em]"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {results.rows.map((row, rowIndex) => (
                  <tr key={rowIndex} className="border-t border-slate-100">
                    {Object.values(row).map((value, valueIndex) => (
                      <td
                        key={valueIndex}
                        className="px-3 py-3 text-xs font-medium leading-5 text-slate-600 md:px-5 md:py-4 md:text-sm md:leading-6"
                      >
                        {String(value)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}