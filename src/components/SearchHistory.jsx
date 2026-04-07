import { Trash2, X } from "lucide-react";

function SearchHistory({ history, onClear, onSelect, onDelete }) {
  if (!history.length) return null;

  return (
    <section className="mb-6">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold text-white/90">Recent Searches</h2>

        <button
          type="button"
          onClick={onClear}
          className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-xs font-medium text-white backdrop-blur-md transition hover:bg-white/15"
        >
          <Trash2 size={14} />
          Clear history
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {history.map((city) => (
          <div
            key={city}
            className="group flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-md"
          >
            <button type="button" onClick={() => onSelect(city)} className="cursor-pointer">
              {city}
            </button>

            <button
              type="button"
              onClick={()=>onDelete(city)}
              aria-label={`Delete ${city} from search history`}
              className="rounded-full text-white/80 transition hover:text-white md:opacity-0 md:group-hover:opacity-100"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SearchHistory;
