export interface Point {
  x: number;
  y: number;
}

export function calculateStart(a: Point, b: Point): Point {
  return {
    x: Math.min(a.x, b.x),
    y: Math.min(a.y, b.y),
  };
}

export function calculateSize(a: Point, b: Point) {
  return {
    width: Math.abs(a.x - b.x),
    height: Math.abs(a.y - b.y),
  };
}
