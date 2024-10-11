import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  success!: string;
  error!: string;

  constructor(
    private form: FormBuilder,
  ) {
    this.registerForm = this.form.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z \'-àâäéèêëïîôöùûüç]*')]],
      firstname: ['', [Validators.required, Validators.pattern('[a-zA-Z \'-àâäéèêëïîôöùûüç]*')]],
      email: ['', [Validators.required, Validators.email]],
      birthday: ['', [Validators.required, this.validateAge]],
      city: ['', [Validators.required, Validators.pattern('[a-zA-Z \'-àâäéèêëïîôöùûüç]*')]],
      postalCode: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]]
    });
  }

  validateAge(control: any) {
    const birthDate = new Date(control.value);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    return age < 18 ? { minAge: true } : null;
  }

  public onSubmit() {
    if (this.registerForm.valid) {
      console.log('Form OK', this.registerForm.value);
      this.showSucces('Votre inscription a été enregistrée avec succès!');
      this.registerForm.reset();
    } else {
      this.showError('Veuillez corriger les erreurs dans le formulaire.');
    }
    
  }
    // Toaster fait maison
    showSucces(value: string): void {
    this.success= value;
    setTimeout(() => {
      this.success= "";
    }, 6000);
  }
    showError(value: string): void {
    this.error= value;
    setTimeout(() => {
      this.error= "";
    }, 6000);
  }
  

  get name() { return this.registerForm.get('name'); }
  get firstname() { return this.registerForm.get('firstname'); }
  get email() { return this.registerForm.get('email'); }
  get birthday() { return this.registerForm.get('birthday'); }
  get city() { return this.registerForm.get('city'); }
  get postalCode() { return this.registerForm.get('postalCode'); }
}