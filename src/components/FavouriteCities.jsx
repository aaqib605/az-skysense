import { Heart, X } from "lucide-react";

function FavouriteCities({ cities, onSelectCity, onDeleteCity }) {
  if (!cities.length) {
    return null;
  }

  return (
    <section className="mb-6">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Heart size={16} className="app-text-main fill-current" />
          <h2 className="app-text-main text-sm font-semibold">
            Favourite Cities
          </h2>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {cities.map((city) => (
          <div
            key={city}
            className="app-glass-panel group flex items-center gap-2 rounded-full px-4 py-2 text-sm backdrop-blur-md"
          >
            <button
              type="button"
              onClick={() => onSelectCity(city)}
              className="app-text-main cursor-pointer"
            >
              {city}
            </button>

            <button
              type="button"
              onClick={() => onDeleteCity(city)}
              aria-label={`Remove ${city} from favourites`}
              className="app-text-muted rounded-full transition hover:opacity-100 md:opacity-0 md:group-hover:opacity-100"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FavouriteCities;
