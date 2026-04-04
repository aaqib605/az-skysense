function ErrorState({ message }) {
  return (
    <div className="rounded-3xl border border-red-200/30 bg-red-500/10 p-8 text-center text-white backdrop-blur-md">
      <h3 className="mb-2 text-lg font-semibold">Something went wrong</h3>
      <p className="text-sm text-white/85">{message}</p>
    </div>
  );
}

export default ErrorState;
