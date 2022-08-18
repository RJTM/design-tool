import { useAtom, useAtomValue } from "jotai";
import {
  addComponentAtom,
  componentsAtom,
  ShapeComponent,
  TextComponent,
} from "./state";

const DEFAULT_TEXT: TextComponent = {
  text: "hehe",
  type: "text",
  x: 0,
  y: 0,
};

const DEFAULT_SQUARE: ShapeComponent = {
  type: "shape",
  shape: "square",
  x: 0,
  y: 0,
  size: 100,
};

const DEFAULT_CIRCLE: ShapeComponent = {
  type: "shape",
  shape: "circle",
  x: 0,
  y: 0,
  size: 100,
};

export function LeftBar() {
  const [, addComponent] = useAtom(addComponentAtom);

  return (
    <div className="bg-gray-600">
      <button onClick={() => addComponent(DEFAULT_TEXT)}>Text</button>
      <button onClick={() => addComponent(DEFAULT_SQUARE)}>Square</button>
      <button onClick={() => addComponent(DEFAULT_CIRCLE)}>Circle</button>
    </div>
  );
}
