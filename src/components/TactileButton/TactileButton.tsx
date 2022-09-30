import React from "react";
import "./TactileButton.css";

export interface TactileButtonProps {
  width: number;
  height?: number; //optional: defaults to [width/ * (3/4)]
  fillColor: string;
  strokeColor: string;
  mode?: string; //one of: *rubber, plastic
  label: string;
  labelPosition?: string; //one of: *on, above, below
  lightingDirection?: number; //takes a number between 0 and 360 (degrees)
  travel?: string; //optional: governs downward travel of button on click (def = ___)
  sound?: boolean; //defaults to false; click sound for additional sensory feedback
}

const TactileButton = (props: TactileButtonProps) => {
  return (
    <div>
      <button className="tactileButton">{props.label}</button>
    </div>
  );
};

export default TactileButton;
