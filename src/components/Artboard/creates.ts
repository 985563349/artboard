export const createLineShape = (points: number[]): Shape.Line => ({
  id: crypto.randomUUID(),
  type: 'line',
  points,
  stroke: '#f40',
  strokeWidth: 10,
  tension: 0.5,
  lineCap: 'round',
});

export const createTextShape = (x: number, y: number): Shape.Text => ({
  id: crypto.randomUUID(),
  type: 'text',
  text: 'Text',
  x,
  y,
  fill: '#f40',
  fontSize: 32,
  selection: true,
});

export const createSimpleLineShape = (points: number[]): Shape.SimpleLine => ({
  id: crypto.randomUUID(),
  type: 'simpleLine',
  x: 0,
  y: 0,
  points,
  stroke: '#f40',
  strokeWidth: 10,
  lineCap: 'round',
  lineJoin: 'round',
  selection: true,
});

export const createAreaShape = (points: number[]): Shape.Area => ({
  id: crypto.randomUUID(),
  type: 'area',
  x: 0,
  y: 0,
  points,
  fill: '#00D2FF',
  stroke: 'black',
  strokeWidth: 10,
  closed: true,
  selection: true,
});

export const createRulerShape = (points: number[]): Shape.Rule => ({
  id: crypto.randomUUID(),
  type: 'ruler',
  x: 0,
  y: 0,
  points,
  stroke: '#f40',
  strokeWidth: 10,
  lineCap: 'round',
  lineJoin: 'round',
  selection: true,
});

export const createEraserShape = (points: number[]): Shape.Eraser => ({
  id: crypto.randomUUID(),
  type: 'eraser',
  points,
  stroke: '#df4b26',
  strokeWidth: 10,
  tension: 0.5,
  lineCap: 'round',
  globalCompositeOperation: 'destination-out',
});
