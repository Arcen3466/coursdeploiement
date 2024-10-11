import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy(); // Vérifie que le composant est bien créé
  });

  it('should have a form defined', () => {
    expect(component.registerForm).toBeDefined(); // Vérifie que le formulaire est défini
  });

  it('should be invalid when the form is empty', () => {
    expect(component.registerForm.valid).toBeFalsy(); // Le formulaire est invalide si vide
  });

  it('should validate the name field correctly', () => {
    const nameControl = component.registerForm.controls['name'];

    // Test si le champ 'name' est requis
    nameControl.setValue('');
    expect(nameControl.hasError('required')).toBeTruthy();

    // Test si le champ 'name' n'accepte pas des chiffres ou caractères spéciaux
    nameControl.setValue('123');
    expect(nameControl.hasError('pattern')).toBeTruthy();

    // Test si le champ 'name' accepte des valeurs correctes
    nameControl.setValue('John');
    expect(nameControl.valid).toBeTruthy();
  });

  it('should validate the email field correctly', () => {
    const emailControl = component.registerForm.controls['email'];

    // Test si le champ 'email' est requis
    emailControl.setValue('');
    expect(emailControl.hasError('required')).toBeTruthy();

    // Test si le champ 'email' n'accepte pas des adresses email invalides
    emailControl.setValue('invalid-email');
    expect(emailControl.hasError('email')).toBeTruthy();

    // Test si le champ 'email' accepte des valeurs correctes
    emailControl.setValue('test@example.com');
    expect(emailControl.valid).toBeTruthy();
  });

  it('should validate the birthday field (age >= 18)', () => {
    const birthdayControl = component.registerForm.controls['birthday'];

    // Test si le champ 'birthday' est requis
    birthdayControl.setValue('');
    expect(birthdayControl.hasError('required')).toBeTruthy();

    // Test si la validation d'âge fonctionne correctement (moins de 18 ans)
    birthdayControl.setValue('2010-01-01'); // Moins de 18 ans
    expect(birthdayControl.hasError('minAge')).toBeTruthy();

    // Test si la validation d'âge est correcte pour un âge supérieur ou égal à 18 ans
    birthdayControl.setValue('2000-01-01'); // 18 ans ou plus
    expect(birthdayControl.valid).toBeTruthy();
  });

  it('should validate the postalCode field correctly', () => {
    const postalCodeControl = component.registerForm.controls['postalCode'];

    // Test si le champ 'postalCode' est requis
    postalCodeControl.setValue('');
    expect(postalCodeControl.hasError('required')).toBeTruthy();

    // Test si le champ 'postalCode' n'accepte que des valeurs numériques de 5 chiffres
    postalCodeControl.setValue('123');
    expect(postalCodeControl.hasError('pattern')).toBeTruthy();

    // Test si le champ 'postalCode' accepte des valeurs correctes
    postalCodeControl.setValue('75001');
    expect(postalCodeControl.valid).toBeTruthy();
  });

  it('should show success message on valid form submission', () => {
    // Remplir tous les champs avec des valeurs valides
    component.registerForm.setValue({
      name: 'John',
      firstname: 'Doe',
      email: 'john.doe@example.com',
      birthday: '2000-01-01',
      city: 'Paris',
      postalCode: '75001'
    });

    component.onSubmit();
    expect(component.success).toBe('Votre inscription a été enregistrée avec succès!'); // Vérifie le message de succès
  });

  it('should show error message on invalid form submission', () => {
    // Remplir tous les champs avec des valeurs invalides
    component.registerForm.setValue({
      name: '',
      firstname: '',
      email: 'invalid-email',
      birthday: '',
      city: '',
      postalCode: ''
    });

    component.onSubmit();
    expect(component.error).toBe('Veuillez corriger les erreurs dans le formulaire.'); // Vérifie le message d'erreur
  });
});