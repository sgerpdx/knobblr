import React from "react";
import { render, queryByAttribute } from "@testing-library/react";

import TactileButton from "./TactileButton";

// per: https://stackoverflow.com/questions/53003594/find-element-by-id-in-react-testing-library
const getById = queryByAttribute.bind(null, "id");

describe("TactileButton", () => {
  test("renders the TestButton component", () => {
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
});
