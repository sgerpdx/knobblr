import React from "react";
import {
  screen,
  render,
  queryByAttribute,
  fireEvent,
} from "@testing-library/react";

import TactileButton from "./TactileButton";

// DOM locator for svg elements:
const getById = queryByAttribute.bind(null, "id");
// Dummy prop to pass into onClick:
const handleTestClick = () => {
  console.log("Click handler working.");
};

describe("TactileButton", () => {
  test("renders the TactileButton component", () => {
    // Render the component:
    render(
      <TactileButton
        onClick={handleTestClick}
        label="Hello world!"
        width={100}
        fillColor="blue"
        strokeColor="orange"
      />
    );
    //screen.debug();
  });

  test("renders SVG elements with correct dimensions and coordinates in TactileButton component", () => {
    const dom = render(
      <TactileButton
        onClick={handleTestClick}
        label="Good Morning"
        width={100}
        fillColor="orange"
        strokeColor="white"
      />
    );
    //screen.debug();

    // Each svg <rectangle> element's dimensions and container coordinates:
    // Top rectangle:
    const buttonUpper = getById(dom.container, "rect-upper");
    expect(buttonUpper?.getAttribute("width")).toBe("96");
    expect(buttonUpper?.getAttribute("height")).toBe("21");
    expect(buttonUpper?.getAttribute("z-index")).toBe("3");
    expect(buttonUpper?.getAttribute("x")).toBe("2");
    expect(buttonUpper?.getAttribute("y")).toBe("6");
    expect(buttonUpper?.getAttribute("rx")).toBe("5");

    // Middle rectangle:
    const buttonMiddle = getById(dom.container, "rect-middle");
    expect(buttonMiddle?.getAttribute("width")).toBe("100");
    expect(buttonMiddle?.getAttribute("height")).toBe("25");
    expect(buttonMiddle?.getAttribute("z-index")).toBe("2");
    expect(buttonMiddle?.getAttribute("x")).toBe("0");
    expect(buttonMiddle?.getAttribute("y")).toBe("6");
    expect(buttonMiddle?.getAttribute("rx")).toBe("8");

    // Bottom rectangle:
    const buttonLower = getById(dom.container, "rect-lower");
    expect(buttonLower?.getAttribute("width")).toBe("100");
    expect(buttonLower?.getAttribute("height")).toBe("25");
    expect(buttonLower?.getAttribute("z-index")).toBe("1");
    expect(buttonLower?.getAttribute("x")).toBe("0");
    expect(buttonLower?.getAttribute("y")).toBe("25");

    // The svg <text> element housing the label;
    //// Initially this test failed because the component assigns IDs based on a random number each time it renders, in order to allow for multiple instances of the TactileButton with separate color, shape and label properties; because of this, 'id' cannot be used in the same way that it is used for the rectangles above, as those are each a known static value;
    //// We are using role="label" in the svg <text> element, something which may not be correct but which allows this test to work without a mock (which may not be feasible given the random nature of the ID here):
    const buttonLabel = screen.getByRole("label").innerHTML;
    expect(buttonLabel).toBe("Good Morning");

    //
  });

  test("renders correct fill and stroke colors based on user-defined prop values", () => {
    const dom = render(
      <TactileButton
        onClick={handleTestClick}
        label="Good Morning"
        width={120}
        fillColor="mediumblue"
        strokeColor="pink"
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

    // Test the fill attribute of the button-top svg <rectangle>:
    const buttonUpper = getById(dom.container, "rect-upper");
    expect(buttonUpper?.getAttribute("fill")).toBe("rgb(51,51,236.875)");

    // Test the fill (intuitively the 'stroke' or 'color') attribute of the svg <text> element used for the button label:
    const buttonLabel = screen.getByRole("label");
    expect(buttonLabel.getAttribute("fill")).toBe("pink");
  });

  test("TactileButton calls onClick prop when clicked", () => {
    //screen.debug();

    const handleClick = jest.fn();
    render(
      <TactileButton
        onClick={handleClick}
        label="Start"
        width={80}
        fillColor="green"
        strokeColor="white"
      />
    );
    fireEvent.click(screen.getByText(/start/i));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
