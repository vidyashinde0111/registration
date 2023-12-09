import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';


@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {
  registrationForm!: FormGroup;
  formData: any[] = [];
  submitted = false;
  showEditPopup = false;
  selectedUser: any;
  users: any[] = [];
  states: string[] = [];
  cities: string[] = [];

  constructor(private fb: FormBuilder, public userService: UserService) { }

  ngOnInit(): void {
    this.userService.getRegisteredUsers().subscribe(users => {
      this.users = users;

      this.states = Object.keys(this.userService.citiesByState);
      this.registrationForm = this.fb.group({
        firstName: ['', [Validators.required]],
        mobileNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
      });

      // Update cities based on the selected state
      this.registrationForm.get('state')?.valueChanges.subscribe((selectedState: string) => {
        this.cities = this.userService.getCitiesByState(selectedState);
      });
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      this.submitted = true;
      this.userService.registerUser(this.registrationForm.value);
      this.registrationForm.reset();
    }
  }


  onEdit(index: number): void {
    this.selectedUser = this.users[index];
    this.showEditPopup = true;
  }

  onSaveEdit(updatedUser: any): void {
    const index = this.users.findIndex(user => user === this.selectedUser);
    if (index !== -1) {
      this.users[index] = updatedUser;
      this.userService.updateStoredUsers(this.users);
      this.showEditPopup = false;
    }
  }

  onCancelEdit(): void {
    this.showEditPopup = false;
  }


  onDelete(index: number): void {
    if (confirm('Are you sure you want to delete this data?')) {
      this.userService.deleteUser(index);
      this.formData.splice(index, 1);
      this.userService.updateStoredUsers(this.users);
    }
  }
}
