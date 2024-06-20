import { getScreenPercentSize } from "./utils";

export class Point {
  readonly x: number;
  readonly y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export enum Swipe {
  None,
  Up,
  Down,
  Left,
  Right,
}

export class SwipeHandler {
  swipeLength: number;
  element: any;
  startPoint: Point | null;
  endPoint: Point | null;

  constructor(element: Node, swipeLengthScreenPercentage: number) {
    this.element = element;
    this.startPoint = null;
    this.endPoint = null;
    this.swipeLength = swipeLengthScreenPercentage;
    this.element.addEventListener("touchstart", (e: TouchEvent) =>
      this.handleTouchStart(e)
    );
    this.element.addEventListener("touchmove", (e: TouchEvent) =>
      this.handleTouchMove(e)
    );
    this.element.addEventListener("touchend", (e: TouchEvent) =>
      this.handleTouchEnd(e)
    );
  }

  getSwipe(): Swipe {
    if (!this.startPoint || !this.endPoint) {
      return Swipe.None;
    }

    const xDistance: number = this.endPoint.x - this.startPoint.x;
    const yDistance: number = this.endPoint.y - this.startPoint.y;

    const isLongEnough: boolean =
      Math.abs(xDistance) > getScreenPercentSize(this.swipeLength, false) ||
      Math.abs(yDistance) > getScreenPercentSize(this.swipeLength, true);

    if (!isLongEnough) {
      return Swipe.None;
    }

    if (Math.abs(xDistance) > Math.abs(yDistance)) {
      if (xDistance > 0) {
        return Swipe.Right;
      } else {
        return Swipe.Left;
      }
    } else {
      if (yDistance > 0) {
        return Swipe.Down;
      } else {
        return Swipe.Up;
      }
    }
  }

  handleTouchStart(e: TouchEvent): void {
    this.startPoint = new Point(e.touches[0].clientX, e.touches[0].clientY);
    this.endPoint = null;
  }

  handleTouchMove(e: TouchEvent): void {
    this.endPoint = new Point(e.touches[0].clientX, e.touches[0].clientY);
    if (!this.startPoint || !this.endPoint) {
      return;
    }
    this.element.dispatchEvent(
      new CustomEvent("swipe", {
        detail: {
          startPoint: this.startPoint,
          currentPoint: this.endPoint,
          xDistance: this.endPoint.x - this.startPoint.x,
          yDistance: this.endPoint.y - this.startPoint.y,
          swipe: this.getSwipe(),
        },
      })
    );
  }

  handleTouchEnd(e: TouchEvent): void {
    if (!this.startPoint || !this.endPoint) {
      return;
    }
    this.element.dispatchEvent(
      new CustomEvent("swipeend", {
        detail: {
          startPoint: this.startPoint,
          endPoint: this.endPoint,
          xDistance: this.endPoint.x - this.startPoint.x,
          yDistance: this.endPoint.y - this.startPoint.y,
          swipe: this.getSwipe(),
        },
      })
    );
  }
}

export default SwipeHandler;