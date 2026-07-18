type TechnologyTableProps = {
  table?: {
    headers: string[];
    rows: Record<string, string>[];
  };
};

export function TechnologyTable({ table }: TechnologyTableProps) {
  if (!table) return null;

  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 md:mt-8">
      <div className="overflow-x-auto -mx-1 px-1">
        <table className="w-full min-w-[640px] border-collapse bg-white text-left md:min-w-[760px]">
          <thead className="bg-slate-950 text-white">
            <tr>
              {table.headers.map((header) => (
                <th
                  key={header}
                  className="px-3 py-3 text-[10px] font-black uppercase tracking-[0.15em] md:px-5 md:py-4 md:text-xs md:tracking-[0.18em]"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {table.rows.map((row, rowIndex) => (
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
  );
}