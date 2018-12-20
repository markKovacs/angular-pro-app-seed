import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/shared/guards/auth.guard';

export const ROUTES: Routes = [
  { path: 'schedule', canLoad: [AuthGuard], loadChildren: './schedule/schedule.module#ScheduleModule' },
  { path: 'meals', canLoad: [AuthGuard], loadChildren: './meals/meals.module#MealsModule' },
  { path: 'workouts', canLoad: [AuthGuard], loadChildren: './workouts/workouts.module#WorkoutsModule' }
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES)
  ]
})
export class HealthModule { }