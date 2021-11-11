import { Component, Input, OnInit, TemplateRef } from "@angular/core";
import { AuModalService } from "./modal.service";
import { EventManager } from "@angular/platform-browser";

@Component({
  selector: "au-modal",
  templateUrl: "./au-modal.component.html",
  styleUrls: ["./au-modal.component.scss"],
})
export class AuModalComponent implements OnInit {
  @Input()
  body: TemplateRef<any>; // This is the input property that pass the template to the modal

  @Input()
  context: any;

  @Input()
  hideOnEsc = true;

  @Input()
  hideOnClickOutside = true;

  constructor(
    private modalService: AuModalService, // custom service to present modal
    private eventManager: EventManager //eventManager is used to add global event listener
  ) {}

  ngOnInit() {
    // method to listent the esc key press and close de modal
    this.eventManager.addGlobalEventListener("window", "keyup.esc", () => {
      if (this.hideOnEsc) {
        this.close();
      }
    });
  }

  // method to close the modal on click outside of his body
  onClickOutsideModal() {
    if (this.hideOnClickOutside) {
      this.close();
    }
  }

  // method to close the modal
  close() {
    this.modalService.close();
  }

  cancelClick(evt: KeyboardEvent) {
    evt.preventDefault();
    evt.stopPropagation();
  }
}
