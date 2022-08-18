import { useAtomValue } from "jotai";
import { useDrop } from "react-dnd";
import { Component } from "./Component";
import { componentsAtom, selectedComponentAtomAtom } from "./state";

export function Center() {
  const components = useAtomValue(componentsAtom);
  return (
    <div className="flex-grow relative">
      {components.map((component) => (
        <Component key={component.toString()} componentAtom={component} />
      ))}
    </div>
  );
}
