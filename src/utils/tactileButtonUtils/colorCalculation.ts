// This file will house functions to process color inputs and generate shading palettes.

// Dictionary object containing all name-defined html colors:
import { htmlColors } from "../../data/htmlColors";
import { ShadeData } from "../../data/interfaces";

//// NEW: The percentageArr for the adjustment will be defined by itself here, and then called in the other functions. This in part because we want to be able to edit it in one place.
//// Part of this is an outgrowth of the need to address the unsatisfactory adjustment/palette results from uniform logic being applied to super saturated/desaturated colors, e.g. html 'red' with its 255/0/0 rgb defaults;
//// What we want to do is take any incoming 255 and reduce it by the highest percentage value, e.g. if said value is 0.125 then we reduce 255 by that much, so that it can be increased noticeably to its max lightness (the top of the button);
//// Likewise any incoming 0 will be increased so that the lowest percentage can be taken out with an appreciable reduction;
//// All of this means that the output array (from generateShadingPalette) will need an additional value -- the 'adjusted base value' from which the lighter/darker shades are calculated. This additional value will replace {props.fillColor} in the svg code.
const percentageArray = [-0.075, 0, 0.05, 0.1, 0.125];

// This function edits the base/input color to give it room to lighten/darken by stepping down any 255 rgb values and stepping up any 0 rgb values:
export const adjustBaseColor = (rgbArr: string[]) => {
  let adjustedArr: any = [];
  rgbArr?.forEach((item) => {
    let currentValue = Number(item);
    if (currentValue === 255) {
      const highestIncrement = percentageArray[percentageArray.length - 1];
      // reduce value so that it has room to increase
      currentValue = 255 * (1 - highestIncrement);
    } else if (currentValue === 0) {
      const lowestIncrement = percentageArray[0];
      // increase value so that it has room to decrease
      currentValue = 0 - 255 * lowestIncrement;
    }
    adjustedArr.push(currentValue);
  });
  return adjustedArr;
};

const rgbStringify = (rgbValues: string[]) => {
  return "rgb(" + rgbValues[0] + "," + rgbValues[1] + "," + rgbValues[2] + ")";
};

// Take in hex string and return rbg values as array and string:
//// ...also -- we want to ignore the 'a' in an rgba color without that breaking the function;
export const convertHexColor = (hex: string) => {
  let hexArr = [];
  let rgbArr: any = [];
  hexArr.push(hex.slice(1, 3), hex.slice(3, 5), hex.slice(5, 7));
  hexArr.forEach((item) => {
    rgbArr.push(parseInt(item, 16));
  });
  const rgbArrAdjusted = adjustBaseColor(rgbArr);
  const rgbString = rgbStringify(rgbArrAdjusted);
  // const convertedData: ShadeData = {
  //   values: rgbArrAdjusted,
  //   code: "rgb(" + rgbArr[0] + "," + rgbArr[1] + "," + rgbArr[2] + ")",
  // };
  // return convertedData;
  return {
    values: rgbArrAdjusted,
    code: rgbString,
  };
};

export const splitHexToArray = (hex: string) => {
  let hexArr = [];
  hexArr.push(hex.slice(1, 3), hex.slice(3, 5), hex.slice(5, 7));
  return hexArr;
};

export const findByColorId = (data: any, id: string) => {
  const colorKeys = Object.keys(data);
  const colorValues = Object.values(data);
  for (let i = 0; i < colorKeys.length; i++) {
    if (colorKeys[i].toLowerCase() === id) return colorValues[i];
  }
  console.log("Error: Color name not found.");
  return "No color match.";
};

// This function converts input to rgb and returns formatted ShadeData object:
export const formatColor = (color: string) => {
  console.log("Input Color:", color);
  // here we need to differentiate between 'red' and 'rgb'
  if (color[0].toLowerCase() === "r" && color[1].toLowerCase() === "g") {
    // pass through rgb string and also split out into array
    const rgbArr: any = color.match(/\d+/g);
    const rgbArrAdjusted: any = adjustBaseColor(rgbArr);
    const rgbString = rgbStringify(rgbArrAdjusted);
    return {
      values: rgbArrAdjusted,
      code: rgbString,
    };
  } else if (color[0].toLowerCase() === "#") {
    // convert hex to rgb and return values array + string
    const rgbData: ShadeData = convertHexColor(color);
    return rgbData;
  } else {
    console.log("Couch:", color[0].toLowerCase());
    // search dictionary of html colors to return hex string:
    const currentHexColor: any = findByColorId(htmlColors, color);
    // convert hex string to rgb array + string
    //// TODO: Error-handling for color names that are N/A
    const rgbData: ShadeData = convertHexColor(currentHexColor);
    console.log("RGBoutput:", rgbData.code);
    return rgbData;
  }
};

// This takes in an rgb array (e.g. ['143', '35', '255']) and % increment as a decimal (e.g. 0.15 for 15%) and increases r, g, and b each by that percent (***of 255***) up to 255 or down to 0:
//// TODO: currently a negative increment is yielding negative output although it does not appear to be affecting the designed functionality by the eye test -- still this needs to be looked into;
export const adjustColor = (rgbArr: string[], increment: number) => {
  const adjustedArr: any = []; // Lightened rgb values
  const incrementAmount = 255 * increment;
  //// **** it's rgbArr that is not getting into this function correctly ***
  // We will lighten the color by increasing the value by 15% of 255 (38.25)
  // However we do not want to exceed 255 because that is the max value
  //// * this is the part that is broken -- the r/g/b values *
  rgbArr?.forEach((item) => {
    const currentValue = Number(item);
    const percentOf255 = currentValue / 255;
    if (percentOf255 > increment && percentOf255 < 1 - increment) {
      const adjustedValue = currentValue + incrementAmount;
      adjustedArr.push(adjustedValue);
    } else if (percentOf255 <= increment) {
      adjustedArr.push("0");
    } else {
      adjustedArr.push("255");
    }
  });
  adjustedArr.push(
    "rgb(" + adjustedArr[0] + "," + adjustedArr[1] + "," + adjustedArr[2] + ")"
  );
  return adjustedArr;
};

// Takes in an rgb array (e.g. ['143', '35', '255']) and returns an array of arrays that are lighter and/or darker variations on the input based on the 'percentageArray' defined in the function:
export const generateShadingPalette = (rgbArr: string[]) => {
  // return an array of lighter and/or darker shades of input color to use in 3D shading effects
  // const percentageArray = [-0.075, -0.05, 0.05, 0.125];
  let colorArray: any = [];
  for (let i = 0; i < percentageArray.length; i++) {
    //
    const colorSubArray = adjustColor(rgbArr, percentageArray[i]);

    //
    colorArray.push(colorSubArray);
  }
  console.log("Waffle:", colorArray);
  return colorArray; // This should be an array of arrays of all numbers
};
