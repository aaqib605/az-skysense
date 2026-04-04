function LoadingState() {
  return (
    <div className="rounded-3xl border border-white/20 bg-white/10 p-8 text-center text-white backdrop-blur-md">
      <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-white/30 border-t-white" />
      <p className="text-sm font-medium text-white/90">
        Fetching weather data...
      </p>
    </div>
  );
}

export default LoadingState;
