import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms' 
import { HomePage } from '../home/home';
import { DatacoinProvider, cryptoNumbers, cryto, asks, bids, NAME, crytoMix } from '../../providers/datacoin/datacoin';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

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
  myCoins: FirebaseListObservable<any[]>;

  addTransaction: FormGroup;
  chooseType='buy';
  crypto:crytoMix;
  status:any;
  errorStatus:string='';
  errorTradePrice: string = '';
  errorQuantity: string = '';
  date: Date = new Date();
  myDate = this.date.toString().substring(4, 7) + '/' + this.date.toString().substring(8, 10) + '/' + this.date.getFullYear()
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public builder: FormBuilder, 
              public viewCtrl: ViewController,
              public provider: DatacoinProvider,
              public angularfire: AngularFireDatabase) {
    this.myCoins = angularfire.list('/myCoins');

    this.crypto = this.navParams.data;
    this.addTransaction = this.builder.group({
      'status': ['', Validators.required],
      'tradePrice': [,Validators.required],
      'quantity': [, Validators.required],
      'date': [, Validators.required],
      'note':['']
    });
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddTransationPage');
  }

  goBack() {
    this.navCtrl.pop();
  }

  validate(): any {
    if (this.addTransaction.valid) {
      return true;
    }

    let controlStatus = this.addTransaction.controls['status'];
    if (controlStatus.invalid) {
      if (controlStatus.errors['required']) {
        this.errorStatus  = 'Please choose a status.';
      }
    }

    return false;
  }

  saveTransation() {
    this.errorStatus = '';
    this.errorTradePrice=''
    if (this.validate()) {
      let trasactionDetail = this.addTransaction.value;
      this.viewCtrl.dismiss();
      let calculate = this.addTransaction.value.tradePrice * this.addTransaction.value.quantity;
      console.log('calculate>>' + calculate + ' type:' + typeof (calculate))
      let price;
      if (calculate < 1) {
        console.log('<1')
        price = (this.addTransaction.value.tradePrice * this.addTransaction.value.quantity).toFixed(8);
      } else {
        console.log('>=1')
        price = (this.addTransaction.value.tradePrice * this.addTransaction.value.quantity).toFixed(2);
      }
      console.log('Value:' + price);
      // this.dataAddTransaction.coin=;
      if (this.addTransaction.value.note==undefined){
        this.addTransaction.value.note = ''
      }
      let dataAddTransaction = { 
                                 status: this.addTransaction.value.status, 
                                 tradePrice: this.addTransaction.value.tradePrice, 
                                 quantity: this.addTransaction.value.quantity, 
                                 total: price, 
                                 date: this.addTransaction.value.date, 
                                 note: this.addTransaction.value.note}; 
      let totalQuantity = this.addTransaction.value.quantity;
      let totalPrice = price;
      
      totalQuantity = +totalQuantity;
      totalPrice = +totalPrice
      let coin = {
          pairing_id: this.crypto.pairing_id,
          transaction: [dataAddTransaction],
          totalQuantity:totalQuantity.toFixed(2),
          totalPrice: totalPrice.toFixed(2)
      }

      console.dir('COIN::::' + coin) 
      this.myCoins.push(coin);
      console.dir('saveTransation:>' + dataAddTransaction.status);
    } 
  }

  chooseStatus(){
      this.errorStatus='';
  }

}
