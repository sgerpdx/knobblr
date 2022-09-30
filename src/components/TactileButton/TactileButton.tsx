import React, { useState, useEffect } from "react";
import "./TactileButton.css";
import { calculateButtonDimensions } from "../../utils/tactileButtonUtils/shapeCalculation";

export interface TactileButtonProps {
  width: number;
  height?: number; //optional: defaults to [width/ * (3/4)]
  fillColor: string;
  strokeColor: string;
  mode?: string; //one of: *rubber, plastic
  label: string;
  lightingDirection?: number; //takes a number between 0 and 360 (degrees)
  travel?: string; //optional: governs downward travel of button on click (def = ___)
  sound?: boolean; //defaults to false; click sound for additional sensory feedback
}

const TactileButton = (props: TactileButtonProps) => {
  const [dimensions, setDimensions] = useState({
    width: 80,
    containerHeight: 60,
    height: 30,
    travel: 20,
    topWidth: 76,
    topHeight: 26,
    borderRadius: 4,
    xOffset: 2,
    yOffset: 5,
    labelX: 40,
    labelY: 24,
  });

  useEffect(() => {
    const newDimensions = calculateButtonDimensions(props.width);

    setDimensions({
      width: newDimensions[0],
      containerHeight: newDimensions[1],
      height: newDimensions[2],
      travel: newDimensions[3],
      topWidth: newDimensions[4],
      topHeight: newDimensions[5],
      borderRadius: newDimensions[6],
      xOffset: newDimensions[7],
      yOffset: newDimensions[8],
      labelX: newDimensions[9],
      labelY: newDimensions[10],
    });
  });

  return (
    <div>
      <button className="tactileButton">{props.label}</button>
      <svg width={dimensions.width} height={dimensions.containerHeight}>
        <defs>
          <linearGradient id="gradient-lower">
            <stop offset="4%" stop-color="#0000B3" />
            <stop offset="10%" stop-color="#0000CC" />
            <stop offset="90%" stop-color="#0000CC" />
            <stop offset="95%" stop-color="#0000B3" />
          </linearGradient>
          <linearGradient id="gradient-middle">
            <stop offset="5%" stop-color="#0000E6" />
            <stop offset="10%" stop-color="#0000FF" />
            <stop offset="90%" stop-color="#0000FF" />
            <stop offset="95%" stop-color="#0000E6" />
          </linearGradient>
        </defs>
        <rect
          x="0"
          y={dimensions.height}
          width={dimensions.width}
          height={dimensions.height}
          z-index="0"
          fill="url(#gradient-lower)"
          className="buttonLower"
        ></rect>
        <g id="top">
          <rect
            x="0"
            y={dimensions.yOffset}
            width={dimensions.width}
            height={dimensions.height}
            z-index="1"
            fill="url(#gradient-middle)"
            className="buttonMiddle"
          ></rect>
          <rect
            x={dimensions.xOffset}
            y={dimensions.yOffset}
            width={dimensions.topWidth}
            height={dimensions.topHeight}
            z-index="2"
            fill="#7F7FFF"
            className="buttonUpper"
          ></rect>
          <text
            className="buttonLabel"
            x={dimensions.labelX}
            y={dimensions.labelY}
            stroke={props.strokeColor}
            z-index="3"
            text-anchor="middle"
          >
            {props.label}
          </text>
        </g>
      </svg>
    </div>
  );
};

export default TactileButton;
