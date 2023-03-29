import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthService } from 'src/app/_service/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  form!: UntypedFormGroup;
  submitted: boolean = false;
  loading: boolean = true;
  error: string = '';
  public formInvalid: boolean = false;


  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) {
    // 
    console.log('signin-constructor');

    this.form = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  ngOnInit(): void {
    // 
    console.log('signin-ngOnInit');
    // 
    this.f.username.setValue('m.tr@email.cz');
    this.f.password.setValue('Test.-11');
    //
  }

  onSubmit() {
    // 
    console.log('signin-onSubmit');

    this.submitted = true;

    // stop here if form is invalid
    if (this.form.valid) {
      console.debug('signin-onSubmit().form => valid');
      this.loading = true;
      // 
      this.authService.signin(
        this.f.username.value,
        this.f.password.value
      )
        .pipe(first())
        .subscribe({
          next: () => {
            console.log('signin-onSubmit.next');
            const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/prv';
            console.log('signin-onSubmit.next.returnUrl: ' + JSON.stringify(returnUrl));
            this.router.navigate([returnUrl]);
          },
          error: error => {
            console.error('signin-onSubmit.error: ' + JSON.stringify(error));
            this.error = error;
            this.loading = false;
          }
        });
      // 
    } else {
      console.log('signin-onSubmit.formInvalid' + this.form.invalid);
      return;
    }





  }

  getErrorMessage() {
    if (this.f.username.hasError('required')) {
      return 'You must enter a value';
    }
  }

}
