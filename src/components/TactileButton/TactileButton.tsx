import React from "react";
import "./TactileButton.css";

export interface TactileButtonProps {
  label: string;
}

const TactileButton = (props: TactileButtonProps) => {
  return (
    <div>
      <button className="tactileButton">{props.label}</button>
    </div>
  );
};

export default TactileButton;
