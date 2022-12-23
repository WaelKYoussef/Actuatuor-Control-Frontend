import {Component, EventEmitter, Output} from '@angular/core';
import {Api2Service} from "../Services/api2.service";

@Component({
  selector: 'app-advanced-time-setting-form',
  templateUrl: './advanced-time-setting-form.component.html',
  styleUrls: ['./advanced-time-setting-form.component.css']
})
export class AdvancedTimeSettingFormComponent {

  data: string = '';

  @Output() closeEvent: EventEmitter<null> = new EventEmitter()

  constructor(private api: Api2Service) {
    this.data = api.advancedTimeItems
  }

  submit() {
    const parsed = this.parseDataToItems()
    if (!parsed) {
      alert('Failed to parse the input, please double check and re-submit')
      return;
    }

    this.api.setTimeItems(parsed)
    this.closeEvent.emit()
  }

  private parseDataToItems(): Array<object> | null {
    const lines = this.data.split('\n')
    const items = lines.map(i => this.lineToItem(i)).filter(i => i) as Array<object>
    return (lines.length !== items.length) ? null : items
  }

  private lineToItem(line: string): object | null {
    const comp = line.split(' ')

    if (comp.length !== 3)
      return null

    if (!this.isTime(comp[0]))
      return null

    if (!this.isTime(comp[1]))
      return null

    if (!this.isState(comp[2]))
      return null

    return { 'from': comp[0], 'to': comp[1], 'state': comp[2] }
  }


  private isTime(text: string): boolean {
    const comp = text.split(':')
    if (comp.length !== 3)
      return false;

    const hour = parseInt(comp[0])
    if (hour < 0 || hour > 23)
      return false

    const min = parseInt(comp[1])
    if (min < 0 || min > 59)
      return false

    const sec = parseInt(comp[2])
    if (sec < 0 || sec > 59)
      return false

    return true
  }

  private isState(text: string): boolean {
    return ['off', 'expand', 'contract'].includes(text)
  }

}
