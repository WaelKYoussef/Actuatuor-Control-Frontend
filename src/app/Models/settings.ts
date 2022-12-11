import {Operation} from "./operation";
import {State} from "./state";

export class Settings {

  static parse(json: any): Settings {
    const operation: Operation =  this.operationFromString(this.getValue('operation', json));
    const currentManualState: State =  this.stateFromString(this.getValue('current_manual_state', json));
    const timeZone: string = this.getValue('timezone', json);
    return new Settings(operation, currentManualState, timeZone);
  }

  private static getValue(key: string, json: any): string {
    for (const setting of json) {
      if (setting.name == key)
        return setting.value;
    }
    return '';
  }

  private static operationFromString(operationValue: string): Operation {
    switch (operationValue) {
      case 'manual': return Operation.manual;
      default: return Operation.timeBased;
    }
  }

  private static stateFromString(stateValue: string): State {
    switch (stateValue) {
      case 'expand': return State.expand;
      case 'contract': return State.contract;
      default: return State.off;
    }
  }

  public get manualStateAsString(): string {
    switch(this.current_manual_state) {
      case State.contract: return 'contract';
      case State.expand: return 'expand';
      default: return 'off';
    }
  }

  constructor(
    public operation: Operation,
    public current_manual_state: State,
    public timezone: string) {
  }

}
