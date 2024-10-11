import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  success!: string;
  error!: string;

  constructor(
    private form: FormBuilder,
    private http: HttpClient  // Inject HttpClient
  ) {
    this.registerForm = this.form.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿ\s]+$/)]],
      firstname: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿ\s]+$/)]],
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
      //envoie des données au serveur Express
      this.http.post('http://localhost:3000/register', this.registerForm.value)
        .subscribe({
          next: (response: any) => {
            this.showSucces('Votre inscription a été enregistrée avec succès!');
            this.registerForm.reset();
          },
          error: (error) => {
            this.showError('Erreur lors de l\'inscription. Veuillez réessayer.');
          }
        });
    } else {
      this.showError('Veuillez corriger les erreurs dans le formulaire.');
    }
  }
    //toaster fait maison (car j'avais de gros problèmes avec les librairies de toasts)
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