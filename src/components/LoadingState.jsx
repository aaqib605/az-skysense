function LoadingState() {
  return (
    <div className="app-glass-panel rounded-3xl p-8 text-center backdrop-blur-md">
      <div className="app-loader mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4" />
      <p className="app-text-main text-sm font-medium">
        Fetching weather data...
      </p>
    </div>
  );
}

export default LoadingState;
