import { Moon } from "lucide-react";

function Header() {
  return (
    <header className="mb-6 flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
          SkySense
        </h1>
        <p className="mt-1 text-sm text-white/80">Weather at a glance</p>
      </div>

      <button
        type="button"
        aria-label="Toggle theme"
        className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/15"
      >
        <Moon size={20} />
      </button>
    </header>
  );
}

export default Header;
