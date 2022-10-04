import React, { useState, useEffect } from "react";
import "./TactileButton.css";
import { calculateButtonDimensions } from "../../utils/tactileButtonUtils/shapeCalculation";
import {
  convertHexToRGB,
  adjustColor,
  generateShadingPalette,
} from "../../utils/tactileButtonUtils/colorCalculation";

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
    borderRadiusTop: 4,
    borderRadiusMiddle: 6,
    xOffset: 2,
    yOffset: 5,
    labelX: 40,
    labelY: 24,
  });
  //const [topColor, setTopColor] = useState(props.fillColor);
  const [colors, setColors] = useState([
    "#0000E6",
    "#1A1AFF",
    "#3333FF",
    "#4D4DFF",
  ]);

  useEffect(() => {
    // shape
    const newDimensions = calculateButtonDimensions(props.width);
    setDimensions({
      width: newDimensions[0],
      containerHeight: newDimensions[1],
      height: newDimensions[2],
      travel: newDimensions[3],
      topWidth: newDimensions[4],
      topHeight: newDimensions[5],
      borderRadiusTop: newDimensions[6],
      borderRadiusMiddle: newDimensions[7],
      xOffset: newDimensions[8],
      yOffset: newDimensions[9],
      labelX: newDimensions[10],
      labelY: newDimensions[11],
    });

    // color
    const newFill = props.fillColor;
    const rgbFill = convertHexToRGB(newFill);
    //setTopColor(rgbFill[1]);
    const colorVariationsArr = generateShadingPalette(rgbFill[0]);
    // this code is extremely clunky -- there was a previous utils issue that this was temporarily accounting for; said issue needs to be investigated further and fixed
    setColors([
      "rgb(" +
        colorVariationsArr[0][0] +
        "," +
        colorVariationsArr[0][1] +
        "," +
        colorVariationsArr[0][2] +
        ")",
      "rgb(" +
        colorVariationsArr[1][0] +
        "," +
        colorVariationsArr[1][1] +
        "," +
        colorVariationsArr[1][2] +
        ")",
      "rgb(" +
        colorVariationsArr[2][0] +
        "," +
        colorVariationsArr[2][1] +
        "," +
        colorVariationsArr[2][2] +
        ")",
      "rgb(" +
        colorVariationsArr[3][0] +
        "," +
        colorVariationsArr[3][1] +
        "," +
        colorVariationsArr[3][2] +
        ")",
    ]);
  });

  return (
    <div>
      <button className="tactileButton">{props.label}</button>
      <svg width={dimensions.width} height={dimensions.containerHeight}>
        <defs>
          <linearGradient id="gradient-lower">
            <stop offset="5%" stop-color={colors[0]} />
            <stop offset="7%" stop-color={props.fillColor} />
            <stop offset="10%" stop-color={colors[1]} />
            <stop offset="90%" stop-color={colors[1]} />
            <stop offset="93%" stop-color={props.fillColor} />
            <stop offset="96%" stop-color={colors[0]} />
          </linearGradient>
          <linearGradient id="gradient-middle">
            <stop offset="5%" stop-color={colors[1]} />
            <stop offset="10%" stop-color={colors[2]} />
            <stop offset="90%" stop-color={colors[2]} />
            <stop offset="95%" stop-color={colors[1]} />
          </linearGradient>
        </defs>

        <rect
          x="0"
          y={dimensions.height}
          width={dimensions.width}
          height={dimensions.height}
          z-index="1"
          fill="url(#gradient-lower)"
          className="buttonLower"
        ></rect>

        <g id="top">
          <rect
            x="0"
            y={dimensions.yOffset}
            width={dimensions.width}
            height={dimensions.height}
            z-index="2"
            fill="url(#gradient-middle)"
            rx={dimensions.borderRadiusMiddle}
            className="buttonMiddle"
          ></rect>
          <rect
            x={dimensions.xOffset}
            y={dimensions.yOffset}
            width={dimensions.topWidth}
            height={dimensions.topHeight}
            z-index="3"
            fill={colors[3]}
            rx={dimensions.borderRadiusTop}
            className="buttonUpper"
          ></rect>
          <text
            className="buttonLabel"
            x={dimensions.labelX}
            y={dimensions.labelY}
            stroke={props.strokeColor}
            z-index="4"
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
