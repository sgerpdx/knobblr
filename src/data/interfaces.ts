export interface ShadeData {
  values: string[];
  code: string;
}

export interface CircleCenter {
  x: number;
  y: number;
}

export interface TrigData {
  sin: number;
  cos: number;
  tan: number;
  quadrant: number;
  degrees: number;
  radians: number;
}

export interface LabelData {
  label: string | number | null;
  xCoord: string | number | null;
  yCoord: string | number | null;
  slope: string | number | null;
  minAngleBoundary: number | null;
  maxAngleBoundary: number | null;
  hemisphere: string;
}

export interface CurrentSelection {
  label: string | number | null;
  degrees: number;
}
