// EditableNode.tsx
import { Handle, Position } from '@xyflow/react';

type EditableNodeProps = {
  id: string;
  data: {
    label: string;
    onChange: (id: string, value: string) => void;
    onEnter?: () => void;
  };
};

export default function EditableNode({ id, data }: EditableNodeProps) {
  return (
    <div className="p-2 rounded-md bg-white shadow-md border border-gray-300">
      <Handle type="target" position={Position.Top} />
      <input
        type="text"
        value={data.label}
        onChange={(e) => data.onChange(id, e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') data.onEnter?.();
        }}
        className="border rounded p-1 w-full"
      />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
