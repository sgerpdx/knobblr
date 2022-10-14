import React, { useState, useEffect } from "react";
import "./TactileButton.css";
import { calculateButtonDimensions } from "../../utils/tactileButtonUtils/shapeCalculation";
import {
  formatColor,
  generateShadingPalette,
} from "../../utils/tactileButtonUtils/colorCalculation";
import { ShadeData } from "../../data/interfaces";

// Props for user inputs during component implementation:
export interface TactileButtonProps {
  width: number;
  height?: number; //optional: defaults to [width/ * (3/4)]
  fillColor: string;
  strokeColor: string;
  mode?: string; //one of: *rubber, plastic
  label: string;
  lightingDirection?: number; //takes a number between 0 and 360 (degrees)
  travel?: string; //optional: governs downward travel of button on click; one of: *normal, low, high
  sound?: boolean; //defaults to false; click sound for additional sensory feedback
}

// Component:
const TactileButton = (props: TactileButtonProps) => {
  // Generate a unique set of random ids for each instance of the component;
  // This is necessary because otherwise, id-designated properties defined in the first (html-topmost) instance will be applied to all subsequent instances:
  const randomNum = (Math.random() * 99).toFixed(3);
  const uniqueIDs = [
    `gradient-lower-${randomNum}`,
    `gradient-middle-${randomNum}`,
    `url(#gradient-lower-${randomNum})`,
    `url(#gradient-middle-${randomNum})`,
    `label-text-${randomNum}`,
  ];

  // Lighter and/or darker variations on the input color for 3D shading effect:
  const [colors, setColors] = useState([
    "#0000B4",
    "#0000CD",
    "#1A1AE7",
    "#3333FF",
    "#4D4DFF",
  ]);

  // Function to return an array of lighter/darker shades for button:
  const handlePaletteGeneration = (rgbValues: string[]) => {
    const newPalette = generateShadingPalette(rgbValues);
    return newPalette;
  };

  // Shape
  // --> calculate button dimensions based on width prop:
  const newDimensions = calculateButtonDimensions(props.width);
  const dimensions = {
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
    fontSize: newDimensions[12],
  };

  // Color
  // --> calculate all colors for 3D effect based on fillColor prop:
  const rgbFill: ShadeData = formatColor(props.fillColor);
  const colorVariationsArr = generateShadingPalette(rgbFill.values);

  useEffect(() => {
    setColors([
      colorVariationsArr[0][3],
      colorVariationsArr[1][3],
      colorVariationsArr[2][3],
      colorVariationsArr[3][3],
      colorVariationsArr[4][3],
    ]);
  }, [props.fillColor]);

  return (
    <div title="tactile button">
      <svg
        role="button"
        aria-labelledby={uniqueIDs[4]}
        focusable="false"
        width={dimensions.width}
        height={dimensions.containerHeight}
      >
        <defs>
          <linearGradient id={uniqueIDs[0]}>
            <stop offset="5%" stopColor={colors[0]} />
            <stop offset="7%" stopColor={colors[1]} />
            <stop offset="10%" stopColor={colors[2]} />
            <stop offset="90%" stopColor={colors[2]} />
            <stop offset="93%" stopColor={colors[1]} />
            <stop offset="96%" stopColor={colors[0]} />
          </linearGradient>
          <linearGradient id={uniqueIDs[1]}>
            <stop offset="5%" stopColor={colors[2]} />
            <stop offset="10%" stopColor={colors[3]} />
            <stop offset="90%" stopColor={colors[3]} />
            <stop offset="95%" stopColor={colors[2]} />
          </linearGradient>
        </defs>

        <rect
          x="0"
          y={dimensions.height}
          width={dimensions.width}
          height={dimensions.height}
          z-index="1"
          fill={uniqueIDs[2]}
          className="buttonLower"
          id="rect-lower"
        ></rect>

        <g id="top">
          <rect
            x="0"
            y={dimensions.yOffset}
            width={dimensions.width}
            height={dimensions.height}
            z-index="2"
            fill={uniqueIDs[3]}
            rx={dimensions.borderRadiusMiddle}
            className="buttonMiddle"
            id="rect-middle"
          ></rect>
          <rect
            x={dimensions.xOffset}
            y={dimensions.yOffset}
            width={dimensions.topWidth}
            height={dimensions.topHeight}
            z-index="3"
            fill={colors[4]}
            rx={dimensions.borderRadiusTop}
            className="buttonUpper"
            id="rect-upper"
          ></rect>
          <text
            className="buttonLabel"
            x={dimensions.labelX}
            y={dimensions.labelY}
            z-index="4"
            fontFamily="monospace"
            fontSize={dimensions.fontSize}
            fontWeight="bold"
            textAnchor="middle"
            stroke="none"
            fill={props.strokeColor}
            id={uniqueIDs[4]}
            role="label"
          >
            {props.label}
          </text>
        </g>
      </svg>
    </div>
  );
};

export default TactileButton;
