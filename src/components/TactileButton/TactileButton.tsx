import React from "react";
import "./TactileButton.css";

export interface TactileButtonProps {
  width: number;
  fillColor: string;
  strokeColor: string;
  label: string;
  mode: string;
}

const TactileButton = (props: TactileButtonProps) => {
  return (
    <div>
      <button className="tactileButton">{props.label}</button>
    </div>
  );
};

export default TactileButton;
