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

export const selectedComponentAtomsAtom = atom<ComponentAtom[]>([]);

export const selectedComponentBoundBoxAtom = atom((get) => {
  const selectedComponentAtoms = get(selectedComponentAtomsAtom);
  if (selectedComponentAtoms.length === 0) {
    return null;
  }

  const boxCoordinates = selectedComponentAtoms.reduce(
    (prev, curr) => {
      const component = get(curr);
      if (component.type === "text") {
        return prev;
      }

      const { x, y, size } = component;
      return {
        x1: Math.min(prev.x1, x),
        y1: Math.min(prev.y1, y),
        x2: Math.max(prev.x2, x + size),
        y2: Math.max(prev.y2, y + size),
      };
    },
    { x1: Infinity, y1: Infinity, x2: -1, y2: -1 }
  );

  return {
    x: boxCoordinates.x1,
    y: boxCoordinates.y1,
    width: boxCoordinates.x2 - boxCoordinates.x1,
    height: boxCoordinates.y2 - boxCoordinates.y1,
  };
});

export const selectComponentAtom = atom(
  null,
  (_get, set, componentAtom: ComponentAtom) => {
    set(selectedComponentAtomsAtom, [componentAtom]);
  }
);

export const addToSelectionAtom = atom(
  null,
  (get, set, componentAtom: ComponentAtom) => {
    set(selectedComponentAtomsAtom, [
      ...get(selectedComponentAtomsAtom),
      componentAtom,
    ]);
  }
);

export const selectMultipleAtom = atom(
  null,
  (
    get,
    set,
    bounds: { x: number; y: number; width: number; height: number }
  ) => {
    const components = get(componentsAtom);
    const selectedComponentAtoms = components.filter((componentAtom) => {
      const { x, y } = get(componentAtom);
      return (
        x >= bounds.x &&
        y >= bounds.y &&
        x <= bounds.x + bounds.width &&
        y <= bounds.y + bounds.height
      );
    });
    set(selectedComponentAtomsAtom, selectedComponentAtoms);
  }
);

export function selectedComponentCreator(componentAtom: ComponentAtom) {
  return atom((get) => {
    return get(selectedComponentAtomsAtom).includes(componentAtom);
  });
}
