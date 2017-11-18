import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms' 
import { HomePage } from '../home/home';
/**
 * Generated class for the AddTransationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-transation',
  templateUrl: 'add-transation.html',
})
export class AddTransationPage {
  typeTransaction: FormGroup;
  chooseType='buy';
  crypto:any[];
  status:any = '';
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public builder: FormBuilder, 
              public viewCtrl: ViewController) {
    this.crypto = this.navParams.data;
    this.typeTransaction = this.builder.group({
      'type': ['buy', Validators.required]
    });
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddTransationPage');
  }

  goBack() {
    this.navCtrl.pop();
  }

  saveTransation(){
    this.viewCtrl.dismiss();
  }
}
