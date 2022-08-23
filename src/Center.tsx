import { useAtom, useAtomValue } from "jotai";
import { useState } from "react";
import { Component } from "./Component";
import {
  componentsAtom,
  selectedComponentAtomsAtom,
  selectedComponentBoundBoxAtom,
  selectMultipleAtom,
} from "./state";
import { calculateSize, calculateStart, Point } from "./util";

export function Center() {
  const components = useAtomValue(componentsAtom);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionStart, setSelectionStart] = useState<Point>();
  const [selectionEnd, setSelectionEnd] = useState<Point>();
  const [, selectMultiple] = useAtom(selectMultipleAtom);

  const selectionPosition = isSelecting
    ? calculateStart(selectionStart!, selectionEnd!)
    : undefined;

  const selectionSize = isSelecting
    ? calculateSize(selectionEnd!, selectionStart!)
    : undefined;

  return (
    <div
      className="flex-grow relative"
      onMouseDown={(event) => {
        let rect = event.currentTarget.getBoundingClientRect();
        setIsSelecting(true);
        setSelectionStart({ x: event.clientX - rect.left, y: event.clientY });
        setSelectionEnd({ x: event.clientX - rect.left, y: event.clientY });
      }}
      onMouseUp={(event) => {
        selectMultiple({ ...selectionPosition!, ...selectionSize! });
        setIsSelecting(false);
        setSelectionStart(undefined);
        setSelectionEnd(undefined);
      }}
      onMouseMove={(event) => {
        if (isSelecting) {
          let rect = event.currentTarget.getBoundingClientRect();
          setSelectionEnd({ x: event.clientX - rect.left, y: event.clientY });
        }
      }}
    >
      {components.map((component) => (
        <Component key={component.toString()} componentAtom={component} />
      ))}

      {isSelecting && (
        <div
          style={{
            position: "absolute",
            left: selectionPosition!.x,
            top: selectionPosition!.y,
            width: selectionSize!.width,
            height: selectionSize!.height,
          }}
          className="bg-gray-400 opacity-30 border-2 border-gray-700"
        ></div>
      )}

      <Selection />
    </div>
  );
}

function Selection() {
  const selectedBoundBox = useAtomValue(selectedComponentBoundBoxAtom);

  if (selectedBoundBox == null) {
    return null;
  }

  return (
    <div
      style={{
        left: selectedBoundBox!.x,
        top: selectedBoundBox!.y,
        width: selectedBoundBox!.width,
        height: selectedBoundBox!.height,
      }}
      className={`bg-blue-400 opacity-30 border-2 border-blue-700 absolute`}
    ></div>
  );
}
