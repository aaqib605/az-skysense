function ErrorState({ message }) {
  return (
    <div className="app-error-panel rounded-3xl p-8 text-center backdrop-blur-md">
      <h3 className="mb-2 text-lg font-semibold">Something went wrong</h3>
      <p className="text-sm">{message}</p>
    </div>
  );
}

export default ErrorState;
