import { Moon, Sun } from "lucide-react";

function Header({
  temperatureUnit,
  onToggleUnit,
  themeMode,
  onToggleTheme,
}) {
  return (
    <header className="mb-6 flex items-center justify-between">
      <div>
        <h1 className="app-text-main text-3xl font-bold tracking-tight md:text-4xl">
          SkySense
        </h1>
        <p className="app-text-muted mt-1 text-sm">Weather at a glance</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="app-glass-panel inline-flex rounded-full p-1 text-sm">
          <button
            type="button"
            onClick={() => onToggleUnit("celsius")}
            className={`rounded-full px-3 py-1.5 transition ${
              temperatureUnit === "celsius"
                ? "app-toggle-active"
                : "app-toggle-idle"
            }`}
          >
            °C
          </button>
          <button
            type="button"
            onClick={() => onToggleUnit("fahrenheit")}
            className={`rounded-full px-3 py-1.5 transition ${
              temperatureUnit === "fahrenheit"
                ? "app-toggle-active"
                : "app-toggle-idle"
            }`}
          >
            °F
          </button>
        </div>

        <button
          type="button"
          aria-label={`Switch to ${themeMode === "dark" ? "light" : "dark"} mode`}
          onClick={onToggleTheme}
          className="app-glass-panel app-text-main flex h-11 w-11 items-center justify-center rounded-full transition"
        >
          {themeMode === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  );
}

export default Header;
