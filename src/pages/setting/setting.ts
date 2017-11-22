import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';




/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {
<<<<<<< HEAD
  signupForm: FormGroup;
  errorUsername: string = '';
  errorPassword: string = '';
  errorRepassword: string = '';
  errorEmail: string = '';
  errorEmailswap:string='';
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public builder: FormBuilder,
    public alertCtrl: AlertController) {
    this.signupForm = this.builder.group({
      'username': ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9]*'), Validators.minLength(8)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      'rePassword': ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      // 'email': ['', Validators.compose([Validators.required, Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')])]
      'email': ['', Validators.compose([Validators.required, Validators.email])]
    });

  }
=======
  

>>>>>>> 01f0afd2a7de63b529de0d363873973fa3d7d8fa

  constructor(public navCtrl: NavController, public navParams: NavParams){
    
  }
  

  validate(): boolean {

    if (this.signupForm.valid) {
      return true;
    }
    let controlUsername = this.signupForm.controls['username'];
    let controlPassword = this.signupForm.controls['password'];
    let controlRepassword = this.signupForm.controls['rePassword'];
    let controlEmail = this.signupForm.controls['email'];
    if (controlUsername.errors['required']) {
      this.errorUsername = '*Please provide a username.';
    } else if (controlUsername.errors['minlength']) {
      this.errorUsername = '*The username must have at least ' + controlUsername.errors['minlength'].requiredLength + ' characters.';
    } else if (controlUsername.errors['pattern']) {
      this.errorUsername = '*Only a-z, A-Z, 0-9 allowed in Username';
    }

    if (controlPassword.invalid) {
      if (controlPassword.errors['required']) {
        this.errorPassword = '*Please provide a password.';
      } else if (controlPassword.errors['minlength']) {
        this.errorPassword = '*The password must have at least ' + controlPassword.errors['minlength'].requiredLength + ' characters.';
      }
    }

    if (controlRepassword.invalid) {
      if (controlRepassword.errors['required']) {
        this.errorRepassword = '*Please provide a password.';
      } else if (controlRepassword.errors['minlength']) {
        this.errorRepassword = '*The password must have at least ' + controlRepassword.errors['minlength'].requiredLength + ' characters.';
      }
    } else {
      if (controlPassword.value != controlRepassword.value) {
        console.log('controlRepassword : no match');
        this.errorRepassword = '* The password is not match!!';
      }
    }

    if (controlEmail.invalid) {
      if (controlEmail.errors['required']) {
        this.errorEmail = '* Please provide a email.';
      }
      // else if (controlEmail.errors['pattern']) {
      else if (controlEmail.errors['pattern']) {
        this.errorEmail = '* The email must have "@" in your email.'
        this.errorEmailswap='Example : example123@gmail.com';
      }
    }

    return false;
  }

  submit(): void {
    this.errorUsername = '';
    this.errorPassword = '';
    this.errorRepassword = '';
    this.errorEmail = '';
    this.errorEmailswap = '';
    if (this.validate()) {
      console.log(this.signupForm.value);
      if (this.signupForm.value.password != this.signupForm.value.rePassword) {
        console.log('controlRepassword : no match');
        this.errorRepassword = '* The password is not match!!';
      }
    }
  }

}




