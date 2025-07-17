/**
 * ReactDragResizeComp - 可拖拽和调整大小的React组件
 * 
 * 该组件提供了一个功能完整的可拖拽和调整大小的容器。
 * 支持拖拽移动、边界约束、多方向调整大小、自定义样式等功能。
 * 
 * @author React Drag Resize Team
 * @version 1.0.0
 */

import React, { useState, useRef, useEffect, useCallback } from "react";
import "./ReactDragResizeComp.scss";

/**
 * 位置坐标接口
 * 表示组件在页面上的绝对位置
 */
interface Position {
  /** X轴坐标（像素） */
  x: number;
  /** Y轴坐标（像素） */
  y: number;
}

/**
 * 尺寸接口
 * 表示组件的宽度和高度
 */
interface Size {
  /** 宽度（像素） */
  width: number;
  /** 高度（像素） */
  height: number;
}

/**
 * 边界约束接口
 * 定义组件可以移动的区域范围
 */
interface Boundary {
  /** 左边界 */
  left: number;
  /** 上边界 */
  top: number;
  /** 右边界 */
  right: number;
  /** 下边界 */
  bottom: number;
}

/**
 * 调整大小选项接口
 * 控制哪些方向可以调整组件大小
 */
interface ResizeOptions {
  /** 允许从上方调整大小 */
  top?: boolean;
  /** 允许从右方调整大小 */
  right?: boolean;
  /** 允许从下方调整大小 */
  bottom?: boolean;
  /** 允许从左方调整大小 */
  left?: boolean;
  /** 允许从左上角调整大小 */
  topLeft?: boolean;
  /** 允许从右上角调整大小 */
  topRight?: boolean;
  /** 允许从左下角调整大小 */
  bottomLeft?: boolean;
  /** 允许从右下角调整大小 */
  bottomRight?: boolean;
}

/**
 * 鼠标光标选项接口
 * 自定义不同状态下的鼠标光标样式
 */
interface CursorOptions {
  /** 拖拽时的光标样式 */
  move?: string;
  /** 从上方调整大小时的光标样式 */
  resizeTop?: string;
  /** 从右方调整大小时的光标样式 */
  resizeRight?: string;
  /** 从下方调整大小时的光标样式 */
  resizeBottom?: string;
  /** 从左方调整大小时的光标样式 */
  resizeLeft?: string;
  /** 从左上角调整大小时的光标样式 */
  resizeTopLeft?: string;
  /** 从右上角调整大小时的光标样式 */
  resizeTopRight?: string;
  /** 从左下角调整大小时的光标样式 */
  resizeBottomLeft?: string;
  /** 从右下角调整大小时的光标样式 */
  resizeBottomRight?: string;
}

/**
 * ReactDragResizeComp组件属性接口
 * 定义组件的所有配置选项和回调函数
 */
interface ReactDragResizeCompProps {
  /** 子组件内容 */
  children?: React.ReactNode;
  /** 初始位置，默认为 { x: 100, y: 100 } */
  position?: Position;
  /** 初始大小，默认为 { width: 200, height: 200 } */
  size?: Size;
  /** 边界约束，如果不设置则无边界限制 */
  boundary?: Boundary;
  /** 是否显示边界线，默认为 false */
  showBorder?: boolean;
  /** 拖拽选择器，只有匹配该选择器的元素才能触发拖拽 */
  dragSelector?: string;
  /** 启用调整大小的方向配置，默认为 {} */
  enableResize?: ResizeOptions;
  /** 最小尺寸限制，默认为 { width: 50, height: 50 } */
  minSize?: Size;
  /** 最大尺寸限制 */
  maxSize?: Size;
  /** 是否禁用交互，默认为 false */
  disabled?: boolean;
  /** 自定义CSS类名 */
  className?: string;
  /** 自定义内联样式 */
  style?: React.CSSProperties;
  /** 自定义鼠标光标样式 */
  cursorOptions?: CursorOptions;
  /** 位置改变时的回调函数 */
  onPositionChange?: (position: Position) => void;
  /** 大小改变时的回调函数 */
  onSizeChange?: (size: Size) => void;
  /** 拖拽开始时的回调函数 */
  onDragStart?: (position: Position) => void;
  /** 拖拽结束时的回调函数 */
  onDragEnd?: (position: Position) => void;
  /** 调整大小开始时的回调函数 */
  onResizeStart?: (size: Size, position: Position) => void;
  /** 调整大小结束时的回调函数 */
  onResizeEnd?: (size: Size, position: Position) => void;
  /** 鼠标进入时的回调函数 */
  onMouseEnter?: (e: React.MouseEvent) => void;
  /** 鼠标离开时的回调函数 */
  onMouseLeave?: (e: React.MouseEvent) => void;
  /** 点击时的回调函数 */
  onClick?: (e: React.MouseEvent) => void;
  /** 双击时的回调函数 */
  onDoubleClick?: (e: React.MouseEvent) => void;
}

