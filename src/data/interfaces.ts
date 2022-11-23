export interface ShadeData {
  values: string[];
  code: string;
}

export interface CircleCenter {
  x: number;
  y: number;
}

export interface LabelData {
  label: string;
  xCoord: number;
  yCoord: number;
  slope: number;
  minAngleBoundary: number;
  maxAngleBoundary: number;
  hemisphere: string;
}
