import { v4 as uuidv4 } from 'uuid';

export const createLineShape = (points: number[]): Shape.Line => ({
  id: uuidv4(),
  type: 'line',
  points,
  stroke: '#f40',
  strokeWidth: 10,
  tension: 0.5,
  lineCap: 'round',
});

export const createTextShape = (x: number, y: number): Shape.Text => ({
  id: uuidv4(),
  type: 'text',
  text: 'Text',
  x,
  y,
  fill: '#f40',
  fontSize: 32,
});

export const createSimpleLineShape = (points: number[]): Shape.SimpleLine => ({
  id: uuidv4(),
  type: 'simpleLine',
  x: 0,
  y: 0,
  points,
  stroke: '#f40',
  strokeWidth: 10,
  lineCap: 'round',
  lineJoin: 'round',
});

export const createAreaShape = (points: number[]): Shape.Area => ({
  id: uuidv4(),
  type: 'area',
  x: 0,
  y: 0,
  points,
  fill: '#00D2FF',
  stroke: 'black',
  strokeWidth: 10,
  closed: true,
});

export const createRulerShape = (points: number[]): Shape.Rule => ({
  id: uuidv4(),
  type: 'ruler',
  x: 0,
  y: 0,
  points,
  stroke: '#f40',
  strokeWidth: 10,
  lineCap: 'round',
  lineJoin: 'round',
});

export const createEraserShape = (points: number[]): Shape.Eraser => ({
  id: uuidv4(),
  type: 'eraser',
  points,
  stroke: '#df4b26',
  strokeWidth: 10,
  tension: 0.5,
  lineCap: 'round',
  globalCompositeOperation: 'destination-out',
});
