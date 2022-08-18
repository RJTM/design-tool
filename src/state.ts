import { atom, PrimitiveAtom } from "jotai";

export interface TextComponent {
  type: "text";
  text: string;
  x: number;
  y: number;
}

export interface ShapeComponent {
  type: "shape";
  shape: "square" | "circle";
  x: number;
  y: number;
  size: number;
}

export type Component = TextComponent | ShapeComponent;
export type ComponentAtom = PrimitiveAtom<Component>;

export const componentsAtom = atom<ComponentAtom[]>([]);
componentsAtom.debugLabel = "componentsAtom";

export const addComponentAtom = atom(null, (_get, set, update: Component) => {
  const componentAtom = atom(update);
  set(componentsAtom, (prev) => [...prev, componentAtom]);
});

export const selectedComponentAtomAtom = atom<ComponentAtom | null>(null);

export const selectComponentAtom = atom(
  null,
  (_get, set, componentAtom: ComponentAtom) => {
    set(selectedComponentAtomAtom, componentAtom);
  }
);

export function selectedComponentCreator(componentAtom: ComponentAtom) {
  return atom((get) => {
    return componentAtom === get(selectedComponentAtomAtom);
  });
}
