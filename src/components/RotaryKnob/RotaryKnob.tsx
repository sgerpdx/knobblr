import React, { useState, useEffect } from "react";
import "./RotaryKnob.css";

// import from rotaryControl
// import from spatialCalculation

// consider creating an interface for the paramsData

export interface RotaryKnobProps {
  // click handler provision... onClick?:
  diameter: number;
  labelCount: number; // the number of setting increments
  fillColor: string;
  strokeColor: string;
  startAt?: number; // def=0 (integer to increment up from for labels)
  zeroAngle?: number; // def=90 (degrees -- i.e. straight up)
  externalLabels?: boolean; // def=false (true=label position outside knob)
  labelArray?: string[]; // if present overrides labelCount/startAt
}

const RotaryKnob = (props: RotaryKnobProps) => {
  const [loading, setLoading] = useState(true);

  // Rendering setup variables based on props:
  const [rotaryKnobParams, setRotaryKnobParams] = useState();
  const [labelData, setLabelData] = useState();

  // Rotation management state variables:
  const [hasBeenClicked, setHasBeenClicked] = useState(false);
  const [currentSelection, setCurrentSelection] = useState({
    label: "0",
    degrees: 90,
  });
  const [clickData, setClickData] = useState({
    x: 0,
    y: 0,
    degrees: 90,
  });
  const [degreeShift, setDegreeShift] = useState(0);

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
