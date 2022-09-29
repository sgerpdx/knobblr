import React from "react";
import { render, queryByAttribute } from "@testing-library/react";

import TestButton from "./TestButton";

// per: https://stackoverflow.com/questions/53003594/find-element-by-id-in-react-testing-library
const getById = queryByAttribute.bind(null, "id");

describe("TestButton", () => {
  test("renders the TestButton component", () => {
    render(<TestButton label="Hello world!" />);
    // can use this to see the properties of the elements (useful if they're imported and you don't know this already):
    // screen.debug();
  });

  test("renders SVG drawing in TestButton component", () => {
    const dom = render(<TestButton label="Look at this shape:" />);

    expect(getById(dom.container, "svgTestRect"));
  });
});
