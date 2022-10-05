// This file will house functions to process color inputs and generate shading palettes.

//// TODO: This function needs to be expanded to also handle word-based color inputs, e.g. 'blue'
//// ...its function will then be simply to take in a string and return an rgb color;
//// ...also -- we want to ignore the 'a' in an rgba color without that breaking the function;
export const convertHexToRGB = (hex: string) => {
  // return RGB
  let hexArr = [];
  let rgbArr: any = [];
  hexArr.push(hex.slice(1, 3), hex.slice(3, 5), hex.slice(5, 7));
  hexArr.forEach((item) => {
    rgbArr.push(parseInt(item, 16));
  });
  return [rgbArr, "rgb(" + rgbArr[0] + "," + rgbArr[1] + "," + rgbArr[2] + ")"];
};

// const convertRGBToHex = (rgb: string) => {
//   // return hex
//   // not currently needed -- we are accepting hex or rgb input but using rgb internally
// };

// This takes in an rgb array (e.g. ['143', '35', '255']) and % increment as a decimal (e.g. 0.15 for 15%) and increases r, g, and b each by that percent (***of 255***) up to 255 or down to 0:
//// TODO: currently a negative increment is yielding negative output although it does not appear to be affecting the designed functionality by the eye test -- still this needs to be looked into;
export const adjustColor = (rgbArr: number[], increment: number) => {
  const adjustedArr: any = []; // Lightened rgb values
  const incrementAmount = 255 * increment;
  // We will lighten the color by increasing the value by 15% of 255 (38.25)
  // However we do not want to exceed 255 because that is the max value
  rgbArr?.forEach((item) => {
    const currentValue = Number(item);
    const percentOf255 = currentValue / 255;
    if (percentOf255 > increment && percentOf255 < 1 - increment) {
      const adjustedValue = currentValue + incrementAmount;
      adjustedArr.push(adjustedValue);
    } else if (percentOf255 <= increment) {
      adjustedArr.push(0);
    } else {
      adjustedArr.push(255);
    }
  });
  adjustedArr.push(
    "rgb(" + adjustedArr[0] + "," + adjustedArr[1] + "," + adjustedArr[2] + ")"
  );
  return adjustedArr;
};

//// This function currently unused -- generateShadingPalette (below) handles instead -- this was for single-step lightening of a color by 15%
//// Notable here is regex code to extract the number values from an rgb string (color.match(/\d+/g));
// export const lightenColorInput = (color: string) => {
//   // Lighten the input color to give it a 'faded' look for mode="rubber" in TactileButton:
//   const rgbInputArr: any = color.match(/\d+/g);
//   const rgbOutputArr = adjustColor(rgbInputArr, 0.15);
//   return rgbOutputArr;
// };

// Takes in an rgb array (e.g. ['143', '35', '255']) and returns an array of arrays that are lighter and/or darker variations on the input based on the 'percentageArray' defined in the function:
export const generateShadingPalette = (rgbArr: number[]) => {
  // return an array of lighter and/or darker shades of input color to use in 3D shading effects
  const percentageArray = [-0.1, 0.05, 0.1, 0.125];
  let colorArray: any = [];
  for (let i = 0; i < percentageArray.length; i++) {
    //
    const colorSubArray = adjustColor(rgbArr, percentageArray[i]);

    //
    colorArray.push(colorSubArray);
  }
  return colorArray; // This should be an array of arrays of all numbers
};
