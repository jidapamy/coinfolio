import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { DatacoinProvider, tempStatisticsCoinsDetail, tempbookorderBidItem, tempbookorderBid, tempbookorder, cryptoCurrency } from '../../providers/datacoin/datacoin';
import Highcharts from 'highcharts/highstock';
import * as HighCharts from 'highcharts';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Screenshot } from '@ionic-native/screenshot';
import { HomePage } from '../home/home';
import { FolioPage } from '../folio/folio';
import { Content } from 'ionic-angular';
import { EditTransactionPage } from '../edit-transaction/edit-transaction';
import { AddTransationPage } from '../add-transation/add-transation';
import { CoinsDetailPage } from '../coins-detail/coins-detail';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
  @ViewChild(Content) content: Content
  cryptoTotal: cryptoCurrency[] = []
  crypto: any;
  priceperday: any;
  priceOfDay: any[] = [];

  dateTimes: string;

  screen: any;
  state: boolean = false;


  itemBids: tempbookorderBidItem[] = [];
  tempbookorderBid: tempbookorderBid[]
  bookOrder: tempbookorder[];

  coins: tempStatisticsCoinsDetail[];

  transactionList: transaction[] = [];
  thisCoins: any;
  result: any;
  marketValue: any;

  // myCoins:my

  constructor(private screenshot: Screenshot,
    public navCtrl: NavController,
    public navParams: NavParams,
    public provider: DatacoinProvider,
    public angularfire: AngularFireDatabase,
    public modalCtrl: ModalController) {
    this.crypto = this.navParams.data;
    console.log('this.crypto')
    console.dir(this.crypto);
    // this.orderbook = this.crypto.cryptoCurrency.orderbook;
    console.log('Result ' + this.result)

    console.dir(this.crypto);
    this.ModifyData();
  }

  goTOEditTransactionPage(transaction) {
    // this.navCtrl.push(EditTransactionPage, { transaction: transaction, coin: this.crypto.myCoins });
    this.openModal(EditTransactionPage, { transaction: transaction, coin: this.crypto.myCoins });
  }

  goTOAddTransationPage() {
    console.log(this.crypto.cryptoCurrency)
    this.openModal(AddTransationPage, this.crypto.cryptoCurrency);
  }
  goToHomePage() {
    this.navCtrl.setRoot(HomePage);
    // this.navCtrl.push(CoinsDetailPage,crypto);
  }

  openModal(page, param) {
    let modal = this.modalCtrl.create(page, param);
    modal.present();
    modal.onDidDismiss(data => {
      console.log(data)
      let myCoins = this.provider.getMycoins();
      console.dir(myCoins)
      for (let i = 0; i < myCoins.length; i++) {
        if (myCoins[i].$key == this.provider.coinsKey) {
          console.log(this.provider.coinsKey + ' = ' + myCoins[i].$key)
          console.log(this.crypto.myCoins.totalPrice + ' = ' + myCoins[i].totalPrice)
          this.crypto.myCoins.totalPrice = this.provider.decimalFormat(myCoins[i].totalPrice)
          this.crypto.myCoins.totalQuantity = this.provider.decimalFormat(myCoins[i].totalQuantity);
        }
      }
      this.ModifyData();
    })

  }
  ModifyData() {
    this.marketValue = this.provider.decimalFormat((this.crypto.myCoins.totalQuantity * this.crypto.cryptoCurrency.last_price));
    this.result = this.marketValue - this.crypto.myCoins.totalPrice
    this.result = '' + this.result
    if (this.result.indexOf('.') == -1) {
      this.result = +this.result
      this.result = this.result.toFixed(0)
    } else {
      this.result = +this.result
      if (this.result < -100 || this.result > 1) {
        this.result = this.result.toFixed(2)
      } else if (this.result == 0) {
        this.result = this.result.toFixed(0)
      } else {
        this.result = this.result.toFixed(8)
      }
    }

    this.transactionList.length = 0;
    let transationParam = this.provider.getTransactionOfCoin();
    for (let i = 0; i < transationParam.length; i++) {
      if (transationParam[i].status != 'Watch') {
        this.transactionList.unshift(transationParam[i])
      }
    }
    console.log('transactionList');
    console.dir(this.transactionList)
  }


  reset() {
    var self = this;
    setTimeout(function () {
      self.state = false;
    }, 1000);
  }

  screenShot() {
    this.screenshot.save('jpg', 80).then(res => {
      this.screen = res.filePath;
      this.state = true;
      this.reset();
    });
  }
  gotoGraph(){
    this.navCtrl.push(CoinsDetailPage, {crypto : this.crypto,type:'detail'})
  }


  ionViewDidLoad() {
    console.log("ionViewDidLoad")
  }
  
  goToFolio() {
    this.navCtrl.setRoot(FolioPage);
  }

  // refreshPage() {
  //   console.log('refresh')
  //   this.content.resize();
  // }

  ngOnInit() {
    console.log('Detail : ngOnInit')
    this.provider.updatePage = false;
    if (this.provider.updatePage) {
      this.content.resize();
      console.log('resize()');
    }
  }

}


export class transaction {
  status: any;
  tradePrice: any;
  quantity: any;
  total: any;
  date: any;
  note: any;
}