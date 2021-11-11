import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
  OnDestroy,
} from "@angular/core";
import { AuModalService } from "./modal.service";

// We can declare a directive as a class and use it like any Angular directive like *ngIf or *ngFor.
@Directive({
  selector: "[auModalOpenOnClick]", // this way we are able to use this directive in HTML using the [auModalOpenOnClick] attribute
})
export class AuModalOpenOnClickDirective implements OnInit, OnDestroy {
  elements: HTMLBaseElement[];

  constructor(
    private templateRef: TemplateRef<any>,
    // viewContainer: is a reference to the view container where the template will be inserted
    private viewContainer: ViewContainerRef,
    private modalService: AuModalService
  ) {}

  ngOnInit() {
    // because de observable is emiting a value we can subscribe to it and the clear() method is used to clear the view container
    // (the modal will be closed)
    this.modalService.close$.subscribe(() => this.viewContainer.clear());
  }

  @Input()
  set auModalOpenOnClick(els) {
    if (els.length) {
      // if the elements array is not empty
      this.elements = els; // we set the elements array to the elements array passed in the input
    } else {
      // if not
      this.elements = [els]; // we set the elements array to an array with the element passed in the input
    }

    this.elements.forEach((el) =>
      // all eventsListener has to be removed when the directive is destroyed
      el.addEventListener("click", this.clickHandler)
    );
  }

  // handler to control the close modal action
  clickHandler = (() => {
    this.viewContainer.clear();
    this.viewContainer.createEmbeddedView(this.templateRef);
  }).bind(this);

  ngOnDestroy() {
    this.elements.forEach((el) =>
      // the removeEventListener method is used to remove an event listener from an element and is a good idea to use it
      // when you are done with an element
      el.removeEventListener("click", this.clickHandler)
    );
  }
}
