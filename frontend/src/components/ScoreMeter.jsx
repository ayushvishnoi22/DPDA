function ScoreMeter({ score }) {
  const color =
    score >= 80
      ? "bg-green-500"
      : score >= 50
      ? "bg-yellow-400"
      : "bg-red-500";

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">Compliance Score: {score}/100</h3>
      <div className="w-full h-4 bg-gray-200 rounded-full">
        <div
          className={`${color} h-4 rounded-full transition-all duration-700`}
          style={{ width: `${score}%` }}
        ></div>
      </div>
    </div>
  );
}

export default ScoreMeter;
