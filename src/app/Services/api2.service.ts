import {Injectable} from '@angular/core';
import {Settings} from "../Models/settings";
import {TimeItem} from "../Models/time-item";
import {Operation} from "../Models/operation";
import {State} from "../Models/state";

@Injectable({
  providedIn: 'root'
})
export class Api2Service {

  // private server = 'http://192.168.1.5/Control/';
  private server = 'http://' + window.location.hostname + '/Control/';

  public settings: Settings = new Settings(Operation.manual, State.off, 'Africa/Cairo');
  public timeItems: Array<TimeItem> = [];

  constructor() {
    this.getSettings(()=>{});
    this.getTimeTableItems(()=>{});
  }

  getSettings(response: (settings: Settings) => void) {
    this.sendRequest('GetSettings', {}, (json) => {
      const settings = Settings.parse(json.payload);
      this.settings = settings;
      response(settings);
    })
  }

  getTimeTableItems(response: (timeItems: Array<TimeItem>) => void) {
    this.sendRequest('GetTimeTable', {}, (json) => {
      const items = json.payload.map(function (item: any) { return TimeItem.parse(item); });
      this.timeItems = items;
      response(items);
    });
  }

  setOperation(operation: Operation) {
    const value = operation == Operation.manual ? 'manual' : 'timeBased'
    this.sendRequest('SetSetting', {'name': 'operation', 'value': value }, () => {
      this.getSettings(()=>{});
    });
  }

  setManualState(state: State) {
    let value = 'off';
    if (state == State.contract)
      value = 'contract';
    else if (state == State.expand)
      value = 'expand';

    this.sendRequest('SetSetting', {'name': 'current_manual_state', 'value': value }, () => {
      this.getSettings(()=>{});
    });
  }

  setTimeZone(timeZone: string) {
    this.sendRequest('SetSetting', {'name': 'timezone', 'value': timeZone }, () => {
      this.getSettings((res)=>{console.log(res)});
    });
  }

  addTimeItem(from: string, to: string, state: State) {
    let value = 'off';
    if (state == State.contract)
      value = 'contract';
    else if (state == State.expand)
      value = 'expand';
    this.sendRequest('AddTimeTableItem', {'from': from, 'to': to, 'state': value  }, () => {
      this.getTimeTableItems(()=>{})
    });
  }

  deleteTimeItem(id: number) {
    this.sendRequest('DeleteTimeTableItem', {'id': id.toString() }, () => {
      this.getTimeTableItems(()=>{})
    });
  }

  sendRequest(api: string, data: object, response: (response: any) => void) {
    const xhr = new XMLHttpRequest();
    const url = this.server + api + '.php';
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200)
        response(JSON.parse(xhr.responseText));
    };
    xhr.send(JSON.stringify(data));
  }

}