/**
 * ReactDragResizeComp组件
 * 
 * 可拖拽和调整大小的React组件，支持以下功能：
 * - 拖拽移动
 * - 多方向调整大小
 * - 边界约束
 * - 最小/最大尺寸限制
 * - 自定义鼠标光标
 * - 禁用状态
 * 
 * @param props - 组件属性
 */
const ReactDragResizeComp: React.FC<ReactDragResizeCompProps> = ({
  children,
  position = { x: 100, y: 100 },
  size = { width: 200, height: 200 },
  boundary,
  showBorder = false,
  dragSelector,
  enableResize = {},
  minSize = { width: 50, height: 50 },
  maxSize,
  disabled = false,
  className,
  style,
  cursorOptions = {},
  onPositionChange,
  onSizeChange,
  onDragStart,
  onDragEnd,
  onResizeStart,
  onResizeEnd,
  onMouseEnter,
  onMouseLeave,
  onClick,
  onDoubleClick,
}) => {
  // 内部状态管理
  const [currentPosition, setCurrentPosition] = useState<Position>(position); // 当前位置
  const [currentSize, setCurrentSize] = useState<Size>(size); // 当前大小
  const [isDragging, setIsDragging] = useState(false); // 是否正在拖拽
  const [isResizing, setIsResizing] = useState(false); // 是否正在调整大小
  const [resizeDirection, setResizeDirection] = useState<string>(""); // 调整大小的方向
  const [dragStartPos, setDragStartPos] = useState<Position>({ x: 0, y: 0 }); // 拖拽起始位置
  const [initialPosition, setInitialPosition] = useState<Position>(position); // 初始位置（用于调整大小计算）
  const [initialSize, setInitialSize] = useState<Size>(size); // 初始大小（用于调整大小计算）
  const [isHovered, setIsHovered] = useState(false); // 鼠标悬停状态

  // 容器引用，用于事件处理和DOM操作
  const containerRef = useRef<HTMLDivElement>(null);

  /**
   * 监听外部位置变化
   * 当position属性改变时，更新内部状态
   */
  useEffect(() => {
    setCurrentPosition(position);
  }, [position]);

  /**
   * 监听外部大小变化
   * 当size属性改变时，更新内部状态
   */
  useEffect(() => {
    setCurrentSize(size);
  }, [size]);

  /**
   * 获取指定方向的鼠标光标样式
   * 
   * @param direction - 调整大小的方向
   * @returns 对应的光标样式字符串
   */
  const getCursor = useCallback((direction: string): string => {
    const defaultCursors: CursorOptions = {
      move: 'move',
      resizeTop: 'ns-resize',
      resizeRight: 'ew-resize',
      resizeBottom: 'ns-resize',
      resizeLeft: 'ew-resize',
      resizeTopLeft: 'nw-resize',
      resizeTopRight: 'ne-resize',
      resizeBottomLeft: 'sw-resize',
      resizeBottomRight: 'se-resize',
    };

    const cursorMap: { [key: string]: string } = {
      'top': cursorOptions.resizeTop || defaultCursors.resizeTop!,
      'right': cursorOptions.resizeRight || defaultCursors.resizeRight!,
      'bottom': cursorOptions.resizeBottom || defaultCursors.resizeBottom!,
      'left': cursorOptions.resizeLeft || defaultCursors.resizeLeft!,
      'topLeft': cursorOptions.resizeTopLeft || defaultCursors.resizeTopLeft!,
      'topRight': cursorOptions.resizeTopRight || defaultCursors.resizeTopRight!,
      'bottomLeft': cursorOptions.resizeBottomLeft || defaultCursors.resizeBottomLeft!,
      'bottomRight': cursorOptions.resizeBottomRight || defaultCursors.resizeBottomRight!,
    };

    return cursorMap[direction] || 'default';
  }, [cursorOptions]);

  /**
   * 检查位置是否在边界范围内
   * 
   * @param pos - 要检查的位置
   * @param containerSize - 容器尺寸
   * @returns 约束后的位置
   */
  const checkBoundary = useCallback(
    (pos: Position, containerSize: Size): Position => {
      if (!boundary) return pos;

      const newPos = { ...pos };

      // 确保四个角都在边界内
      newPos.x = Math.max(
        boundary.left,
        Math.min(boundary.right - containerSize.width, newPos.x)
      );
      newPos.y = Math.max(
        boundary.top,
        Math.min(boundary.bottom - containerSize.height, newPos.y)
      );

      return newPos;
    },
    [boundary]
  );

  /**
   * 检查并约束尺寸在最小值和最大值范围内
   * 
   * @param newSize - 新的尺寸
   * @returns 约束后的尺寸
   */
  const checkSizeConstraints = useCallback(
    (newSize: Size): Size => {
      const constrainedSize = { ...newSize };
      
      if (minSize) {
        constrainedSize.width = Math.max(minSize.width, constrainedSize.width);
        constrainedSize.height = Math.max(minSize.height, constrainedSize.height);
      }
      
      if (maxSize) {
        constrainedSize.width = Math.min(maxSize.width, constrainedSize.width);
        constrainedSize.height = Math.min(maxSize.height, constrainedSize.height);
      }
      
      return constrainedSize;
    },
    [minSize, maxSize]
  );

  /**
   * 处理拖拽开始事件
   * 
   * @param e - React鼠标事件
   * 检查拖拽条件，设置拖拽状态
   */
  const handleDragStart = useCallback(
    (e: React.MouseEvent) => {
      if (disabled) return;
      
      const target = e.target as HTMLElement;

      // 如果设置了dragSelector，只有匹配的元素才能拖拽
      if (dragSelector) {
        const dragElement = containerRef.current?.querySelector(dragSelector);
        if (!dragElement || !dragElement.contains(target)) {
          return;
        }
      }

      // 如果点击在调整大小的句柄上，不处理拖拽
      if (target.classList.contains("resize-handle")) {
        return;
      }

      setIsDragging(true);
      setDragStartPos({
        x: e.clientX - currentPosition.x,
        y: e.clientY - currentPosition.y,
      });

      onDragStart?.(currentPosition);
      e.preventDefault();
    },
    [disabled, dragSelector, currentPosition, onDragStart]
  );

  /**
   * 处理调整大小开始事件
   * 
   * @param e - React鼠标事件
   * @param direction - 调整大小的方向
   * 设置调整大小状态和相关初始值
   */
  const handleResizeStart = useCallback(
    (e: React.MouseEvent, direction: string) => {
      if (disabled) return;
      
      setIsResizing(true);
      setResizeDirection(direction);
      setInitialPosition(currentPosition);
      setInitialSize(currentSize);
      setDragStartPos({ x: e.clientX, y: e.clientY });

      onResizeStart?.(currentSize, currentPosition);
      e.preventDefault();
      e.stopPropagation();
    },
    [disabled, currentPosition, currentSize, onResizeStart]
  );

  /**
   * 处理鼠标移动事件
   * 
   * @param e - 鼠标事件
   * 处理拖拽和调整大小的逻辑，应用边界和尺寸约束
   */
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        const newPosition = {
          x: e.clientX - dragStartPos.x,
          y: e.clientY - dragStartPos.y,
        };

        const constrainedPosition = checkBoundary(newPosition, currentSize);
        setCurrentPosition(constrainedPosition);
        onPositionChange?.(constrainedPosition);
      }

      if (isResizing) {
        const deltaX = e.clientX - dragStartPos.x;
        const deltaY = e.clientY - dragStartPos.y;

        let newSize = { ...initialSize };
        let newPosition = { ...initialPosition };

        // 根据调整方向计算新的大小和位置
        switch (resizeDirection) {
          case "top":
            newSize.height = initialSize.height - deltaY;
            newPosition.y =
              initialPosition.y + (initialSize.height - newSize.height);
            break;
          case "right":
            newSize.width = initialSize.width + deltaX;
            break;
          case "bottom":
            newSize.height = initialSize.height + deltaY;
            break;
          case "left":
            newSize.width = initialSize.width - deltaX;
            newPosition.x =
              initialPosition.x + (initialSize.width - newSize.width);
            break;
          case "topLeft":
            newSize.width = initialSize.width - deltaX;
            newSize.height = initialSize.height - deltaY;
            newPosition.x =
              initialPosition.x + (initialSize.width - newSize.width);
            newPosition.y =
              initialPosition.y + (initialSize.height - newSize.height);
            break;
          case "topRight":
            newSize.width = initialSize.width + deltaX;
            newSize.height = initialSize.height - deltaY;
            newPosition.y =
              initialPosition.y + (initialSize.height - newSize.height);
            break;
          case "bottomLeft":
            newSize.width = initialSize.width - deltaX;
            newSize.height = initialSize.height + deltaY;
            newPosition.x =
              initialPosition.x + (initialSize.width - newSize.width);
            break;
          case "bottomRight":
            newSize.width = initialSize.width + deltaX;
            newSize.height = initialSize.height + deltaY;
            break;
        }

        // 应用大小约束
        newSize = checkSizeConstraints(newSize);

        // 检查边界约束
        const constrainedPosition = checkBoundary(newPosition, newSize);

        setCurrentSize(newSize);
        setCurrentPosition(constrainedPosition);
        onSizeChange?.(newSize);
      }
    },
    [
      isDragging,
      isResizing,
      dragStartPos,
      initialSize,
      initialPosition,
      resizeDirection,
      checkBoundary,
      checkSizeConstraints,
      currentSize,
      onPositionChange,
      onSizeChange,
    ]
  );

  /**
   * 处理鼠标释放事件
   * 重置拖拽和调整大小状态，触发相应的回调函数
   */
  const handleMouseUp = useCallback(() => {
    if (isResizing) {
      onResizeEnd?.(currentSize, currentPosition);
      onPositionChange?.(currentPosition);
    }

    if (isDragging) {
      onDragEnd?.(currentPosition);
    }

    setIsDragging(false);
    setIsResizing(false);
    setResizeDirection("");
  }, [isDragging, isResizing, currentPosition, currentSize, onDragEnd, onResizeEnd, onPositionChange]);

  /**
   * 添加全局鼠标事件监听
   * 当开始拖拽或调整大小时，监听全局鼠标移动和释放事件
   */
  useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, isResizing, handleMouseMove, handleMouseUp]);

  /**
   * 渲染调整大小句柄
   * 
   * 根据enableResize配置渲染各个方向的调整大小句柄
   * @returns 调整大小句柄元素数组
   */
  const renderResizeHandles = () => {
    const handles = [];

    // 上方的调整大小句柄
    if (enableResize.top) {
      handles.push(
        <div
          key="top"
          className="resize-handle resize-handle-top"
          style={{ cursor: getCursor('top') }}
          onMouseDown={(e) => handleResizeStart(e, "top")}
          title="从上方调整大小"
        />
      );
    }

    // 右方的调整大小句柄
    if (enableResize.right) {
      handles.push(
        <div
          key="right"
          className="resize-handle resize-handle-right"
          style={{ cursor: getCursor('right') }}
          onMouseDown={(e) => handleResizeStart(e, "right")}
          title="从右方调整大小"
        />
      );
    }

    // 下方的调整大小句柄
    if (enableResize.bottom) {
      handles.push(
        <div
          key="bottom"
          className="resize-handle resize-handle-bottom"
          style={{ cursor: getCursor('bottom') }}
          onMouseDown={(e) => handleResizeStart(e, "bottom")}
          title="从下方调整大小"
        />
      );
    }

    // 左方的调整大小句柄
    if (enableResize.left) {
      handles.push(
        <div
          key="left"
          className="resize-handle resize-handle-left"
          style={{ cursor: getCursor('left') }}
          onMouseDown={(e) => handleResizeStart(e, "left")}
          title="从左方调整大小"
        />
      );
    }

    // 左上角的调整大小句柄
    if (enableResize.topLeft) {
      handles.push(
        <div
          key="topLeft"
          className="resize-handle resize-handle-corner resize-handle-top-left"
          style={{ cursor: getCursor('topLeft') }}
          onMouseDown={(e) => handleResizeStart(e, "topLeft")}
          title="从左上角调整大小"
        />
      );
    }

    // 右上角的调整大小句柄
    if (enableResize.topRight) {
      handles.push(
        <div
          key="topRight"
          className="resize-handle resize-handle-corner resize-handle-top-right"
          style={{ cursor: getCursor('topRight') }}
          onMouseDown={(e) => handleResizeStart(e, "topRight")}
          title="从右上角调整大小"
        />
      );
    }

    // 左下角的调整大小句柄
    if (enableResize.bottomLeft) {
      handles.push(
        <div
          key="bottomLeft"
          className="resize-handle resize-handle-corner resize-handle-bottom-left"
          style={{ cursor: getCursor('bottomLeft') }}
          onMouseDown={(e) => handleResizeStart(e, "bottomLeft")}
          title="从左下角调整大小"
        />
      );
    }

    // 右下角的调整大小句柄
    if (enableResize.bottomRight) {
      handles.push(
        <div
          key="bottomRight"
          className="resize-handle resize-handle-corner resize-handle-bottom-right"
          style={{ cursor: getCursor('bottomRight') }}
          onMouseDown={(e) => handleResizeStart(e, "bottomRight")}
          title="从右下角调整大小"
        />
      );
    }

    return handles;
  };

  /**
   * 渲染组件
   * 
   * 包括边界显示、主容器和调整大小句柄
   */
  return (
    <>
      {/* 边界显示 - 当showBorder为true且设置了boundary时显示 */}
      {showBorder && boundary && (
        <div
          className="drag-resize-boundary"
          style={{
            left: boundary.left,
            top: boundary.top,
            width: boundary.right - boundary.left,
            height: boundary.bottom - boundary.top,
          }}
        />
      )}

      {/* 主容器 - 可拖拽和调整大小的核心元素 */}
      <div
        ref={containerRef}
        className={[
          "drag-resize-container",
          isDragging ? "dragging" : "",
          isResizing ? "resizing" : "",
          disabled ? "disabled" : "",
          isHovered ? "hovered" : "",
          className || "",
        ]
          .filter(Boolean)
          .join(" ")}
        style={{
          position: "fixed",
          left: currentPosition.x,
          top: currentPosition.y,
          width: currentSize.width,
          height: currentSize.height,
          cursor: isDragging ? (cursorOptions.move || 'move') : 'default',
          ...style,
        }}
        onMouseDown={handleDragStart}
        onMouseEnter={(e) => {
          setIsHovered(true);
          onMouseEnter?.(e);
        }}
        onMouseLeave={(e) => {
          setIsHovered(false);
          onMouseLeave?.(e);
        }}
        onClick={onClick}
        onDoubleClick={onDoubleClick}
      >
        {/* 子组件内容 */}
        {children}
        
        {/* 调整大小句柄 - 当不禁用时显示 */}
        {!disabled && renderResizeHandles()}
      </div>
    </>
  );
};

export default ReactDragResizeComp;
