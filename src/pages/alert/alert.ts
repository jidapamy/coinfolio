import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { DatacoinProvider } from '../../providers/datacoin/datacoin';
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
  priceAbove:any;
  priceBlow: any;
  secondary:any;
  


  alert: FormGroup;
  constructor(public builder: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
    this.chooseCrypto = this.navParams.data;
    this.secondary = this.chooseCrypto.secondary_currency + "/" + this.chooseCrypto.primary_currency;
    
    if(this.chooseCrypto.last_price > 1){
    this.cryptoNumbers = (this.chooseCrypto.last_price).toFixed(2);
    }else{
      this.cryptoNumbers = (this.chooseCrypto.last_price).toFixed(8);
    }
    this.alert = this.builder.group({
      'above': [0, Validators.required],
      'below': [0, Validators.required],
      'current':[]
    });
      if (this.chooseCrypto.last_price>1){
        this.priceAbove = ((+this.chooseCrypto.last_price) + 0.01).toFixed(2);
        this.priceBlow = ((+this.chooseCrypto.last_price) - 0.01).toFixed(8);
      }else{
      this.priceAbove = ((+this.chooseCrypto.last_price) + 0.00000001).toFixed(8);
      this.priceBlow = ((+this.chooseCrypto.last_price) - 0.00000001).toFixed(8);
      
      }
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlertPage');
  }
  validate(): any {
    if (this.alert.valid) {
      return true;
    }

    let controlAblove = this.alert.controls['ablove'];
    let controlBelow = this.alert.controls['below'];
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
