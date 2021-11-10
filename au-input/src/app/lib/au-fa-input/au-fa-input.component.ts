import {
  Component,
  Input,
  ContentChild,
  AfterContentInit,
  HostBinding,
} from "@angular/core";
import { InputRefDirective } from "../common/input-ref.directive";

@Component({
  selector: "au-fa-input",
  templateUrl: "./au-fa-input.component.html",
  styleUrls: ["./au-fa-input.component.css"],
})
export class AuFaInputComponent implements AfterContentInit {
  @Input()
  icon: string;

  // ContenChild is a directive that allows us to access the input element inside the content of the component
  @ContentChild(InputRefDirective, { static: false })
  input: InputRefDirective;

  ngAfterContentInit() {
    if (!this.input) {
      // this will throw an error if the input is not found, so we can use it to debug
      console.error("the au-fa-input needs an input inside its content");
    }
  }

  // HostBinding is a directive that allows us to bind a property to the host element, in this case a class named input-focus
  @HostBinding("class.input-focus")
  get isInputFocus() {
    // if the input is not null, then the input-focus class will be added to the host element
    return this.input ? this.input.focus : false;
  }

  get classes() {
    const cssClasses = {};

    if (this.icon) {
      cssClasses["fa-" + this.icon] = true;
    }

    return cssClasses;
  }
}
