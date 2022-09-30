const calculateButtonDimensions = (width: number) => {
  // Compute button dimensions and coordinates based on user-input width property:
  const containerHeight = Math.round(width * (3 / 4));
  const height = containerHeight / 2;
  const travel = Math.round(height * (2 / 3));
  const topWidth = width - 4;
  const topHeight = height - 4;
  const borderRadius = Math.round(width * 0.05);
  const xOffset = width - 2;
  const yOffset = Math.round(containerHeight * (1 / 12));
  const labelX = width * 0.5;
  const labelY = containerHeight * 0.4;

  // Return dimensions as simple array:
  return [
    width,
    containerHeight,
    height,
    travel,
    topWidth,
    topHeight,
    borderRadius,
    xOffset,
    yOffset,
    labelX,
    labelY,
  ];
};

module.exports = { calculateButtonDimensions };
