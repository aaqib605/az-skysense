import { MapPin, Search } from "lucide-react";

function SearchSection({
  query,
  setQuery,
  onSearch,
  onSelectSuggestion,
  onUseCurrentLocation,
  isLoading,
  isLocating,
  suggestions,
  isSuggestionsLoading,
}) {
  async function handleSubmit() {
    await onSearch(query);
  }

  async function handleKeyDown(event) {
    if (event.key === "Enter") {
      await onSearch(query);
    }
  }

  return (
    <section className="mb-5">
      <div className="flex flex-col gap-3 md:flex-row">
        <div className="relative flex-1">
          <Search
            size={18}
            className="app-input-icon pointer-events-none absolute top-1/2 left-4 -translate-y-1/2"
          />
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search for a city..."
            className="app-input h-12 w-full rounded-2xl px-11 text-sm outline-none transition"
          />

          {(isSuggestionsLoading || suggestions.length > 0) && (
            <div className="app-suggestions absolute top-[calc(100%+0.5rem)] left-0 right-0 z-20 overflow-hidden rounded-2xl backdrop-blur-xl">
              {isSuggestionsLoading ? (
                <p className="app-text-muted px-4 py-3 text-sm">
                  Finding matching cities...
                </p>
              ) : (
                suggestions.map((suggestion) => (
                  <button
                    key={suggestion.id}
                    type="button"
                    onClick={() => onSelectSuggestion(suggestion)}
                    className="app-suggestion-row block w-full px-4 py-3 text-left"
                  >
                    <span className="app-text-main block text-sm font-medium">
                      {suggestion.name}
                    </span>
                    <span className="app-text-soft mt-1 block text-xs">
                      {[suggestion.state, suggestion.country]
                        .filter(Boolean)
                        .join(", ")}
                    </span>
                  </button>
                ))
              )}
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading}
            className="app-button-primary h-12 rounded-2xl px-5 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-70"
          >
            Search
          </button>

          <button
            type="button"
            aria-label="Use current location"
            onClick={onUseCurrentLocation}
            disabled={isLoading}
            className="app-glass-panel app-text-main flex h-12 items-center justify-center gap-2 rounded-2xl px-4 backdrop-blur-md transition disabled:cursor-not-allowed disabled:opacity-70"
          >
            <MapPin size={18} />
            <span className="text-sm font-medium">
              {isLocating ? "Locating..." : "Use my location"}
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default SearchSection;
