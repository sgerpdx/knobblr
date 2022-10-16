import React from "react";
import { screen, render, queryByAttribute } from "@testing-library/react";

import TactileButton from "./TactileButton";

// DOM location strategy per: https://stackoverflow.com/questions/53003594/find-element-by-id-in-react-testing-library
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
    // The following can be used to see the properties of the elements (useful if they are imported from external libraries and unseen in the native component code here):
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
    //screen.debug();

    // Each svg <rectangle> element:
    expect(getById(dom.container, "rect-lower"));
    expect(getById(dom.container, "rect-middle"));
    expect(getById(dom.container, "rect-upper"));

    // The svg <text> element housing the label;
    // Initially this test failed because the component assigns IDs based on a random number each time it renders, in order to allow for multiple instances of the TactileButton with separate color, shape and label properties; because of this, 'id' cannot be used in the same way that it is used for the rectangles above, as those are each a known static value;
    // The best fix here may be to run a mock of the component, as there does not appear to be a clear-candidate aria-role to use;
    //// ***For the moment we are using role="label" in the svg <text> element, something which may not be correct but which allows this test to work without a mock:
    const buttonLabel = screen.getByRole("label").innerHTML;
    expect(buttonLabel).toBe("Good Morning");

    //
  });

  test("renders correct fill and stroke colors based on user-defined prop values", () => {
    const dom = render(
      <TactileButton
        label="Good Morning"
        width={120}
        fillColor="mediumblue"
        strokeColor="pink"
        mode="rubber"
      />
    );
    //screen.debug();

    // Test the <stop> elements within each <linearGradient> for each specific fill color in the shading palette based on the input fillColor prop:
    const lowerRectLateralArea = getById(dom.container, "lower-lateral");
    expect(lowerRectLateralArea?.getAttribute("stop-color")).toBe(
      "rgb(0,0,185.875)"
    );

    const lowerRectIntermediateArea = getById(
      dom.container,
      "lower-intermediate"
    );
    expect(lowerRectIntermediateArea?.getAttribute("stop-color")).toBe(
      "rgb(19.125,19.125,205)"
    );

    const lowerRectMedialArea = getById(dom.container, "lower-medial");
    expect(lowerRectMedialArea?.getAttribute("stop-color")).toBe(
      "rgb(31.875,31.875,217.75)"
    );

    const middleRectLateralArea = getById(dom.container, "mid-lateral");
    expect(middleRectLateralArea?.getAttribute("stop-color")).toBe(
      "rgb(31.875,31.875,217.75)"
    );

    const middleRectMedialArea = getById(dom.container, "mid-medial");
    expect(middleRectMedialArea?.getAttribute("stop-color")).toBe(
      "rgb(44.625,44.625,230.5)"
    );

    // Test the fill attribute of the button top svg rectangle:
    const buttonUpper = getById(dom.container, "rect-upper");
    expect(buttonUpper?.getAttribute("fill")).toBe("rgb(51,51,236.875)");

    // Test the fill (intuitively the 'stroke' or 'color') attribute of the svg <text> element used for the button label:
    const buttonLabel = screen.getByRole("label");
    expect(buttonLabel.getAttribute("fill")).toBe("pink");
  });
});
