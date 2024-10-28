const SegmentedProgressCircle = ({ progress }) => {
  const segments = 12; // Total number of segments
  const completedSegments = Math.round((progress / 100) * segments);

  const segmentArray = Array.from({ length: segments }, (_, i) => i < completedSegments);

  return (
    <div className="relative w-20 h-20 flex items-center justify-center">
      <svg className="absolute inset-0 w-full h-full transform -rotate-90">
        {segmentArray.map((completed, index) => {
          const angle = (360 / segments) * index;
          const rotation = `rotate(${angle} 50 50)`;

          return (
            <circle
              key={index}
              cx="50"
              cy="50"
              r="45"
              stroke={completed ? '#4d5bf9' : '#e0e0e0'}
              strokeWidth="10"
              strokeDasharray="25, 325"
              transform={rotation}
              fill="transparent"
            />
          );
        })}
      </svg>
      <span className="text-xl text-blue-500">{progress}%</span>
    </div>
  );
};

export default SegmentedProgressCircle;
