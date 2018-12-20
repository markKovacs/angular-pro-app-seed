import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// guards
import { AuthGuard } from '../auth/shared/guards/auth.guard';

// shared module
import { SharedModule } from './shared/shared.module';

export const ROUTES: Routes = [
  { path: 'schedule', canLoad: [AuthGuard], loadChildren: './schedule/schedule.module#ScheduleModule' },
  { path: 'meals', canLoad: [AuthGuard], loadChildren: './meals/meals.module#MealsModule' },
  { path: 'workouts', canLoad: [AuthGuard], loadChildren: './workouts/workouts.module#WorkoutsModule' }
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES),
    SharedModule.forRoot()
  ]
})
export class HealthModule { }