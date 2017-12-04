import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController, Content } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { DatacoinProvider } from '../../providers/datacoin/datacoin';
/**
 * Generated class for the EditTransactionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-edit-transaction',
  templateUrl: 'edit-transaction.html',
})
export class EditTransactionPage {
  @ViewChild(Content) content: Content



  // myDate: String = new Date().toISOString();
  // transaction:any;
  // coin:any;
  // // status:any ="Buy";
  // tradePrice:any;
  // quantity:any;
  // total:any;
  // editTransactionForm: FormGroup;
  // errorStatus:any;


  // constructor(
  //   public navCtrl: NavController,
  //   public navParams: NavParams,
  //   public builder: FormBuilder,
  //   public viewCtrl: ViewController,
  //   public provider: DatacoinProvider) {
  //   this.transaction = this.navParams.get('transaction');
  //   this.coin = this.navParams.get('coin');
  //   // this.status = this.transaction.status;
  //   this.tradePrice = this.transaction.tradePrice;
  //   this.quantity = this.transaction.quantity;
  //   this.total = this.tradePrice * this.quantity


  //   this.editTransactionForm = this.builder.group({
  //     'status': ['', Validators.required],
  //     'tradePrice': [, Validators.required],
  //     'quantity': [, Validators.required],
  //     'date': [, Validators.required],
  //     'note': ['']
  //   });


  // }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad AddTransationPage');
  // }
  // getStatusDate(){
  //   console.log(this.myDate);
  // }
  // calPrice(event){
  //   console.log(event.target.value)
  //   this.total = this.tradePrice * this.quantity
  // }

  // editTransaction(){

  // }
  // chooseStatus() {
  //   this.errorStatus = '';
  // }

  editTransactionForm: FormGroup;
  chooseType = 'Buy';
  myDate: String = new Date().toISOString();
  crypto: any;
  status: any;
  transaction: any;
  errorStatus: string = '';
  tradePrice: any;
  quantity: any;
  total: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public builder: FormBuilder,
    public viewCtrl: ViewController,
    public provider: DatacoinProvider) {
    console.dir(this.navParams.data)
    this.crypto = this.navParams.get('coin');;
    this.transaction = this.navParams.get('transaction');
    console.dir(this.transaction)
    this.tradePrice = this.transaction.tradePrice;
    this.quantity = this.transaction.quantity;
    this.total = this.tradePrice * this.quantity
    console.log(`tradePrice: ${this.tradePrice} >> quantity:${this.quantity}`);

    this.editTransactionForm = this.builder.group({
      'status': [this.transaction.status, Validators.required],
      'tradePrice': [this.transaction.tradePrice, Validators.required],
      'quantity': [this.transaction.quantity, Validators.required],
      'date': [this.transaction.date, Validators.required],
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
    if (this.editTransactionForm.valid) {
      return true;
    }

    let controlStatus = this.editTransactionForm.controls['status'];
    if (controlStatus.invalid) {
      if (controlStatus.errors['required']) {
        this.errorStatus = 'Please choose a status.';
      }
    }

    return false;
  }

  editTransation() {
    this.errorStatus = '';
    if (this.validate()) {
      let trasactionDetail = this.editTransactionForm.value;
      this.viewCtrl.dismiss();
      console.log(this.editTransactionForm.value)

      // decimalFormat
      if (this.total < 1) {
        this.total = (+this.total).toFixed(8);
      } else {
        this.total = (+this.total).toFixed(2);
      }

      // no note in transaction
      if (this.editTransactionForm.value.note == undefined) {
        this.editTransactionForm.value.note = ''
      }

      // let quantityNew = this.editTransactionForm.value.quantity;
      // let priceNew = this.editTransactionForm.value.tradePrice;
      // // let totalQuantity

      // if (quantityNew.indexOf('.') == -1) {
      //   quantityNew = (+quantityNew)
      // } else {
      //   quantityNew = (+quantityNew)
      //   if (quantityNew >= 1) {
      //     quantityNew = (+quantityNew).toFixed(2)
      //     console.log('quantityNew >= 1 : ' + quantityNew)
      //   } else {
      //     quantityNew = (+quantityNew).toFixed(8)
      //     console.log('quantityNew < 1 : ' + quantityNew)
      //   }
      // }
      // console.log('quantityNew:' + quantityNew)

      let dataAddTransaction = {
        status: this.editTransactionForm.value.status,
        tradePrice: this.editTransactionForm.value.tradePrice,
        quantity: this.editTransactionForm.value.quantity,
        total: this.total,
        date: ('' + this.editTransactionForm.value.date).substr(0, 10),
        note: this.editTransactionForm.value.note
      };
      console.dir(dataAddTransaction)

      let oldQuantity = this.transaction.quantity
      let oldPrice = this.transaction.total

      let totalQuantity = this.crypto.totalQuantity;
      let totalPrice = this.crypto.totalPrice ;

      let resultTotalQuantity ;
      let resultTotalPrice;
      // Buy //Sell
      if (this.editTransactionForm.value.status == "Buy") {
        resultTotalQuantity = (totalQuantity - oldQuantity) + (+this.editTransactionForm.value.quantity);
        resultTotalPrice = (totalPrice - oldPrice) + (+this.total);
        console.log(`BUY = (${totalPrice}-${oldPrice})+${this.total} = ${resultTotalPrice}`)
      }else if(this.editTransactionForm.value.status == "Sell"){
        resultTotalQuantity = (totalQuantity - oldQuantity) + (+this.editTransactionForm.value.quantity);
        resultTotalPrice = (totalPrice - oldPrice) - (+this.total);
      }


      

      console.log('resultTotalQuantity ' + resultTotalQuantity)
      console.log('resultTotalPrice ' + resultTotalPrice)


      this.provider.updateTransaction(this.transaction.$key, dataAddTransaction)    //add transtion
      this.provider.updateAmountHolding(this.crypto, resultTotalQuantity, resultTotalPrice);  //update totalPrice & totalQuantity
      this.content.resize();

      

       // // object of Coin
      // let coins = {
      //   coin: { change: this.crypto.change, last_price: this.crypto.last_price, nameCrypto: this.crypto.nameCrypto, orderbook: this.crypto.orderbook, pairing_id: this.crypto.pairing_id, primary_currency: this.crypto.primary_currency, secondary_currency: this.crypto.secondary_currency, volume_24hours: this.crypto.volume_24hours },
      //   totalQuantity: totalQuantity,
      //   totalPrice: totalPrice
      // }


      //calculate total
      // let totalQuantity = this.editTransactionForm.value.quantity;
      // let totalPrice = this.total ;
      // if (totalQuantity.indexOf('.') == -1) {
      //   totalQuantity = (+totalQuantity)
      // } else {
      //   totalQuantity = (+totalQuantity)
      //   if (totalQuantity >= 1) {
      //     totalQuantity = (+totalQuantity).toFixed(2)
      //     console.log('totalQuantity >= 1 : ' + totalQuantity)
      //   } else {
      //     totalQuantity = (+totalQuantity).toFixed(8)
      //     console.log('totalQuantity < 1 : ' + totalQuantity)
      //   }

      // }
      // console.log('totalQuantity:' + totalQuantity)

      // // object of transaction
      // let dataAddTransaction = {
      //   status: this.editTransactionForm.value.status,
      //   tradePrice: this.editTransactionForm.value.tradePrice,
      //   quantity: this.editTransactionForm.value.quantity,
      //   total: this.total,
      //   date: ('' + this.editTransactionForm.value.date).substr(0, 10),
      //   note: this.editTransactionForm.value.note
      // };

      // // object of Coin
      // let coins = {
      //   coin: { change: this.crypto.change, last_price: this.crypto.last_price, nameCrypto: this.crypto.nameCrypto, orderbook: this.crypto.orderbook, pairing_id: this.crypto.pairing_id, primary_currency: this.crypto.primary_currency, secondary_currency: this.crypto.secondary_currency, volume_24hours: this.crypto.volume_24hours },
      //   totalQuantity: totalQuantity,
      //   totalPrice: totalPrice
      // }

      // // แปลงค่าเงินให้เป็นเงินไทย
      // if (this.crypto.primary_currency == "BTC") {
      //   let rateBtc = this.provider.rateBtc;
      //   coins.totalPrice = coins.totalPrice * rateBtc;
      // } else if (this.crypto.primary_currency == "ETH") {
      //   let rateEth = this.provider.rateEth;
      //   coins.totalPrice = coins.totalPrice * rateEth;
      // } else if (this.crypto.primary_currency == "USD") {
      //   coins.totalPrice = coins.totalPrice * 34;
      // } else if (this.crypto.primary_currency == "THB") {
      //   coins.totalPrice = coins.totalPrice;
      //   console.log('THB' + coins.totalPrice)
      // }

      // let myCoins = this.provider.getMycoins(); //เก็บเหรียญทั้งหมดของตัวเอง เป็น array
      // let already: boolean = false;
      // let coinAlready: any;
      // console.log('Coins')
      // // console.dir(this.navParams.data)

      //   if (dataAddTransaction.status == 'Buy') {
      //     totalQuantity = ((+this.crypto.totalQuantity) + (+coins.totalQuantity))
      //     totalQuantity = ((+this.crypto.totalQuantity) + (+coins.totalQuantity));
      //     totalPrice = ((+this.crypto.totalPrice) + (+coins.totalPrice))
      //   } else if (dataAddTransaction.status == 'Sell') {
      //     totalQuantity = ((+this.crypto.totalQuantity) - (+coins.totalQuantity));
      //     totalPrice = ((+this.crypto.totalPrice) - (+coins.totalPrice))
      //   } else if (dataAddTransaction.status == 'Watch') {
      //     totalQuantity = (+this.crypto.totalQuantity);
      //     totalPrice = (+this.crypto.totalPrice);
      //   }
      //   this.provider.coinsKey = this.crypto.$key
      //   console.log('this.transaction.$key : ' + this.transaction.$key)
      //   console.dir(dataAddTransaction)
      //   this.provider.updateTransaction(this.transaction.$key,dataAddTransaction)    //add transtion
      //   this.provider.updateAmountHolding(this.crypto, totalQuantity, totalPrice);  //update totalPrice & totalQuantity
      } 
    }

    chooseStatus() {
      this.errorStatus = '';
    }

    calPrice(event){
      console.log(event.target.value)
      this.total = this.tradePrice * this.quantity
    }

  }
