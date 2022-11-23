import { CircleCenter, LabelData } from "../../data/interfaces";

const convertCoordinatesToAngle = (
  x: number,
  y: number,
  circleCenter: CircleCenter
) => {
  //
  const xAdjust = x - circleCenter.x;
  const yAdjust = circleCenter.y - y;
  //
  const currentAngleRadians = Math.atan(yAdjust / xAdjust);
  const currentAngleDegrees = (currentAngleRadians * 180) / Math.PI;
  //
  let relativeAngle = 0;
  //
  if (xAdjust > 0) {
    // don't need conditions here as both are the same???
    if (yAdjust > 0) relativeAngle = 180 - currentAngleDegrees;
    if (yAdjust < 0) relativeAngle = 180 - currentAngleDegrees;
  } else if (xAdjust < 0) {
    if (yAdjust > 0) relativeAngle = currentAngleDegrees * -1;
    if (yAdjust < 0) relativeAngle = 360 - currentAngleDegrees;
  } else if (xAdjust == 0) {
    if (yAdjust > 0) relativeAngle = 90;
    if (yAdjust < 0) relativeAngle = 270;
  } else if (y == 0) {
    if (yAdjust > 0) relativeAngle = 360;
    if (yAdjust < 0) relativeAngle = 180;
  }
  return relativeAngle;
};

// not sure if labelData can be specified as an interface, given that it is an array with complex contents -- research TypeScript docs...
const matchAngleSelection = (
  clickDegrees: number,
  currentDegrees: number,
  labelData: []
) => {
  for (let i = 0; i < labelData.length; i++) {
    const currentLabelData = labelData[i];
    const maxDegrees = currentLabelData[5];
    const minDegrees = currentLabelData[4];
    //
    const degreesToCenter = (maxDegrees - minDegrees) / 2;
    //
    if (clickDegrees >= minDegrees && clickDegrees < maxDegrees) {
      const centerDegrees = maxDegrees - degreesToCenter;
      const rotationNeeded = centerDegrees - currentDegrees;
      console.log("centerDeg/rotationNeeded:", centerDegrees, rotationNeeded);
      //
      return (
        {
          target: centerDegrees,
          rotation: rotationNeeded,
          label: currentLabelData[0],
        } || "Error"
      );
    } else {
      console.log(`No match for ${currentLabelData}`);
    }
  }
};

module.exports = {
  convertCoordinatesToAngle,
  matchAngleSelection,
};
