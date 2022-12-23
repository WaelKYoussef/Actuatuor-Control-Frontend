import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Api2Service} from "../Services/api2.service";
import {Settings} from "../Models/settings";
import {Operation} from "../Models/operation";
import {State} from "../Models/state";

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  @Output() addEvent: EventEmitter<null> = new EventEmitter()
  @Output() advancedSetEvent: EventEmitter<null> = new EventEmitter()
  @ViewChild(Input) TimeZoneField: any

  settings: Settings = new Settings(Operation.manual, State.off, 'Africa/Cairo')

  states: Array<string> = [];

  constructor(public api: Api2Service) {
    this.states = ['off', 'expand', 'contract'];
  }

  ngOnInit() {
    // this.api.getTimeTableItems((items) => {
    //   console.log(items);
    // })
    // this.api.addTimeItem('12:00', '13:00', State.contract);
  }

  refresh() {
    this.api.getSettings((settings) => { this.settings = settings; })
  }

  onManualChange(manualStateChange: string) {
    this.api.setManualState(this.stateFromString(manualStateChange))
  }

  private stateFromString(state: string): State {
    switch (state) {
      case 'contract': return State.contract;
      case 'expand': return State.expand;
      default: return State.off;
    }
  }

}
