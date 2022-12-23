import { Component } from '@angular/core';

enum AppPage {
  main,
  addTimeForm,
  advancedTimeForm
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Control';

  page: AppPage = AppPage.main
}
