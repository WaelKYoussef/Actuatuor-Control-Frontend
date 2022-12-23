import {State} from "./state";
import {Operation} from "./operation";

export class TimeItem {

  static parse(json: any): TimeItem {
    return new TimeItem(parseInt(json.id), json.from_time, json.to_time, this.stateFromString(json.state));
  }

  private static stateFromString(stateValue: string): State {
    switch (stateValue) {
      case 'expand': return State.expand;
      case 'contract': return State.contract;
      default: return State.off;
    }
  }

  public get stateCodeString(): string {
    return this.stateString[0];
  }

  public get stateString(): string {
    switch(this.state) {
      case State.contract: return 'contract';
      case State.expand: return 'expand';
      default: return 'off';
    }
  }

  constructor(
    public id: number,
    public from: string,
    public to: string,
    public state: State
  ) {}

}
