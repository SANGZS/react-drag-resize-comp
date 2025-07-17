# React-Drag-Resize-Comp


本项目是一个基于 React 的前端演示项目，包含多个可通过路由切换的组件示例。

## 功能简介
- 通过路由预览不同组件（如 Demo、EnhancedDemo）
- 支持自定义端口号（已配置为 3000）

## 功能Demo
- https://sangzs.github.io/react-drag-resize-comp/

## 安装与使用

1. 克隆项目：
   ```bash
   git clone <你的仓库地址>
   cd react-drag-resize-comp
   ```
2. 安装依赖：
   ```bash
   npm install
   ```
3. 启动开发服务器：
   ```bash
   npm run dev
   ```
   默认访问地址：http://localhost:3000

## 目录结构
- `src/components/`：主要组件目录
- `src/App.tsx`：主入口，包含路由配置
- `vite.config.ts`：Vite 配置文件

---

## ReactDragResizeComp 组件说明

### 组件简介
`ReactDragResizeComp` 是一个支持拖拽和多方向缩放的 React 组件容器，适用于需要自由布局、可交互调整的场景。支持边界约束、最小/最大尺寸、禁用、回调事件等丰富功能。

### 基本用法
```tsx
import ReactDragResizeComp from './components/ReactDragResizeComp/ReactDragResizeComp';

<ReactDragResizeComp
  position={{ x: 100, y: 100 }}
  size={{ width: 300, height: 200 }}
  enableResize={{ top: true, right: true, bottom: true, left: true, topLeft: true, topRight: true, bottomLeft: true, bottomRight: true }}
  boundary={{ left: 0, top: 0, right: 800, bottom: 600 }}
  showBorder={true}
>
  <div>可拖拽和缩放的内容</div>
</ReactDragResizeComp>
```

### Props API
| 属性名           | 类型                                   | 默认值                        | 说明 |
|------------------|----------------------------------------|-------------------------------|------|
| children         | React.ReactNode                        | -                             | 组件内容 |
| position         | `{ x: number, y: number }`             | `{ x: 100, y: 100 }`          | 初始位置 |
| size             | `{ width: number, height: number }`    | `{ width: 200, height: 200 }` | 初始尺寸 |
| boundary         | `{ left: number, top: number, right: number, bottom: number }` | - | 边界约束，不设置则无边界 |
| showBorder       | `boolean`                              | `false`                       | 是否显示边界线 |
| dragSelector     | `string`                               | -                             | 指定可拖拽的选择器 |
| enableResize     | `ResizeOptions`                        | `{}`                          | 启用的缩放方向 |
| minSize          | `{ width: number, height: number }`    | `{ width: 50, height: 50 }`   | 最小尺寸限制 |
| maxSize          | `{ width: number, height: number }`    | -                             | 最大尺寸限制 |
| disabled         | `boolean`                              | `false`                       | 是否禁用交互 |
| className        | `string`                               | -                             | 自定义类名 |
| style            | `React.CSSProperties`                  | -                             | 自定义内联样式 |
| cursorOptions    | `CursorOptions`                        | `{}`                          | 自定义鼠标光标样式 |

#### ResizeOptions 类型
| 属性         | 类型    | 说明 |
|--------------|---------|------|
| top          | boolean | 允许从上方调整大小 |
| right        | boolean | 允许从右方调整大小 |
| bottom       | boolean | 允许从下方调整大小 |
| left         | boolean | 允许从左方调整大小 |
| topLeft      | boolean | 允许从左上角调整大小 |
| topRight     | boolean | 允许从右上角调整大小 |
| bottomLeft   | boolean | 允许从左下角调整大小 |
| bottomRight  | boolean | 允许从右下角调整大小 |

#### CursorOptions 类型
| 属性             | 类型   | 说明 |
|------------------|--------|------|
| move             | string | 拖拽时的光标样式 |
| resizeTop        | string | 上边缩放时的光标 |
| resizeRight      | string | 右边缩放时的光标 |
| resizeBottom     | string | 下边缩放时的光标 |
| resizeLeft       | string | 左边缩放时的光标 |
| resizeTopLeft    | string | 左上角缩放时的光标 |
| resizeTopRight   | string | 右上角缩放时的光标 |
| resizeBottomLeft | string | 左下角缩放时的光标 |
| resizeBottomRight| string | 右下角缩放时的光标 |

### 事件回调 API
| 属性名           | 类型                                   | 说明 |
|------------------|----------------------------------------|------|
| onPositionChange | `(position: { x: number, y: number }) => void` | 位置变化时回调 |
| onSizeChange     | `(size: { width: number, height: number }) => void` | 尺寸变化时回调 |
| onDragStart      | `(position: { x: number, y: number }) => void` | 拖拽开始时回调 |
| onDragEnd        | `(position: { x: number, y: number }) => void` | 拖拽结束时回调 |
| onResizeStart    | `(size: Size, position: Position) => void` | 缩放开始时回调 |
| onResizeEnd      | `(size: Size, position: Position) => void` | 缩放结束时回调 |
| onMouseEnter     | `(e: React.MouseEvent) => void`         | 鼠标进入时回调 |
| onMouseLeave     | `(e: React.MouseEvent) => void`         | 鼠标离开时回调 |
| onClick          | `(e: React.MouseEvent) => void`         | 点击时回调 |
| onDoubleClick    | `(e: React.MouseEvent) => void`         | 双击时回调 |

### 注意事项
- 若用于 GitHub Pages 或二级路径部署，需设置 Vite 的 `base` 路径。
- `boundary` 需配合 `showBorder` 可视化边界。
- `enableResize` 不传时默认无缩放句柄。
- 组件默认定位为 `fixed`，如需自适应父容器请自行调整样式。

## 开源协议

本项目采用 MIT 协议开源。你可以自由地使用、复制、修改、合并、发布、分发本软件及其副本，但需保留原作者信息和许可证声明。

详细内容请见 LICENSE 文件。
