export default class Slide {
  constructor(slide, wrapper) {
    this.slide = document.querySelector(slide);
    this.wrapper = document.querySelector(wrapper);
    this.distance = {
      finalPosition: 0,
      startX: 0,
      moviment: 0,
    };
  }
  moveSlide(distanceX) {
    this.distance.movePosition = distanceX;
    this.slide.style.transform = `transition3d(${distanceX}px,0,0)`;
  }
  updatePosition(clientX) {
    this.distance.moviment = (this.distance.startX - clientX) * 1.6;
    return this.distance.finalPosition - this.distance.moviment;
  }
  onStart(e) {
    e.preventDefault();
    this.distance.startX = e.clientX;
    this.wrapper.addEventListener("mousemove", this.onMove);
  }
  onMove(e) {
    const finalPosition = this.updatePosition(e.clientX);
    this.moveSlide(finalPosition);
  }
  onEnd(e) {
    this.wrapper.removeEventListener("mousemove", this.onMove);
    this.distance.finalPosition = this.distance.movePosition;
  }
  addSlideEvent() {
    this.wrapper.addEventListener("mousedown", this.onStart);
    this.wrapper.addEventListener("mouseup", this.onEnd);
  }
  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }
  init() {
    this.bindEvents();
    this.addSlideEvent();
    return this;
  }
}
