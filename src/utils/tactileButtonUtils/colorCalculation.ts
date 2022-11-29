// This file houses functions to process color inputs and generate shading palettes.

// Dictionary object containing all name-defined html colors:
import { htmlColors } from "../../data/htmlColors";
// Interface object format for data pass-through:
import { ShadeData } from "../../data/interfaces";

//// NEW: The percentageArr for the adjustment will be defined by itself here, and then called in the other functions. This in part because we want to be able to edit it in one place.
//// Part of this is an outgrowth of the need to address the unsatisfactory adjustment/palette results from uniform logic being applied to super saturated/desaturated colors, e.g. html 'red' with its 255/0/0 rgb values;
//// What we want to do is take any incoming 255 and reduce it by the highest percentage value, e.g. if said value is 0.125 then we reduce 255 by that much (12.5%), so that it can be increased noticeably to its max lightness (the top of the button);

//// Likewise any incoming 0 will be increased so that the lowest percentage can be taken out with an appreciable reduction;
const percentageArray = [-0.075, 0, 0.05, 0.1, 0.125]; // the percentages by which the color is stepped up or down

// This function edits the base/input color to give it room to lighten/darken by stepping down any 255 rgb values and stepping up any 0 rgb values:
export const adjustBaseColor = (rgbArr: string[]) => {
  let adjustedArr: any = [];
  let i = 0;
  // limiting output array to length 3 allows us to ignore the opacity('a') value in rgba inputs:
  while (i < 3) {
    let currentValue = Number(rgbArr[i]);
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
    i++;
  }
  return adjustedArr;
};

// Quickly formats an array of rgb values (["#", "#", "#"]) into a string:
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
  return {
    values: rgbArrAdjusted,
    code: rgbString,
  };
};

// Extracts values from hex color string:
export const splitHexToArray = (hex: string) => {
  let hexArr = [];
  hexArr.push(hex.slice(1, 3), hex.slice(3, 5), hex.slice(5, 7));
  return hexArr;
};

// Searches dictionary of html colors to find hex code for matching name:
//// TODO: Error-handling needs to be addressed here...
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
    // search dictionary of html colors to return hex string:
    const currentHexColor: any = findByColorId(htmlColors, color);
    // convert hex string to rgb array + string
    //// TODO: Error-handling for color names that are N/A
    const rgbData: ShadeData = convertHexColor(currentHexColor);
    return rgbData;
  }
};

// This takes in an rgb array (e.g. ['143', '35', '255']) and %-increment as a decimal (e.g. 0.15 for 15%) and increases r, g, and b each by that percent of 255; incoming values of 255 or 0 have already been stepped back from those max/min limits with the adjustBaseColor function, so there is no need for conditional sorting here:
//// TODO(possibly): currently a negative increment is yielding negative output although it does not appear to be affecting the designed functionality by the eye test -- still this needs to be looked into;
export const adjustColor = (rgbArr: string[], increment: number) => {
  const adjustedArr: any = []; // darkened or lightened rgb values
  const incrementAmount = 255 * increment;
  rgbArr?.forEach((item) => {
    const adjustedValue = Number(item) + incrementAmount;
    adjustedArr.push(adjustedValue);
  });
  adjustedArr.push(rgbStringify(adjustedArr));
  return adjustedArr;
};

// Takes in an rgb array (e.g. ['143', '35', '255']) and returns an array of arrays that are lighter and/or darker variations on the input based on the 'percentageArray' defined in the function:
export const generateShadingPalette = (rgbArr: string[]) => {
  // return an array of lighter and/or darker shades of input color to use in 3D shading effects
  let colorArray: any = [];
  for (let i = 0; i < percentageArray.length; i++) {
    //
    const colorSubArray = adjustColor(rgbArr, percentageArray[i]);

    //
    colorArray.push(colorSubArray);
  }
  //// TODO(possibly): some of the values returned here are numbers, some are strings -- why?
  return colorArray; // output format: ["#r", "#g", "#b", "rgb(#r,#g,#b)"]
};
