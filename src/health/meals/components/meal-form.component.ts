import { Component, ChangeDetectionStrategy, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Meal } from '../../shared/services/meals/meals.service';

@Component({
  selector: 'meal-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./meal-form.component.scss'],
  template: `
    <div class="meal-form">

      <form [formGroup]="form" (submit)="onSubmit()">

        <div class="meal-form__name">
          <label>
            <h3>Meal name</h3>
            <input
              type="text"
              placeholder="e.g. English Breakfast"
              formControlName="name">
              <div class="error" *ngIf="required">
                Meal name is required
              </div>
          </label>
        </div>

        <div class="meal-form__food">
          <div class="meal-form__subtitle">
            <h3>Food</h3>
            <button
              type="button"
              class="meal-form__add"
              (click)="addIngredient()">
              <img src="/img/add-white.svg">
              Add food
            </button>
          </div>
          <div formArrayName="ingredients">
            <label *ngFor="let c of ingredients.controls; index as i;">
              <input [formControlName]="i" placeholder="e.g. Eggs">
              <span
                class="meal-form__remove"
                (click)="removeIngredient(i)">
              </span>
            </label>
          </div>
        </div>

        <div class="meal-form__submit">
          <div>
            <button
              *ngIf="!exists"
              type="button"
              class="button"
              (click)="createMeal()">
              Create meal
            </button>
            <button
              *ngIf="exists"
              type="button"
              class="button"
              (click)="updateMeal()">
              Save
            </button>
            <a
              class="button button--cancel"
              [routerLink]="['../']">
              Cancel
            </a>
          </div>

          <div class="meal-form__delete" *ngIf="exists">
          
            <div *ngIf="toggled">
              <p>Delete item?</p>
              <button
                  class="confirm"
                  type="button"
                  (click)="removeMeal()">
                  Yes
              </button>
              <button
                  class="cancel"
                  type="button"
                  (click)="toggle()">
                  No
              </button>
            </div>

            <button class="button button--delete" type="button" (click)="toggle()">
                Delete
            </button>
          
          </div>

        </div>

      </form>

    </div>
  `
})
export class MealFormComponent implements OnChanges {

  toggled: boolean = false;
  exists: boolean = false;

  @Input()
  meal: Meal;

  @Output()
  create: EventEmitter<Meal> = new EventEmitter<Meal>();

  @Output()
  update: EventEmitter<Meal> = new EventEmitter<Meal>();

  @Output()
  remove: EventEmitter<Meal> = new EventEmitter<Meal>();

  form = this.fb.group({
    name: ['', Validators.required],
    ingredients: this.fb.array([''])
  });

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (this.meal && this.meal.name) {
      this.exists = true;
      this.emptyIngredients();

      const value = this.meal;
      this.form.patchValue(value);

      // patchValue does update form values for FormArrays,
      // so we have to manually empty it and refill
      if(value.ingredients) {
        for (const item of value.ingredients) {
          this.ingredients.push(new FormControl(item));
        }
      }
    }
  }

  emptyIngredients() {
    while(this.ingredients.controls.length) {
      this.ingredients.removeAt(0);
    }
  }

  get ingredients(): FormArray {
    return this.form.get('ingredients') as FormArray;
  }

  get required(): boolean {
    return (
      this.form.get('name').hasError('required') &&
      this.form.get('name').touched
    );
  }

  createMeal() {
    if (this.form.valid) {
      this.create.emit(this.form.value);
    }
  }

  updateMeal() {
    if (this.form.valid) {
      this.update.emit(this.form.value);
    }
  }

  removeMeal() {
    this.remove.emit(this.form.value);
  }

  addIngredient() {
    this.ingredients.push(new FormControl(''));
  }

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  toggle() {
      this.toggled = !this.toggled;
  }

}