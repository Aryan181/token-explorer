import { motion } from "framer-motion";
import { Handle, NodeProps } from "@xyflow/react";

export default function AnimatedNode({ data }: NodeProps) {
  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4 }}
      style={{ background: "#fff", padding: 10, borderRadius: 8, border: "1px solid #ddd" }}
    >
      <Handle type="target" position="top" />
      {data.label}
      <Handle type="source" position="bottom" />
    </motion.div>
  );
} 