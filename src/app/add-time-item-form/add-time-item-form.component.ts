import {Component, EventEmitter, Output} from '@angular/core';
import {Api2Service} from "../Services/api2.service";
import {State} from "../Models/state";

@Component({
  selector: 'app-add-time-item-form',
  templateUrl: './add-time-item-form.component.html',
  styleUrls: ['./add-time-item-form.component.css']
})
export class AddTimeItemFormComponent {

  selectedFromHour: string = '00';
  selectedFromMinute: string = '00';
  selectedFromSecond: string = '00';

  selectedToHour: string = '00';
  selectedToMinute: string = '00';
  selectedToSecond: string = '00';

  selectedState: string = 'off'

  @Output() closeEvent: EventEmitter<null> = new EventEmitter()

  hours: Array<string> = [];
  minutes: Array<string> = [];
  seconds: Array<string> = [];
  states: Array<string> = [];

  constructor(private api: Api2Service) {
    for (let ii = 0; ii < 24; ii++)
      this.hours.push(ii.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      }))

    for (let ii = 0; ii < 60; ii+=5)
      this.minutes.push(ii.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      }))

    for (let ii = 0; ii < 60; ii+=5)
      this.seconds.push(ii.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      }))

    this.states = ['off', 'expand', 'contract'];
  }

  submit() {
    this.api.addTimeItem(
      this.selectedFromHour + ':' + this.selectedFromMinute + ':' + this.selectedFromSecond,
      this.selectedToHour + ':' + this.selectedToMinute + ':' + this.selectedToSecond,
      this.stateFromString(this.selectedState));
    this.closeEvent.emit()
  }

  private stateFromString(state: string): State {
    switch (state) {
      case 'contract': return State.contract;
      case 'expand': return State.expand;
      default: return State.off;
    }
  }
}
