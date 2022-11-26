import { CircleCenter, LabelData } from "../../data/interfaces";

export const convertCoordinatesToAngle = (
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

//
export const simplifyLabelArray = (labelArr: []) => {
  let simplifiedLabelArr: [] = [];
  for (let i = 0; i < labelArr.length; i++) {
    const currentItem = labelArr[i];
    simplifiedLabelArr.push(currentItem[0], currentItem[4], currentItem[5]);
  }
  return simplifiedLabelArr;
};

// not sure if labelData can be specified as an interface, given that it is an array with complex contents -- research TypeScript docs...
export const matchAngleSelection = (
  clickDegrees: number,
  currentDegrees: number,
  labelData: LabelData[] | undefined
) => {
  if (labelData) {
    for (let i = 0; i < labelData.length; i++) {
      const currentLabelData = labelData[i];
      const maxDegrees = currentLabelData.maxAngleBoundary || 0;
      const minDegrees = currentLabelData.minAngleBoundary || 0;
      //
      // this item should be simpler to know...
      const degreesToCenter = (maxDegrees - minDegrees) / 2;
      //
      if (clickDegrees >= minDegrees && clickDegrees < maxDegrees) {
        const centerDegrees = maxDegrees - degreesToCenter;
        const rotationNeeded = centerDegrees - currentDegrees;
        console.log("///---ClickDegrees:", clickDegrees);
        console.log("***---CurrentDegrees:", currentDegrees);
        console.log("centerDeg/rotationNeeded:", centerDegrees, rotationNeeded);
        //
        return (
          {
            target: centerDegrees,
            rotation: rotationNeeded,
            label: currentLabelData.label,
          } || "Error"
        );
      } else {
        console.log(`No match for ${currentLabelData}`);
      }
    }
  } else {
    console.log("Error: LabelData undefined");
  }
};
