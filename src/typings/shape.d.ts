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
  };

  export type SimpleLine = {
    id: string;
    type: 'simpleLine';
  };

  export type Area = {
    id: string;
    type: 'area';
  };

  export type Image = {
    id: string;
    type: 'image';
  };

  export type Rule = {
    id: string;
    type: 'rule';
    x: number;
    y: number;
  };

  export type Eraser = {
    id: string;
    type: 'eraser';
  };
}
