import React from "react";
import "./TestButton.css";

export interface TestButtonProps {
  label: string;
}

const TestButton = (props: TestButtonProps) => {
  return (
    <div>
      <button className="testButton">{props.label}</button>
      <svg width="200" height="200">
        <rect
          id="svgTestRect"
          width="180"
          height="90"
          fill="orange"
          stroke="blue"
        />
      </svg>
    </div>
  );
};

export default TestButton;
