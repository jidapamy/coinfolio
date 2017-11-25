import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { HomePage } from '../home/home';
import { DatacoinProvider, cryptoNumbers, cryto, asks, bids, NAME, crytoMix } from '../../providers/datacoin/datacoin';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { Storage } from '@ionic/storage';
import firebase from 'firebase';

import { LoadingController } from 'ionic-angular';

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
  usersData: FirebaseListObservable<any[]>;
  myCoinsData: FirebaseListObservable<any[]>;
  transactionData: FirebaseListObservable<any[]>;

  addTransaction: FormGroup;
  chooseType = 'buy';
  myDate: String = new Date().toISOString();
  crypto: crytoMix;
  tradePrice: number;
  status: any;

  errorStatus: string = '';
  date: Date = new Date();
  // myDate = this.date.toString().substring(4, 7) + '/' + this.date.toString().substring(8, 10) + '/' + this.date.getFullYear()

  usersArray: any[];
  keyCoinAlready:any;

  mycoinsPath: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public builder: FormBuilder,
    public viewCtrl: ViewController,
    public provider: DatacoinProvider,
    public angularfire: AngularFireDatabase,
    public storage: Storage,
    public loadingCtrl: LoadingController) {
    this.usersData = this.provider.userData;

    this.usersData.subscribe((data) => {
      this.usersArray = data
      console.dir(this.usersArray)

      let usernameLogin
      this.storage.ready().then(() => {
        this.provider.getUsername().then((data) => {
          usernameLogin = data;
          for (let i = 0; i < this.usersArray.length; i++) {
            if (this.usersArray[i].username == usernameLogin) {
              console.log('Key User:' + this.usersArray[i].$key + '/Username:' + this.usersArray[i].username)
              this.mycoinsPath = this.provider.getMycoinsPath(this.usersArray[i].$key);
              // this.myCoins = angularfire.list(this.);
              break;
            }
          }
          console.log(this.mycoinsPath)
        });
      });
    })

    this.crypto = this.navParams.data;
    this.tradePrice = this.crypto.last_price;
    // if (this.crypto.primary_currency == 'USD') {
    //   this.tradePrice = this.crypto.last_price * 34;
    // } else if (this.crypto.primary_currency == 'BTC') {

    // }

    this.addTransaction = this.builder.group({
      'status': ['', Validators.required],
      'tradePrice': [, Validators.required],
      'quantity': [, Validators.required],
      'date': [, Validators.required],
      'note': ['']
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
        this.errorStatus = 'Please choose a status.';
      }
    }

    return false;
  }

  saveTransation() {
    this.errorStatus = '';
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
      if (this.addTransaction.value.note == undefined) {
        this.addTransaction.value.note = ''
      }
      let dataAddTransaction = {
        status: this.addTransaction.value.status,
        tradePrice: this.addTransaction.value.tradePrice,
        quantity: this.addTransaction.value.quantity,
        total: price,
        date: this.addTransaction.value.date,
        note: this.addTransaction.value.note
      };

      let totalQuantity = this.addTransaction.value.quantity;
      let totalPrice = price;

      totalQuantity = +totalQuantity;
      totalPrice = +totalPrice

      let coin = {
        pairing_id: this.crypto.pairing_id,
        transaction: {},
        totalQuantity: totalQuantity.toFixed(2),
        totalPrice: totalPrice.toFixed(2)
      }

      let myCoin: any[] // array เก็บต่าของ coins ของตัวเอง
      console.log('this.mycoinsPath :' + this.mycoinsPath)


      this.myCoinsData = this.angularfire.list(this.mycoinsPath);
      this.myCoinsData.subscribe(data => {
        myCoin = data;
        console.dir(myCoin)
      })

      let already: boolean = false;
      let coinAlready:any;
      
      for (let i = 0; i < myCoin.length; i++) {
        console.log(`${myCoin[i].pairing_id} == ${coin.pairing_id}`)
        if (myCoin[i].pairing_id == coin.pairing_id) {
          already = true;
          // this.keyCoinAlready = myCoin[i].$key;
          coinAlready = myCoin[i];
          // console.log(`KeyCoin pairingid : ${myCoin[i].pairing_id} :  ${myCoin[i].$key}`);
          let transactionPath = this.provider.getTransactionPath(myCoin[i].$key);
          this.transactionData = this.angularfire.list(transactionPath);
          break;
        }
      }

      if (already == true) {  // มีเหรียญอยู่แล้ว add transaction
        console.log('already')
        let totalQuantity = ((+coinAlready.totalQuantity) + (+coin.totalQuantity));
        let totalPrice = ((+coinAlready.totalPrice) + (+coin.totalPrice))
        console.log(`coinAlready.totalQuantity ${coinAlready.totalQuantity} + coin.totalQuantity ${coin.totalQuantity}`)
        console.log(`coinAlready.totalPrice ${coinAlready.totalPrice} + coin.totalPrice ${coin.totalPrice}`)
        console.log('totalQuantity:' + totalQuantity + ' totalPrice:' + totalPrice)
        console.log('KEY:' + coinAlready.$key)
        this.transactionData.push(dataAddTransaction);
        this.myCoinsData.update(coinAlready.$key, { totalQuantity: totalQuantity, totalPrice: totalPrice})
      } else {  // เหรียญใหม่
        console.log('add')
        this.myCoinsData.push(coin);
        this.myCoinsData.subscribe(data => {
          myCoin = data;
        })
        let lastIndex = myCoin.length - 1;
        let transactionPath = this.provider.getTransactionPath(myCoin[lastIndex].$key);
        this.transactionData = this.angularfire.list(transactionPath);
        this.transactionData.push(dataAddTransaction);
      }
      console.log('myCoin: ' + myCoin.length)
    }
  }



  chooseStatus() {
    this.errorStatus = '';
  }

}
