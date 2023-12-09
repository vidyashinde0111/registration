import { Component, Input, Output, EventEmitter, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit-user-popup',
  templateUrl: './edit-user-popup.component.html',
  styleUrls: ['./edit-user-popup.component.scss']
})
export class EditUserPopupComponent implements OnInit, OnChanges {
  @Input() user: any;
  @Output() onSave = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter<void>();

  editForm!: FormGroup;
  states: string[] = [];
  cities: string[] = [];

  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.states = Object.keys(this.userService.citiesByState);

    this.editForm = this.fb.group({
      firstName: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
    });

      // Initialize cities based on the selected state
      this.editForm.get('state')?.valueChanges.subscribe(() => {
        this.onStateChange();
      });

    if (this.user) {
      this.editForm.patchValue(this.user);
      this.onStateChange(); // Initialize cities based on the selected state
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user'] && !changes['user'].firstChange) {
      this.editForm.patchValue(changes['user'].currentValue);
      this.onStateChange(); // Update cities based on the selected state
    }
  }

  onStateChange(): void {
    const selectedState = this.editForm.get('state')?.value;
    this.cities = this.userService.getCitiesByState(selectedState);
  }

  save(): void {
    if (this.editForm.valid) {
      this.onSave.emit(this.editForm.value);
    }
  }

  cancel(): void {
    this.onCancel.emit();
  }
}
