declare namespace Shape {
  export type Line = {
    id: string;
    type: 'line';
    points: number[];
    stroke: string;
    strokeWidth: number;
    tension: number;
    lineCap: 'butt' | 'round' | 'square';
  };

  export type Text = {
    id: string;
    type: 'text';
    text: string;
    x: number;
    y: number;
    fill: string;
    fontSize: number;
    selection: boolean;
  };

  export type SimpleLine = {
    id: string;
    type: 'simpleLine';
    x: number;
    y: number;
    points: number[];
    stroke: string;
    strokeWidth: number;
    lineCap: 'butt' | 'round' | 'square';
    lineJoin: 'round' | 'bevel' | 'miter';
    selection: boolean;
  };

  export type Area = {
    id: string;
    type: 'area';
    x: number;
    y: number;
    points: number[];
    fill: string;
    stroke: string;
    strokeWidth: number;
    closed: boolean;
    selection: boolean;
  };

  export type Image = {
    id: string;
    type: 'image';
  };

  export type Rule = {
    id: string;
    type: 'ruler';
    x: number;
    y: number;
    points: number[];
    stroke: string;
    strokeWidth: number;
    lineCap: 'butt' | 'round' | 'square';
    lineJoin: 'round' | 'bevel' | 'miter';
    selection: boolean;
  };

  export type Eraser = {
    id: string;
    type: 'eraser';
    points: number[];
    stroke: string;
    strokeWidth: number;
    tension: number;
    lineCap: 'butt' | 'round' | 'square';
    globalCompositeOperation: 'destination-out';
  };
}
