import React, { useState, useEffect } from "react";
import "./RotaryKnob.css";
import { LabelData, TrigData, CurrentSelection } from "../../data/interfaces";

import { calculateKnobDimensions } from "../../utils/rotaryKnobUtils/shapeCalculation";
import {
  getTrigonometricData,
  getCoordinateData,
} from "../../utils/rotaryKnobUtils/spatialCalculation";
import {
  convertCoordinatesToAngle,
  simplifyLabelArray,
  matchAngleSelection,
} from "../../utils/rotaryKnobUtils/rotaryControl";

// consider creating an interface for the paramsData

export interface RotaryKnobProps {
  onClick?: React.DOMAttributes<HTMLDivElement>;
  diameter: number;
  labelCount: number; // the number of setting increments
  fillColor: string;
  strokeColor: string;
  padding?: number;
  startAt?: number; // def=0 (integer to increment up from for labels)
  zeroAngle?: number; // def=90 (degrees -- i.e. straight up)
  externalLabels?: boolean; // def=false (true=label position outside knob)
  labelArray?: string[]; // if present overrides labelCount/startAt
}

const RotaryKnob = (props: RotaryKnobProps) => {
  const [loading, setLoading] = useState(true);

  // Rendering setup variables based on props:
  const [rotaryKnobParams, setRotaryKnobParams] = useState({
    outerRadius: 40,
    innerRadius: 20,
    centerDistance: 50,
    containerSize: 100,
    innerCircleDistance: 30,
    pointerPath: `M 30 50 L 50 50`,
    svgFontSize: 10,
    circleCenter: { x: 0, y: 0 },
  });
  const [labelData, setLabelData] = useState<LabelData[]>([
    {
      label: 0,
      xCoord: 60,
      yCoord: 40,
      slope: 1,
      minAngleBoundary: 120,
      maxAngleBoundary: 150,
      hemisphere: "R",
    },
  ]);

  // Rotation management state variables:
  //// this was used in the demo code with a form submission:
  const [hasBeenClicked, setHasBeenClicked] = useState(false);
  const [degreeShift, setDegreeShift] = useState("rotate(0 50 50)");
  const [containerDimension, setContainerDimension] = useState(100);
  const [currentSelection, setCurrentSelection] = useState<CurrentSelection>({
    label: "0",
    degrees: 90,
  });
  //// we are not currently using this variable:
  const [clickData, setClickData] = useState({
    x: 0,
    y: 0,
    degrees: 90,
  });

  // Event handler for mouse click:
  const handleClickEvent = (event: any) => {
    const circleCenter = rotaryKnobParams.circleCenter;
    //
    const xClick = event.nativeEvent.offsetX;
    const yClick = event.nativeEvent.offsetY;
    const clickDegrees = convertCoordinatesToAngle(
      xClick,
      yClick,
      circleCenter
    );
    setClickData({ x: xClick, y: yClick, degrees: clickDegrees });
    //
    const currentDegrees = currentSelection.degrees;
    //const relevantLabelData = simplifyLabelArray(labelData);
    const rotationData = matchAngleSelection(
      clickDegrees,
      currentDegrees,
      labelData
    );
    //
    if (rotationData) {
      const target = rotationData.target - (props.zeroAngle || 90);
      console.log("Target:", target, "CircleCenter:", circleCenter);
      const newLabel = rotationData.label;
      setDegreeShift(`rotate(${target} ${circleCenter.x} ${circleCenter.y})`);
      setCurrentSelection({ label: newLabel, degrees: target });
      setHasBeenClicked(true);
    }
  };

  // Initial useEffect sets up knob dimensions as per props:
  useEffect(() => {
    setLoading(false);
    const newRotaryParams = calculateKnobDimensions(
      props.diameter,
      props.padding,
      props.externalLabels
    );
    setRotaryKnobParams(newRotaryParams);
    setContainerDimension(newRotaryParams.containerSize);
  }, []);

  useEffect(() => {
    //
    // here run the calculations for the labels (maybe should be in the first useEffect hook)
    const newTrigData: TrigData[] = getTrigonometricData(
      props.labelCount,
      props.zeroAngle || 90
    );
    console.log("NTD:", newTrigData);
    const newCoordData = getCoordinateData(
      newTrigData,
      props.diameter,
      props.padding || 0
    );
    console.log("NCD:", newCoordData);
    setLabelData(newCoordData);
  }, [rotaryKnobParams]);

  //   useEffect(() => {
  // //
  //   }, []);
  if (loading) return <h4>Loading...</h4>;
  //
  return (
    <div
      className="rotaryContainer"
      title="click to select setting"
      aria-label="rotary knob control"
      onClick={handleClickEvent}
    >
      <svg
        className="labelCircle"
        width={rotaryKnobParams.containerSize}
        height={rotaryKnobParams.containerSize}
      >
        <circle
          aria-label="rotary knob settings"
          cx={rotaryKnobParams.centerDistance}
          cy={rotaryKnobParams.centerDistance}
          r={rotaryKnobParams.outerRadius}
          fill={props.fillColor}
          stroke={props.strokeColor}
          strokeWidth="2"
        />
        <g aria-label="rotary knob top dial" transform={degreeShift}>
          <circle
            cx={rotaryKnobParams.centerDistance}
            cy={rotaryKnobParams.centerDistance}
            r={rotaryKnobParams.innerRadius}
            fill={props.fillColor}
            stroke={props.strokeColor}
            strokeWidth="2"
          />
          <path
            stroke={props.strokeColor}
            strokeWidth="4"
            d={rotaryKnobParams.pointerPath}
          />
        </g>
        <g
          fontSize={rotaryKnobParams.svgFontSize}
          fontFamily="sans-serif"
          fontWeight="normal"
          fill={props.strokeColor}
          textAnchor="middle"
        >
          {labelData?.map((label) => (
            <text
              key={label.label}
              x={label.xCoord?.toString()}
              y={label.yCoord?.toString()}
            >
              {label.label}
            </text>
          ))}
        </g>
      </svg>
    </div>
  );
};

export default RotaryKnob;
