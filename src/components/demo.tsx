import React, { useState } from "react";
import ReactDragResizeComp from "./ReactDragResizeComp/ReactDragResizeComp";

/**
 * Demo组件 - ReactDragResizeComp的使用示例
 * 
 * 该组件展示了如何使用ReactDragResizeComp创建一个可拖拽和调整大小的容器。
 * 包含一个拖拽手柄和内容区域，演示了基本的拖拽和调整大小功能。
 */
const Demo: React.FC = () => {
  // 组件位置状态
  const [position, setPosition] = useState({ x: 100, y: 100 });
  
  // 组件大小状态
  const [size, setSize] = useState({ width: 300, height: 200 });

  return (
    <div>
      {/* 
        ReactDragResizeComp组件包装器
        提供拖拽和调整大小的功能
      */}
      <ReactDragResizeComp
        position={position}
        size={size}
        boundary={{ left: 0, top: 0, right: 800, bottom: 600 }}
        showBorder={true}
        dragSelector=".drag-handle"
        enableResize={{
          top: true,
          right: true,
          bottom: true,
          left: true,
          topLeft:true,
          topRight: true,
          bottomLeft: true,
          bottomRight: true,
        }}
        onPositionChange={setPosition}
        onSizeChange={setSize}
      >
        {/* 内容容器 */}
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#f0f0f0",
            padding: "10px",
            boxSizing: "border-box", // 修复对齐问题
          }}
        >
          {/* 拖拽手柄 - 用于移动整个组件 */}
          <div
            className="drag-handle"
            style={{
              cursor: "move",
              backgroundColor: "#007bff",
              color: "white",
              padding: "8px 12px",
              margin: "-10px -10px 10px -10px", // 修复对齐问题，与外边框对齐
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            拖拽我移动组件
          </div>
          
          {/* 内容区域 - 拖拽这里不会移动组件 */}
          <div style={{ marginTop: "10px" }}>
            <p style={{ margin: 0, color: "#333", fontSize: "14px" }}>
              其他内容区域 - 拖拽这里不会移动组件
            </p>
            <p style={{ margin: "8px 0 0 0", color: "#666", fontSize: "12px" }}>
              当前位置: ({Math.round(position.x)}, {Math.round(position.y)})
            </p>
            <p style={{ margin: "4px 0 0 0", color: "#666", fontSize: "12px" }}>
              当前尺寸: {Math.round(size.width)} × {Math.round(size.height)}
            </p>
          </div>
        </div>
      </ReactDragResizeComp>
    </div>
  );
};

export default Demo;
