import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-nav',
  styleUrls: ['./app-nav.component.scss'],
  // when @Input changes then re-render but do not check for changes all the time
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="app-nav">
      <div class="wrapper">
        <a routerLink="schedule" routerLinkActive="active">Schedule</a>
        <a routerLink="meals" routerLinkActive="active">Meals</a>
        <a routerLink="workouts" routerLinkActive="active">Workouts</a>
      </div>
    </div>
  `
})
export class AppNavComponent {
  constructor() { }
}
