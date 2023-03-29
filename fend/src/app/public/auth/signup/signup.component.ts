import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/_service/auth.service';

import { User } from '../../../_model/auth/auth.entity';

import { first } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  User!: User;

  form!: UntypedFormGroup;
  submitted: boolean = false;
  loading: boolean = false;
  error: string = '';
  public formInvalid: boolean;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) {
    // 
    console.log('constructor');

    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstname: [''],
      lastname: ['']
      // status: ['ACTIVE', Validators.required],
    });
    // 
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  async ngOnInit() {
    // 
    console.log('signup-ngOnInit');

    this.f.username.setValue('m.tr@email.cz');
    this.f.password.setValue('Test.-11');
    this.f.firstname.setValue('Milošek');
    this.f.lastname.setValue('Trachtík');
    // this.f.status.setValue('ACTIVE');
    // 
  }

  async onSubmit() {
    // 
    console.log('signup-onSubmit')
    // 
    this.submitted = true;

    // stop here if form is invalid
    console.log()
    if (this.form.valid) {
      console.log('signup-onSubmit().form => valid');
      this.User = new User();

      this.User.username = this.f.username.value;
      this.User.password = this.f.password.value;
      this.User.firstname = this.f.firstname.value;
      this.User.lastname = this.f.lastname.value;

      console.log("user: " + JSON.stringify(this.User));

      this.authService.signup(this.User)
        .subscribe((res: any) => {
          console.log('signup-onSubmit.subscribe');
          this.router.navigate(['/']);
        });

    } else {
      console.log('signup-onSubmit().form => invalid');
      this.submitted = true;
    }

  }

}
