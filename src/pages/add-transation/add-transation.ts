import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddTransationPage');
  }

}
