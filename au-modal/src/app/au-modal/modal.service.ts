import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable()
export class AuModalService {
  // subject as an observable is the way to emit values in a observable
  private subject = new Subject();
  close$: Observable<any> = this.subject.asObservable();

  close() {
    this.subject.next();
  }
}
