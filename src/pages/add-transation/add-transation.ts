import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { DatacoinProvider, cryptoCurrency } from '../../providers/datacoin/datacoin';
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
  addTransactionForm: FormGroup;
  myDate: String = new Date().toISOString();
  crypto: cryptoCurrency;
  status: any = 'Buy';

  errorStatus: string = '';

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public builder: FormBuilder,
    public viewCtrl: ViewController,
    public provider: DatacoinProvider,
    public angularfire: AngularFireDatabase) {
    this.crypto = this.navParams.data;
    this.addTransactionForm = this.builder.group({
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
    if (this.addTransactionForm.valid) {
      return true;
    }

    let controlStatus = this.addTransactionForm.controls['status'];
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
      let trasactionDetail = this.addTransactionForm.value;
      this.viewCtrl.dismiss();
      let calculate = this.addTransactionForm.value.tradePrice * this.addTransactionForm.value.quantity;
      // console.log('calculate>>' + calculate + ' type:' + typeof (calculate))
      let price;

      // decimalFormat
      if (calculate < 1) {
        price = (this.addTransactionForm.value.tradePrice * this.addTransactionForm.value.quantity).toFixed(8);
      } else {
        price = (this.addTransactionForm.value.tradePrice * this.addTransactionForm.value.quantity).toFixed(2);
      }

      // no note in transaction
      if (this.addTransactionForm.value.note == undefined) {
        this.addTransactionForm.value.note = ''
      }

      //calculate total
      let totalQuantity = this.addTransactionForm.value.quantity;
      let totalPrice = price;
      totalPrice = +totalPrice
      if (totalQuantity.indexOf('.') == -1) {
        totalQuantity = (+totalQuantity)
      } else {
        totalQuantity = (+totalQuantity)
        if (totalQuantity >= 1) {
          totalQuantity = (+totalQuantity).toFixed(2)
          console.log('totalQuantity >= 1 : ' + totalQuantity)
        } else {
          totalQuantity = (+totalQuantity).toFixed(8)
          console.log('totalQuantity < 1 : ' + totalQuantity)
        }

      }
      console.log('totalQuantity:' + totalQuantity)

      // object of transaction
      let dataAddTransaction = {
        status: this.addTransactionForm.value.status,
        tradePrice: this.addTransactionForm.value.tradePrice,
        quantity: this.addTransactionForm.value.quantity,
        total: price,
        date: ('' + this.addTransactionForm.value.date).substr(0, 10),
        note: this.addTransactionForm.value.note
      };

      // object of Coin
      let coins = {
        coin: { change: this.crypto.change, last_price: this.crypto.last_price, nameCrypto: this.crypto.nameCrypto, orderbook: this.crypto.orderbook, pairing_id: this.crypto.pairing_id, primary_currency: this.crypto.primary_currency, secondary_currency: this.crypto.secondary_currency, volume_24hours: this.crypto.volume_24hours },
        totalQuantity: totalQuantity,
        totalPrice: totalPrice
      }

      // แปลงค่าเงินให้เป็นเงินไทย
      if (this.crypto.primary_currency == "BTC") {
        let rateBtc = this.provider.rateBtc;
        coins.totalPrice = coins.totalPrice * rateBtc;
      } else if (this.crypto.primary_currency == "ETH") {
        let rateEth = this.provider.rateEth;
        coins.totalPrice = coins.totalPrice * rateEth;
      } else if (this.crypto.primary_currency == "USD") {
        coins.totalPrice = coins.totalPrice * 34;
      } else if (this.crypto.primary_currency == "THB") {
        coins.totalPrice = coins.totalPrice;
        console.log('THB' + coins.totalPrice)
      }

      let myCoins = this.provider.getMycoins(); //เก็บเหรียญทั้งหมดของตัวเอง เป็น array
      let already: boolean = false;
      let coinAlready: any;

      // check เหรียญที่เพิ่ม transition ว่ามีอยู่แล้วหรือป่าว
      for (let i = 0; i < myCoins.length; i++) {
        console.log(`${myCoins[i].coin.pairing_id} == ${coins.coin.pairing_id}`)
        if (myCoins[i].coin.pairing_id == coins.coin.pairing_id &&
          myCoins[i].coin.secondary_currency == coins.coin.secondary_currency &&
          myCoins[i].coin.primary_currency == coins.coin.primary_currency) {
          already = true;
          coinAlready = myCoins[i];
          break;
        }
      }

      if (already == true) {  // มีเหรียญอยู่แล้ว add transaction
        let totalQuantity;
        let totalPrice;
        // เชคว่า status เป็นแบบไหนเพื่อทำการคำนวน total
        if (dataAddTransaction.status == 'Buy') {
          totalQuantity = ((+coinAlready.totalQuantity) + (+coins.totalQuantity));
          totalPrice = ((+coinAlready.totalPrice) + (+coins.totalPrice))
        } else if (dataAddTransaction.status == 'Sell') {
          totalQuantity = ((+coinAlready.totalQuantity) - (+coins.totalQuantity));
          totalPrice = ((+coinAlready.totalPrice) - (+coins.totalPrice))
        } else if (dataAddTransaction.status == 'Watch') {
          totalQuantity = (+coinAlready.totalQuantity);
          totalPrice = (+coinAlready.totalPrice);
        }


          this.provider.coinsKey = coinAlready.$key
          this.provider.addTransactionAlreadyCoin(dataAddTransaction)    //add transtion
          this.provider.updateAmountHolding(coinAlready, totalQuantity, totalPrice);  //update totalPrice & totalQuantity
        } else {  // เหรียญใหม่
          // เชคว่า status เป็นแบบไหนเพื่อทำการคำนวน total
          if (dataAddTransaction.status == 'Watch') {
            coins.totalPrice = 0
            coins.totalQuantity = 0
          } else if (dataAddTransaction.status == 'Sell') {
            coins.totalPrice = 0 - coins.totalPrice
            coins.totalQuantity = coins.totalQuantity
          }
          console.log('Add new coin')
          console.dir(coins)
          this.provider.addMycoins(coins);        // add new coin
          myCoins = this.provider.getMycoins();
          this.provider.coinsKey = myCoins[myCoins.length - 1].$key
          this.provider.addTransactionAlreadyCoin(dataAddTransaction); // add transition in new Coin
        }
      }
    }

    chooseStatus() {
      this.errorStatus = '';
    }

  }
