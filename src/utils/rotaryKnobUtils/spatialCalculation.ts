// Assume the following default settings and/or inputs from the user:
//// startingPosition(degrees<int>)
//// incrementCount(<int>)
//// knobDiameter(<int>)
//// borderPadding(<int>)

import { CircleCenter, LabelData, TrigData } from "../../data/interfaces";

// Phase One: Calculate all basic geometric and trigonometric data (i.e. ratios):

export const determineAngleQuadrant = (angle: number) => {
  //
  if (angle >= 270 && angle < 360) {
    const offsetDegrees = angle - 270;
    return [3, offsetDegrees]; // [quadrant, degrees past axis]
  } else if (angle >= 180 && angle < 270) {
    const offsetDegrees = angle - 180;
    return [2, offsetDegrees];
  } else if (angle >= 90 && angle < 180) {
    const offsetDegrees = angle - 270;
    return [1, offsetDegrees];
  } else {
    // this catches anything <90 or >360, i.e. quadrant 4:
    return [4, angle];
  }
};

export const calculateTrigonometry = (radians: number) => {
  const currentSin = Math.sin(radians);
  const currentCos = Math.cos(radians);
  const currentTan = Math.tan(radians);
  return [currentSin, currentCos, currentTan];
};

export const getTrigonometricData = (
  incrementCount: number,
  startingPosition: number
) => {
  // (1) divide the circle in degrees by the number of increments
  const standardDegreeIncrement = 360 / incrementCount;
  // (2) establish tracking variables
  let currentDegrees = startingPosition;
  let counter = 0;
  let trigData = [];
  // (3) run a loop to populate the trigData array with the trigonometric (and other related) information about the angle and point for each increment
  // here we calculate the radians past the 'most recent perpendicular' (i.e. axis) and use them to calculate trigonometric data --
  for (let i = 0; i < incrementCount; i++) {
    // write an outboard function to determine which quadrant we are in, which will allow targeting of the 'most recent perpendicular' for calculations:
    const angleQuadrantData = determineAngleQuadrant(currentDegrees); // []
    // maybe this radians calculation should just use straight degrees instead of the [1] offset number???
    //const currentRadians = (angleQuadrantData[1] * Math.PI) / 180;
    const currentRadians = (currentDegrees * Math.PI) / 180;
    // initialize an array with [sin, cos, tan] for the angle:
    let currentLabelTrigDataArray = calculateTrigonometry(currentRadians);
    let currentTrigData: TrigData = {
      sin: currentLabelTrigDataArray[0],
      cos: currentLabelTrigDataArray[1],
      tan: currentLabelTrigDataArray[2],
      quadrant: angleQuadrantData[0],
      degrees: currentDegrees,
      radians: currentRadians,
    };
    // push the array into the main output array:
    trigData.push(currentTrigData);
    // handle incrementing to set up the next run through the loop:
    counter++;
    // conditional for incrementing so that degrees resets to 0 when it reaches or exceeds 360:
    const degreesCheck = 360 - currentDegrees;
    if (degreesCheck <= standardDegreeIncrement) {
      currentDegrees = standardDegreeIncrement - degreesCheck;
    } else {
      currentDegrees = currentDegrees + standardDegreeIncrement;
    }
  }
  return trigData;
};

// Phase Two: Calculate the specific coordinates of the labels on the rotary knob based on the trigData combined with information about the center and radius of the circle:

// Catch points on the y-axis which have an undefined slope:
export const filterForVerticalSlope = (
  xCoordinate: number,
  yCoordinate: number
) => {
  if (xCoordinate === 0) return null;
  return yCoordinate / xCoordinate;
};

