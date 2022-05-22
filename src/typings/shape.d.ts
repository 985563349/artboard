declare namespace Shape {
  export type Line = { type: 'line' };

  export type Text = {
    id: string;
    type: 'text';
    text: string;
    x: number;
    y: number;
    fill: string;
    fontSize: number;
  };

  export type SimpleLine = { type: 'simpleLine' };

  export type Area = { type: 'area' };

  export type Image = { type: 'image' };

  export type Rule = { id: string; type: 'rule'; x: number; y: number };

  export type Eraser = { type: 'eraser' };
}
