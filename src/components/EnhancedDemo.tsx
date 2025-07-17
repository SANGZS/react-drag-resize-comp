import React, { useState } from "react";
import ReactDragResizeComp from "./ReactDragResizeComp/ReactDragResizeComp";

const EnhancedDemo: React.FC = () => {
  const [position1, setPosition1] = useState({ x: 100, y: 100 });
  const [size1, setSize1] = useState({ width: 300, height: 200 });
  
  const [position2, setPosition2] = useState({ x: 450, y: 100 });
  const [size2, setSize2] = useState({ width: 250, height: 150 });
  
  const [position3, setPosition3] = useState({ x: 100, y: 350 });
  const [size3, setSize3] = useState({ width: 200, height: 200 });

  const [isDisabled, setIsDisabled] = useState(false);
  const [showLogs, setShowLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    setShowLogs(prev => [...prev.slice(-4), `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const customCursors: any = {
    move: 'grab',
    resizeTop: 'n-resize',
    resizeRight: 'e-resize',
    resizeBottom: 's-resize',
    resizeLeft: 'w-resize',
    resizeTopLeft: 'nw-resize',
    resizeTopRight: 'ne-resize',
    resizeBottomLeft: 'sw-resize',
    resizeBottomRight: 'se-resize',
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>ReactDragResizeComp 增强演示</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={() => setIsDisabled(!isDisabled)}
          style={{ marginRight: '10px', padding: '5px 10px' }}
        >
          {isDisabled ? '启用' : '禁用'}拖拽/调整大小
        </button>
        
        <button 
          onClick={() => setShowLogs([])}
          style={{ padding: '5px 10px' }}
        >
          清空日志
        </button>
      </div>

      <div style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
        <h3>事件日志:</h3>
        {showLogs.length === 0 ? (
          <p style={{ color: '#666' }}>暂无事件</p>
        ) : (
          showLogs.map((log, index) => (
            <div key={index} style={{ fontSize: '12px', color: '#333' }}>
              {log}
            </div>
          ))
        )}
      </div>

      {/* 第一个组件 - 基础使用 */}
      <ReactDragResizeComp
        position={position1}
        size={size1}
        boundary={{ left: 0, top: 0, right: 800, bottom: 600 }}
        showBorder={true}
        dragSelector=".drag-handle-1"
        enableResize={{
          top: true,
          right: true,
          bottom: true,
          left: true,
          topLeft: true,
          topRight: true,
          bottomLeft: true,
          bottomRight: true,
        }}
        minSize={{ width: 100, height: 80 }}
        maxSize={{ width: 400, height: 300 }}
        disabled={isDisabled}
        onPositionChange={setPosition1}
        onSizeChange={setSize1}
        onDragStart={(pos) => addLog(`拖拽开始: (${pos.x}, ${pos.y})`)}
        onDragEnd={(pos) => addLog(`拖拽结束: (${pos.x}, ${pos.y})`)}
        onResizeStart={(size, pos) => addLog(`调整大小开始: ${size.width}x${size.height} at (${pos.x}, ${pos.y})`)}
        onResizeEnd={(size, pos) => addLog(`调整大小结束: ${size.width}x${size.height} at (${pos.x}, ${pos.y})`)}
        onMouseEnter={() => addLog('鼠标进入组件')}
        onMouseLeave={() => addLog('鼠标离开组件')}
        onClick={() => addLog('组件被点击')}
        onDoubleClick={() => addLog('组件被双击')}
        className="demo-component-1"
        style={{ border: '1px solid #ddd', borderRadius: '8px' }}
      >
        <div style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div
            className="drag-handle-1"
            style={{
              cursor: isDisabled ? 'not-allowed' : 'move',
              backgroundColor: '#007bff',
              color: 'white',
              padding: '10px',
              fontWeight: 'bold',
              userSelect: 'none'
            }}
          >
            拖拽我移动 (基础示例)
          </div>
          <div style={{ padding: '10px', flex: 1 }}>
            <p>这是一个基础的拖拽和调整大小组件</p>
            <p>当前位置: ({position1.x}, {position1.y})</p>
            <p>当前大小: {size1.width} × {size1.height}</p>
          </div>
        </div>
      </ReactDragResizeComp>

      {/* 第二个组件 - 自定义光标 */}
      <ReactDragResizeComp
        position={position2}
        size={size2}
        boundary={{ left: 0, top: 0, right: 800, bottom: 600 }}
        dragSelector=".drag-handle-2"
        enableResize={{
          top: true,
          right: true,
          bottom: true,
          left: true,
          topLeft: true,
          topRight: true,
          bottomLeft: true,
          bottomRight: true,
        }}
        minSize={{ width: 80, height: 60 }}
        cursorOptions={customCursors}
        disabled={isDisabled}
        onPositionChange={setPosition2}
        onSizeChange={setSize2}
        className="demo-component-2"
        style={{ 
          border: '2px solid #28a745',
          borderRadius: '12px',
          backgroundColor: '#fff'
        }}
      >
        <div style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#d4edda',
          borderRadius: '10px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div
            className="drag-handle-2"
            style={{
              cursor: isDisabled ? 'not-allowed' : 'grab',
              backgroundColor: '#28a745',
              color: 'white',
              padding: '8px',
              textAlign: 'center',
              userSelect: 'none'
            }}
          >
            自定义光标示例
          </div>
          <div style={{ padding: '15px', flex: 1, textAlign: 'center' }}>
            <p>这个组件使用了自定义光标</p>
            <p>尝试调整大小查看不同方向的光标</p>
          </div>
        </div>
      </ReactDragResizeComp>

      {/* 第三个组件 - 内容丰富的卡片 */}
      <ReactDragResizeComp
        position={position3}
        size={size3}
        boundary={{ left: 0, top: 0, right: 800, bottom: 600 }}
        dragSelector=".drag-handle-3"
        enableResize={{
          top: true,
          right: true,
          bottom: true,
          left: true,
          topLeft: true,
          topRight: true,
          bottomLeft: true,
          bottomRight: true,
        }}
        minSize={{ width: 120, height: 120 }}
        disabled={isDisabled}
        onPositionChange={setPosition3}
        onSizeChange={setSize3}
        className="demo-component-3"
        style={{ 
          border: '1px solid #dc3545',
          borderRadius: '50%',
          overflow: 'hidden'
        }}
      >
        <div style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #ff6b6b, #ff8e8e)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center'
        }}>
          <div
            className="drag-handle-3"
            style={{
              cursor: isDisabled ? 'not-allowed' : 'move',
              padding: '5px',
              fontSize: '14px',
              userSelect: 'none'
            }}
          >
            圆形卡片
          </div>
          <div style={{ fontSize: '12px', marginTop: '5px' }}>
            <div>拖拽移动</div>
            <div>调整大小</div>
          </div>
        </div>
      </ReactDragResizeComp>

      <div style={{ 
        position: 'fixed', 
        bottom: 10, 
        left: 10, 
        backgroundColor: '#f8f9fa',
        padding: '10px',
        borderRadius: '5px',
        fontSize: '12px',
        maxWidth: '300px'
      }}>
        <strong>使用说明:</strong>
        <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
          <li>拖拽指定区域移动组件</li>
          <li>拖拽边缘或角落调整大小</li>
          <li>点击按钮可以禁用/启用功能</li>
          <li>查看右侧事件日志了解交互</li>
        </ul>
      </div>
    </div>
  );
};

export default EnhancedDemo;