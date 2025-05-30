import { useCallback } from "react";
import { ReactFlow, ReactFlowProvider, useNodesState, useEdgesState, addEdge, Node, Edge, NodeChange, EdgeChange, Connection } from "@xyflow/react";
import EditableNode from "./EditableNode";

const nodeTypes = {
  editable: EditableNode,
};

export default function FlowEditor() {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([
    {
      id: "1",
      type: "editable",
      position: { x: 100, y: 100 },
      data: {
        value: "Edit me",
        onChange: (id: string, newValue: string) => {
          setNodes((nds: Node[]) =>
            nds.map((node: Node) =>
              node.id === id
                ? {
                    ...node,
                    data: {
                      ...node.data,
                      value: newValue,
                      onChange: node.data.onChange,
                    },
                  }
                : node
            )
          );
        },
      },
    },
  ]);

  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  return (
    <ReactFlowProvider>
      <div style={{ width: "100%", height: "100vh" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={(params) => setEdges((eds) => addEdge(params, eds))}
          nodeTypes={nodeTypes}
        />
      </div>
    </ReactFlowProvider>
  );
}
