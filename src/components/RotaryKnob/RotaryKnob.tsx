import React, { useState, useEffect } from "react";
import "./RotaryKnob.css";

import { calculateKnobDimensions } from "../../utils/rotaryKnob/shapeCalculation";
import {
  getTrigonometricData,
  getCoordinateData,
} from "../../utils/rotaryKnob/spatialCalculation";
// import from rotaryControl

// consider creating an interface for the paramsData

export interface RotaryKnobProps {
  // click handler provision... onClick?:
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
  const [labelData, setLabelData] = useState<(string | number | null)[][]>();

  // Rotation management state variables:
  const [hasBeenClicked, setHasBeenClicked] = useState(false);
  const [degreeShift, setDegreeShift] = useState("rotate(0 50 50");
  const [currentSelection, setCurrentSelection] = useState({
    label: "0",
    degrees: 90,
  });
  const [clickData, setClickData] = useState({
    x: 0,
    y: 0,
    degrees: 90,
  });

  // Initial useEffect sets up knob dimensions as per props:
  useEffect(() => {
    setLoading(false);
    const newRotaryParams = calculateKnobDimensions(
      props.diameter,
      props.padding,
      props.externalLabels
    );
    setRotaryKnobParams(newRotaryParams);
  }, []);

  useEffect(() => {
    //
    // here run the calculations for the labels (maybe should be in the first useEffect hook)
    const newTrigData = getTrigonometricData(
      props.labelCount,
      props.zeroAngle || 0
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

  //
  return (
    <div className="rotaryContainer">
      <svg className="labelCircle">
        <circle />
        <g>
          <circle />
          <path />
        </g>
        <g></g>
      </svg>
    </div>
  );
};

export default RotaryKnob;