// Determine (x,y) for SVG relative to circleCenter -- call in getCoordinateData:
export const findAdjustedCoordinates = (
  counter: string,
  data: TrigData,
  radius: number,
  circleCenter: CircleCenter
) => {
  //
  let currentCoordinateArray = [];
  //
  //// Q2, i.e. 'upper left' -->
  if (data.quadrant === 4) {
    // calculate (x,y) using trigData...
    // Relative to the 'most recent perpendicular axis' x = adjacent (horizontal); radius = hypotenuse; cos = adjacent/hypotenuse; therefore x = cos * radius:
    const xCoord = data.cos * radius * -1;
    // Relative to the 'most recent perpendicular axis' y = opposite (vertical); radius = hypotenuse; sin = opposite/hypotenuse; therefore y = sin * radius:
    const yCoord = data.sin * radius * -1;
    // calculate the slope of the line intersecting the (x,y) point:
    const currentSlope = filterForVerticalSlope(xCoord, yCoord);
    // adjust the coordinates for center of circle (which will generally never be (0,0) in these cases):
    const adjustedXCoord = xCoord + circleCenter.x;
    const adjustedYCoord = yCoord + circleCenter.y;
    //
    // push data into output array (arr[0] i.e. 'counter' will supply the SVG with its text in cases where labels are simple integers):
    currentCoordinateArray.push(
      counter,
      adjustedXCoord,
      adjustedYCoord,
      currentSlope
    );
    //
    //// Q3, i.e. 'lower left' -->
  } else if (data.quadrant === 3) {
    const xCoord = data.cos * radius * -1;
    const yCoord = data.sin * radius * -1;
    const currentSlope = filterForVerticalSlope(xCoord, yCoord);
    const adjustedXCoord = xCoord + circleCenter.x;
    const adjustedYCoord = yCoord + circleCenter.y;
    currentCoordinateArray.push(
      counter,
      adjustedXCoord,
      adjustedYCoord,
      currentSlope
    );
    //
    //// Q4, i.e. 'lower right' -->
  } else if (data.quadrant === 2) {
    const xCoord = data.cos * radius * -1;
    const yCoord = data.sin * radius * -1;
    const currentSlope = filterForVerticalSlope(xCoord, yCoord);
    const adjustedXCoord = xCoord + circleCenter.x;
    const adjustedYCoord = yCoord + circleCenter.y;
    currentCoordinateArray.push(
      counter,
      adjustedXCoord,
      adjustedYCoord,
      currentSlope
    );
    //
    //// Q1, i.e. 'upper right' -->
  } else {
    // Note: I do no know why both of these need to be made negative, but doing so results in the correct coordinates; otherwise the points would be in Q3 (lower left)...research this...
    const xCoord = data.cos * radius * -1;
    const yCoord = data.sin * radius * -1;
    const currentSlope = filterForVerticalSlope(xCoord, yCoord);
    const adjustedXCoord = xCoord + circleCenter.x;
    const adjustedYCoord = yCoord + circleCenter.y;
    currentCoordinateArray.push(
      counter,
      adjustedXCoord,
      adjustedYCoord,
      currentSlope
    );
  }
  return currentCoordinateArray; // eg [[0, 65.3, 42.8, 1.03], ... ]
};

// Take in output of getTrigonometricData + user inputs of diameter and padding and return an array of arrays with the information needed to generate the SVG for the rotary knob and to inform state updates triggered by user click events:
export const getCoordinateData = (
  trigData: TrigData[],
  diameter: number,
  padding: number
) => {
  // (1) Determine the center of the circle in the SVG area
  // Reduce radius to 4/5 so that labels show up inside circle, not exactly on perimeter --
  const circleRadius = diameter / 2;
  // (1b) Labels need to be inside the circle, so smaller radius:
  const labelRadius = circleRadius * (4 / 5);
  const circleLabelDiff = circleRadius - labelRadius;
  const distanceFromOrigin = labelRadius + padding;
  // (1c) Coordinates calculated with adjustments for placement in circle with visually-consistent relative spacing:
  const circleCenter = {
    x: distanceFromOrigin + circleLabelDiff,
    y: distanceFromOrigin + circleLabelDiff * 1.5,
  };
  const standardAngleBoundary = 360 / trigData.length / 2; // degrees on either side of point that should map to that point on MouseEvent;
  // Initialize an output array for holding coordinates
  let coordinateDataArray = [];
  let counter = "0";
  //
  for (let i = 0; i < trigData.length; i++) {
    // Call the function to adjust the coordinates for circleCenter:
    let thisLabelSubArray = findAdjustedCoordinates(
      counter,
      trigData[i],
      labelRadius,
      circleCenter
    );
    const thisPointAngle = trigData[i].degrees;
    // Find the lower and upper boundaries for the circle segment centered on each angle, with 'null' handling undefined slopes when point is on the y-axis:
    let currentMinAngleBoundary = 0;
    if (thisPointAngle >= 330) {
      // Because angle is considered <0 but boundary is registered as >=330:
      currentMinAngleBoundary = thisPointAngle - 360;
    } else {
      // Standard calculation can be made as per:
      currentMinAngleBoundary = thisPointAngle - standardAngleBoundary;
    }
    const currentMaxAngleBoundary =
      thisPointAngle + standardAngleBoundary || null;
    // Add a semicircle-signifier to thisLabelSubArray to assist with locating the correct point give the eventual MouseEvent (L= left, C= center (y) axis, R= right) using the x-coordinate relative to zero as the determining factor:
    // Initialize a variable to track point: Left/Center(axis)/Right (see below)
    let hemisphereMarker = "";
    if (thisLabelSubArray[1] && thisLabelSubArray[1] < circleCenter.x) {
      hemisphereMarker = "L";
    } else if (thisLabelSubArray[1] && thisLabelSubArray[1] > circleCenter.x) {
      hemisphereMarker = "R";
    } else {
      hemisphereMarker = "C";
    }
    //
    const coordinateDataObject: LabelData = {
      label: thisLabelSubArray[0],
      xCoord: thisLabelSubArray[1],
      yCoord: thisLabelSubArray[2],
      slope: thisLabelSubArray[3],
      minAngleBoundary: currentMinAngleBoundary,
      maxAngleBoundary: currentMaxAngleBoundary,
      hemisphere: hemisphereMarker,
    };
    //
    coordinateDataArray.push(coordinateDataObject);
    const newCounter = Number(counter) + 1;
    counter = newCounter.toString();
  }
  return coordinateDataArray; // [[label, x, y, slope, angleMin, angleMax, hemisphere], ... ]
};
