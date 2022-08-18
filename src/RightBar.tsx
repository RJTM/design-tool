import { PrimitiveAtom, useAtom, useAtomValue } from "jotai";
import {
  ComponentAtom,
  componentsAtom,
  selectedComponentAtomAtom,
  ShapeComponent,
  TextComponent,
} from "./state";

export function RightBar() {
  const componentAtom = useAtomValue(selectedComponentAtomAtom);

  return (
    <div className="bg-red-500">
      {componentAtom != null ? (
        <ComponentDetails
          key={componentAtom.toString()}
          componentAtom={componentAtom}
        />
      ) : (
        <div>No component selected</div>
      )}
    </div>
  );
}

type ComponentDetailsProps = {
  componentAtom: ComponentAtom;
};

function ComponentDetails({ componentAtom }: ComponentDetailsProps) {
  const component = useAtomValue(componentAtom);

  return (
    <div>
      {component.type === "text" ? (
        <TextEditor
          componentAtom={componentAtom as PrimitiveAtom<TextComponent>}
        />
      ) : component.type === "shape" ? (
        <ShapeEditor
          componentAtom={componentAtom as PrimitiveAtom<ShapeComponent>}
        />
      ) : (
        <div>Unknown component type</div>
      )}
    </div>
  );
}

type TextEditorProps = {
  componentAtom: PrimitiveAtom<TextComponent>;
};

function TextEditor({ componentAtom }: TextEditorProps) {
  const [component, setComponent] = useAtom(componentAtom);

  return (
    <input
      value={component.text}
      onChange={(e) => setComponent({ ...component, text: e.target.value })}
    />
  );
}

type ShapeEditorProps = {
  componentAtom: PrimitiveAtom<ShapeComponent>;
};

function ShapeEditor({ componentAtom }: ShapeEditorProps) {
  const [component, setComponent] = useAtom(componentAtom);

  return (
    <>
      <input
        value={component.size}
        onChange={(e) =>
          setComponent({ ...component, size: parseInt(e.target.value) })
        }
      />
      <select
        value={component.shape}
        onChange={(e) =>
          setComponent({
            ...component,
            shape: e.target.value as ShapeComponent["shape"],
          })
        }
      >
        <option value="square">Square</option>
        <option value="circle">Circle</option>
      </select>
    </>
  );
}
