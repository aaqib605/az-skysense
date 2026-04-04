function ForecastCard({ item }) {
  return (
    <article className="rounded-2xl border border-white/20 bg-white/10 p-4 text-center text-white backdrop-blur-md">
      <p className="text-sm font-semibold">{item.day}</p>
      <img
        src={item.iconUrl}
        alt={item.description}
        className="mx-auto my-3 h-14 w-14 object-contain"
      />
      <p className="text-lg font-bold">{item.temp}</p>
      <p className="mt-1 text-xs text-white/75 capitalize">
        {item.description}
      </p>
    </article>
  );
}

export default ForecastCard;
