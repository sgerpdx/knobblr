import React from "react";
import { render, queryByAttribute } from "@testing-library/react";

import TestButton from "./TestButton";

// DOM locator for svg elements:
const getById = queryByAttribute.bind(null, "id");

describe("TestButton", () => {
  test("renders the TestButton component", () => {
    render(<TestButton label="Hello world!" />);
    // screen.debug();
  });

  test("renders SVG drawing in TestButton component", () => {
    const dom = render(<TestButton label="Look at this shape:" />);

    expect(getById(dom.container, "svgTestRect"));
  });
});
