export type Padding = {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export type TextMeasurement = {
  offsetX: number;
  offsetY: number;
  width: number;
  height: number;
  borderBox: {
    offsetX: number;
    offsetY: number;
    width: number;
    height: number;
  },
}

function measureText(context: CanvasRenderingContext2D, text: string, padding?: number & Partial<Padding>): TextMeasurement {
  const _padding: Padding = {
    top: padding?.top ?? 0,
    right: padding?.right ?? 0,
    bottom: padding?.bottom ?? 0,
    left: padding?.left ?? 0,
  }

  const textMetrics = context.measureText(text)
  const actualHeight = textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent
  const boxHeight = actualHeight + _padding.top + _padding.bottom
  const boxWidth = textMetrics.width + _padding.left + _padding.right

  return {
    offsetX: 0,
    offsetY: 0,
    width: textMetrics.width,
    height: actualHeight,
    borderBox: {
      offsetX: 0,
      offsetY: 0,
      width: boxWidth,
      height: boxHeight,
    },
  }
}

export default measureText