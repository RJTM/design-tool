import { PrimitiveAtom, useAtom, useAtomValue } from "jotai";
import { ReactNode, useMemo, useState } from "react";
import { useDrag } from "react-dnd";
import {
  addToSelectionAtom,
  Component as ComponentType,
  ComponentAtom,
  selectComponentAtom,
  selectedComponentCreator,
  ShapeComponent,
  TextComponent,
} from "./state";

type ComponentProps<T = ComponentType> = {
  componentAtom: PrimitiveAtom<T>;
};

export function Component({ componentAtom }: ComponentProps) {
  const [component, setComponent] = useAtom(componentAtom);
  const [selected] = useAtom(
    useMemo(() => selectedComponentCreator(componentAtom), [componentAtom])
  );
  const [, select] = useAtom(selectComponentAtom);
  const [, addToSelection] = useAtom(addToSelectionAtom);
  const [, ref] = useDrag({
    type: "component",
    item: component,
    end: (item, monitor) => {
      const offsetDifference = monitor.getDifferenceFromInitialOffset()!;
      setComponent({
        ...component,
        x: component.x + offsetDifference.x,
        y: component.y + offsetDifference.y,
      });
    },
  });

  return (
    <div
      ref={ref}
      onClick={(event) => {
        if (event.ctrlKey || event.metaKey) {
          addToSelection(componentAtom);
        } else {
          select(componentAtom);
        }
      }}
      onMouseDown={(event) => {
        event.stopPropagation();
      }}
      onMouseUp={(event) => {
        event.stopPropagation();
      }}
    >
      <PositionedComponent component={component} selected={selected} />
    </div>
  );
}

type PositionedComponentProps = {
  component: ComponentType;
  selected: boolean;
};

export function PositionedComponent({
  component,
  selected,
}: PositionedComponentProps) {
  return (
    <div
      style={{
        position: "absolute",
        left: component.x,
        top: component.y,
      }}
    >
      {component.type === "text" ? (
        <TextComponentRender component={component} />
      ) : component.type === "shape" ? (
        <ShapeComponentRender component={component} />
      ) : null}
    </div>
  );
}

type TextComponentProps = {
  component: TextComponent;
};

export function TextComponentRender({ component }: TextComponentProps) {
  return <div>{component.text}</div>;
}

type ShapeComponentProps = {
  component: ShapeComponent;
};

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function ShapeComponentRender({ component }: ShapeComponentProps) {
  const [color] = useState(() => getRandomColor());

  return (
    <div
      style={{
        width: component.size,
        height: component.size,
        backgroundColor: color,
        borderRadius: component.shape === "circle" ? "50%" : "0",
      }}
    ></div>
  );
}
