import {
  AfterContentInit,
  Component,
  ContentChildren,
  Input,
  QueryList,
  TemplateRef,
} from "@angular/core";
import { AuTabComponent } from "../au-tab/au-tab.component";

@Component({
  selector: "au-tab-panel",
  templateUrl: "./au-tab-panel.component.html",
  styleUrls: ["../tab-panel.component.scss"],
})
export class AuTabPanelComponent implements AfterContentInit {
  // ContentChildren decorator allows you to query for the tabs that are
  @ContentChildren(AuTabComponent) // The type has of the ContentChildren has to be specified
  tabs: QueryList<AuTabComponent>; // QueryList is a generic type that represents a list of a certain type. In this case AuTabComponent

  @Input()
  headerTemplate: TemplateRef<any>; // this is a reference to the headerTemplate

  // Because we are using the ContentChildren decorator, we need to implement the AfterContentInit interface
  ngAfterContentInit() {
    // we are locking for a tab with selected property set to true
    const selectedTab = this.tabs.find((tab) => tab.selected);
    // if there is no selected tab, we select the first one
    if (!selectedTab && this.tabs.first) {
      this.tabs.first.selected = true;
    }
  }

  selectTab(tab: AuTabComponent) {
    // we put all the tabs on false
    this.tabs.forEach((tab) => (tab.selected = false));
    // and them we set the selected tab to true
    tab.selected = true;
  }

  // this method returns the header with the contenxt of the tab
  get tabsContext() {
    return {
      tabs: this.tabs,
    };
  }
}
