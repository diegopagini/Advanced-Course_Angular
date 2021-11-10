import {
  Component,
  Input,
  ContentChild,
  AfterContentInit,
  HostBinding,
} from "@angular/core";
import { InputRefDirective } from "../common/input-ref.directive";

@Component({
  selector: "au-md-input",
  templateUrl: "./au-md-input.component.html",
  styleUrls: ["./au-md-input.component.css"],
})
export class AuMdInputComponent implements AfterContentInit {
  @Input()
  icon: string;

  // ContentChild is used to get the input element from the template in a ng-content tag
  @ContentChild(InputRefDirective, { static: false })
  input: InputRefDirective;

  ngAfterContentInit() {
    if (!this.input) {
      console.error("the au-md-input needs an input inside its content");
    }
  }

  // HostBinding is used to bind the class to the host element
  @HostBinding("class.input-focus")
  get isInputFocus() {
    return this.input ? this.input.focus : false;
  }
}
