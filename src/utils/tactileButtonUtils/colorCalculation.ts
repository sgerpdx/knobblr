// This file will house functions to process color inputs and generate shading palettes.

// Dictionary object containing all name-defined html colors:
import { htmlColors } from "../../data/htmlColors";
import { ShadeData } from "../../data/interfaces";

// Take in hex string and return rbg values as array and string:
//// ...also -- we want to ignore the 'a' in an rgba color without that breaking the function;
export const convertHexColor = (hex: string) => {
  let hexArr = [];
  let rgbArr: any = [];
  hexArr.push(hex.slice(1, 3), hex.slice(3, 5), hex.slice(5, 7));
  hexArr.forEach((item) => {
    rgbArr.push(parseInt(item, 16));
  });
  const convertedData: ShadeData = {
    values: rgbArr,
    code: "rgb(" + rgbArr[0] + "," + rgbArr[1] + "," + rgbArr[2] + ")",
  };
  return convertedData;
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

export const formatColor = (color: string) => {
  console.log("Input Color:", color);
  const firstChar = color.charAt(0);
  const secondChar = color.charAt(1);
  // here we need to differentiate between 'red' and 'rgb'
  if (firstChar.toLowerCase() === "r" && secondChar.toLowerCase() === "g") {
    // pass through rgb string and also split out into array
    const rgbArr: any = color.match(/\d+/g);
    const rgbData: ShadeData = {
      values: rgbArr,
      code: color,
    };
    return rgbData;
  } else if (firstChar === "#") {
    // convert hex to rgb and return values array + string
    const rgbData: ShadeData = convertHexColor(color);
    return rgbData;
  } else {
    console.log("Couch:", firstChar);
    // search dictionary of html colors to return hex string:
    const currentColor: any = findByColorId(htmlColors, color);
    // convert hex string to rgb array + string
    //// TODO: Error-handling for color names that are N/A
    const rgbData: ShadeData = convertHexColor(currentColor);
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
  const percentageArray = [-0.075, -0.05, 0.05, 0.125];
  let colorArray: any = [];
  for (let i = 0; i < percentageArray.length; i++) {
    //
    const colorSubArray = adjustColor(rgbArr, percentageArray[i]);

    //
    colorArray.push(colorSubArray);
  }
  return colorArray; // This should be an array of arrays of all numbers
};
