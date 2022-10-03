// This file will house functions to process color inputs and generate shading palettes.

const convertHexToRGB = (hex: string) => {
  // return RGB
  let hexArr = [];
  let rgbArr: any = [];
  hexArr.push(hex.slice(1, 3), hex.slice(3, 5), hex.slice(5, 7));
  hexArr.forEach((item) => {
    rgbArr.push(parseInt(item, 16));
  });
  return "rgb(" + rgbArr[0] + "," + rgbArr[1] + "," + rgbArr[2] + ")";
};

// const convertRGBToHex = (rgb: string) => {
//   // return hex
//   // not currently needed -- we are accepting hex or rgb input but using rgb internally
// };

const adjustColor = (rgbArr: number[], increment: number) => {
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
  return adjustedArr;
};

const lightenColorInput = (color: string) => {
  // Lighten the input color to give it a 'faded' look for mode="rubber" in TactileButton:
  const rgbInputArr: any = color.match(/\d+/g);
  const rgbOutputArr = adjustColor(rgbInputArr, 0.15);
  return rgbOutputArr;
};

const generateShadingPalette = (rgbArr: number[]) => {
  // return an array of lighter and/or darker shades of input color to use in 3D shading effects
  const percentageArray = [-0.3, -0.2, -0.1, 0.1, 0.2, 0.3];
  let colorArray: any = [];
  for (let i = 0; i < percentageArray.length; i++) {
    //
    // let colorSubArray: any = [];
    const colorSubArray = adjustColor(rgbArr, percentageArray[i]);

    // colorSubArray.push(
    //   rgbArr[0] + 255 * percentageArray[i],
    //   rgbArr[1] + 255 * percentageArray[i],
    //   rgbArr[2] + 255 * percentageArray[i]
    // );
    colorArray.push(colorSubArray);
    console.log("cA:", colorArray);
  }
  return colorArray; // This should be an array of arrays of all numbers
};

module.exports = {
  convertHexToRGB,
  adjustColor,
  generateShadingPalette,
};
