import { Component } from '@angular/core';
import { NavController, NavParams, ViewController} from 'ionic-angular';

/**
 * Generated class for the PasscodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-passcode',
  templateUrl: 'passcode.html',
})
export class PasscodePage {
  amountPush: number = 0;
  temp:any[];
  constructor(public viewCtrl: ViewController,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  pushNumber(numbers) {
    this.amountPush++;
    if (this.amountPush == 6) {
    //  this.temp[this.amountPush]={number}

      // setTimeout(() => { this.viewCtrl.dismiss(); }, 400);

    }
    console.log('push : ' + this.temp);

  }

  removeNumber() {
    this.amountPush--;
  }

  goToHome() {
    this.viewCtrl.dismiss();
  }


}
