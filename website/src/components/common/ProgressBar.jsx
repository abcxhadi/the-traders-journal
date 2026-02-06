const ProgressBar = ({ current, total }) => {
  const percentage = Math.round((current / total) * 100);
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <div className="recording-dot"></div>
          <p className="text-xs font-mono uppercase tracking-wider">
            Question {current}/{total}
          </p>
        </div>
        <p className="text-xs font-mono">{percentage}%</p>
      </div>
      <div className="progress-ruler">
        <div
          className="progress-fill"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;