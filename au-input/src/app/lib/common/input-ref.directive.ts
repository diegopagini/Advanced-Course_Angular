import { Directive, HostListener } from "@angular/core";

@Directive({
  // this is the selector for the directive, this way is applied to all input elements
  selector: "input",
})
export class InputRefDirective {
  focus = false;

  // HostListenner is a decorator that allows us to listen to events on the host element, in this case the focus event
  @HostListener("focus")
  onFocus() {
    this.focus = true;
  }

  // HostListenner is a decorator that allows us to listen to events on the host element, in this case the blur event
  @HostListener("blur")
  onBlur() {
    this.focus = false;
  }
}
