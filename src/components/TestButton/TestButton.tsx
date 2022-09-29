import React from "react";
import "./TestButton.css";

export interface TestButtonProps {
  label: string;
}

const TestButton = (props: TestButtonProps) => {
  return <button className="testButton">{props.label}</button>;
};

export default TestButton;
