export const calculateKnobDimensions = (
  diameter: number,
  padding?: number,
  externalLabels?: boolean
) => {
  // consider padding as percentage value if there are external labels?

  const outerRadius = diameter / 2;
  const innerRadius = outerRadius / 2;
  const centerDistance = outerRadius + (padding || 0);
  const containerSize = centerDistance * 2;
  const innerCircleDistance = centerDistance - innerRadius;
  const pointerPath = `M ${centerDistance} ${innerCircleDistance} L ${centerDistance} ${centerDistance}}`;
  const svgFontSize = outerRadius / 4;
  const circleCenter = { x: centerDistance, y: centerDistance };

  return {
    outerRadius,
    innerRadius,
    centerDistance,
    containerSize,
    innerCircleDistance,
    pointerPath,
    svgFontSize,
    circleCenter,
  };
};
