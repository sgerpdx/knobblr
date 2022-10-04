export const calculateButtonDimensions = (width: number) => {
  // Compute button dimensions and coordinates based on user-input width property:
  const containerHeight = width / 2;
  const height = width / 4;
  const travel = Math.round(height * (2 / 3));
  const topWidth = width - 4;
  const topHeight = height - 4;
  const borderRadiusTop = Math.round(width * 0.05);
  const borderRadiusMiddle = Math.round(width * 0.075);
  const xOffset = 2;
  const yOffset = Math.round(containerHeight * (1 / 8));
  const labelX = width * 0.5;
  const labelY = containerHeight * 0.43;

  // Return dimensions as simple array:
  return [
    width,
    containerHeight,
    height,
    travel,
    topWidth,
    topHeight,
    borderRadiusTop,
    borderRadiusMiddle,
    xOffset,
    yOffset,
    labelX,
    labelY,
  ];
};

//module.exports = { calculateButtonDimensions };
