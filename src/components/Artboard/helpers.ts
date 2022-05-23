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

export const createRuleShape = (x: number, y: number): Shape.Rule => ({
  id: uuidv4(),
  type: 'rule',
  x,
  y,
});
