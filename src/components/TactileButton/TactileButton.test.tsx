import React from "react";
import { render, queryByAttribute } from "@testing-library/react";

import TactileButton from "./TactileButton";

// per: https://stackoverflow.com/questions/53003594/find-element-by-id-in-react-testing-library
const getById = queryByAttribute.bind(null, "id");

describe("TactileButton", () => {
  test("renders the TactileButton component", () => {
    render(
      <TactileButton
        label="Hello world!"
        width={100}
        fillColor="blue"
        strokeColor="orange"
        mode="rubber"
      />
    );
    // can use this to see the properties of the elements (useful if they're imported and you don't know this already):
    // screen.debug();
  });

  test("renders SVG elements in TactileButton component", () => {
    const dom = render(
      <TactileButton
        label="Good Morning"
        width={100}
        fillColor="orange"
        strokeColor="white"
        mode="rubber"
      />
    );

    expect(getById(dom.container, "rect-lower"));
    expect(getById(dom.container, "rect-middle"));
    expect(getById(dom.container, "rect-upper"));
    expect(getById(dom.container, "label-text"));
  });

  // Additional test needed: mock user color input to see that correct array of color shades is generated.
});
