export class Point {
  readonly x: number;
  readonly y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export class BgImage {
  readonly file: string;
  readonly name: string;
  readonly size: number;
  readonly modified: number;

  constructor(file: string, name: string, size: number, modified: number) {
    this.file = file;
    this.name = name;
    this.size = size;
    this.modified = modified;
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
  startPoint: Point | null;
  endPoint: Point | null;


  constructor() {
    this.startPoint = null;
    this.endPoint = null;
    document.addEventListener("touchstart", (e) => this.handleTouchStart(e));
    document.addEventListener("touchmove", (e) => this.handleTouchMove(e));
    document.addEventListener("touchend", (e) => this.handleTouchEnd(e));
  }

  getSwipe(): Swipe {
    if (!this.startPoint || !this.endPoint) {
      return Swipe.None;
    }

    const xDistance = this.endPoint.x-this.startPoint.x;
    const yDistance = this.endPoint.y-this.startPoint.y;

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
    document.dispatchEvent(
      new CustomEvent("swipe", {
        detail: {
          startPoint: this.startPoint,
          currentPoint: this.endPoint,
          xDistance: this.endPoint.x-this.startPoint.x,
          yDistance: this.endPoint.y-this.startPoint.y,
          swipe: this.getSwipe(),
        },
      })
    );
  }

  handleTouchEnd(e: TouchEvent): void {
    if (!this.startPoint || !this.endPoint) {
      return;
    }
    document.dispatchEvent(
      new CustomEvent("swipeend", {
        detail: {
          startPoint: this.startPoint,
          endPoint: this.endPoint,
          xDistance: this.endPoint.x-this.startPoint.x,
          yDistance: this.endPoint.y-this.startPoint.y,
          swipe: this.getSwipe(),
        },
      })
    );
  }
}
