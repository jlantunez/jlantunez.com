/* eslint-disable no-restricted-properties, operator-linebreak */
const EVENTS = {
  START: 'touchstart',
  MOVE: 'touchmove',
  END: 'touchend',
};

/**
 * Touch plugin.
 *
 * <3 WebSlides
 */
export default class Touch {
  constructor(jlInstance) {
    this.jl = jlInstance;

    this.startX = 0;
    this.startY = 0;
    this.endX = 0;
    this.endY = 0;
    this.isGesture = false;

    document.addEventListener(EVENTS.START, this.onStart.bind(this), false);
    document.addEventListener(EVENTS.MOVE, this.onMove.bind(this), false);
    document.addEventListener(EVENTS.END, this.onStop.bind(this), false);
  }

  onStart(event) {
    const info = Touch.normalizeEventInfo(event);

    if (event.touches.length === 1) {
      this.startX = info.x;
      this.startY = info.y;
      this.endX = info.x;
      this.endY = info.y;
    } else if (event.touches.length > 1) {
      this.isGesture = true;
    }
  }

  onMove(event) {
    const { x, y } = Touch.normalizeEventInfo(event);

    if (!this.isGesture) {
      this.endX = x;
      this.endY = y;
    }
  }

  onStop() {
    if (!this.isGesture) {
      const diffX = this.startX - this.endX;
      const diffY = this.startY - this.endY;

      // It's a vertical drag
      if (Math.abs(diffX) < Math.abs(diffY)) {
        if (diffY < -40) {
          window.scrollTo(0, 0);
          this.jl.goToPrev();
        } else if (diffY > 40) {
          window.scrollTo(0, 0);
          this.jl.goToNext();
        }
      }
    }
  }

  static normalizeEventInfo(event) {
    let touchEvent = { pageX: 0, pageY: 0 };

    if (typeof event.changedTouches !== 'undefined') {
      [touchEvent] = event.changedTouches;
    } else if (
      typeof event.originalEvent !== 'undefined' &&
      typeof event.originalEvent.changedTouches !== 'undefined'
    ) {
      [touchEvent] = event.originalEvent.changedTouches;
    }

    const x = event.offsetX || event.layerX || touchEvent.pageX;
    const y = event.offsetY || event.layerY || touchEvent.pageY;

    return { x, y };
  }
}
