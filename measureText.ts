export type Padding = {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

function measureText(context: CanvasRenderingContext2D, text: string, padding?: number & Partial<Padding>) {
  const _padding: Padding = {
    top: padding?.top ?? 0,
    right: padding?.right ?? 0,
    bottom: padding?.bottom ?? 0,
    left: padding?.left ?? 0,
  }
}

export default measureText