import { MapPin, Search } from "lucide-react";

function SearchSection() {
  return (
    <section className="mb-5">
      <div className="flex flex-col gap-3 md:flex-row">
        <div className="relative flex-1">
          <Search
            size={18}
            className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search for a city..."
            className="h-12 w-full rounded-2xl border border-white/20 bg-white px-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-white/40"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            className="h-12 rounded-2xl bg-slate-900 px-5 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Search
          </button>

          <button
            type="button"
            aria-label="Use current location"
            className="flex h-12 items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-4 text-white backdrop-blur-md transition hover:bg-white/15"
          >
            <MapPin size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}

export default SearchSection;
