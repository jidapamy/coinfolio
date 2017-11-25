import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { DatacoinProvider, cryptoNumbers, cryto, asks, bids, NAME, crytoMix } from '../../providers/datacoin/datacoin';
/**
 * Generated class for the AlertPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-alert',
  templateUrl: 'alert.html',
})

export class AlertPage {
  cryptoNumbers: any;
  chooseCrypto:any;
  priceAblove:any;
  priceBlow: any;

  addTransaction: FormGroup;
  constructor(public builder: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
    this.chooseCrypto = this.navParams.data;
    this.cryptoNumbers = (this.chooseCrypto.last_price).toFixed(8);

    this.addTransaction = this.builder.group({
      'ablove': [0, Validators.required],
      'below': [0, Validators.required],
      'current':[]
    });
      if (this.chooseCrypto.last_price>1){
      this.priceAblove = (+this.chooseCrypto.last_price) + 0.01;
      this.priceBlow = (+this.chooseCrypto.last_price) - 0.01;
      }else{
      this.priceAblove = ((+this.chooseCrypto.last_price) + 0.00000001).toFixed(8);
      this.priceBlow = ((+this.chooseCrypto.last_price) - 0.00000001).toFixed(8);
      
      }
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlertPage');
  }
  validate(): any {
    if (this.addTransaction.valid) {
      return true;
    }

    let controlAblove = this.addTransaction.controls['ablove'];
    let controlBelow = this.addTransaction.controls['below'];
    if (controlAblove.invalid) {
      if (controlAblove.errors['required']) {
      }
    }
    if (controlBelow.invalid) {
      if (controlBelow.errors['required']) {
      }
    }
return false;
  }
saveAlert() {
  if (this.validate()) {
    console.log("Next");
  }
}

  
}
