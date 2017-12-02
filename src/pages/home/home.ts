import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ItemSliding, ModalController, MenuController, Content} from 'ionic-angular';
import { DatacoinProvider, cryptoCurrency,crypto } from '../../providers/datacoin/datacoin';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { CoinsDetailPage } from '../coins-detail/coins-detail';
import { AddTransationPage } from '../add-transation/add-transation';
import { MyApp } from '../../app/app.component';
import { EditTransactionPage } from '../edit-transaction/edit-transaction';
import { Screenshot } from '@ionic-native/screenshot';
import { HeaderPage } from '../header/header';
import { FolioPage } from '../folio/folio';
import { LoginPage } from '../login/login';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  @ViewChild(Content) content: Content
  usersData: FirebaseListObservable<any[]>;
  myCoinsData: FirebaseListObservable<any[]>;
  segment = 'THB';
  user: any;

  cryptoNumbers: crypto[] = [];
  cryptoMix: cryptoCurrency[] = [];
  cryptoTotal: cryptoCurrency[] = [];
  coins: cryptoCurrency[] = [];
  
  rateBtc: any = 0; // 1 BTC = 247900 THB
  rateEth: any = 0; // 1 ETC = 10600 THB
  rateUsd: any = 0; // 1 USD = 34 THB

  screen: any;
  state: boolean = false;
  
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public provider: DatacoinProvider,
    public modalCtrl: ModalController,
    private screenshot: Screenshot,
    public angularfire: AngularFireDatabase,
    public menuControl: MenuController) {
    this.mixNameCoins(); // ใส่ชื่อให้ Crypto + แยก 4 market
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  mixNameCoins() {
    this.provider.loadBX().subscribe(data => {
      this.cryptoNumbers = Object.keys(data).map(key => data[key]);
    },
      error => { console.log("error: " + error); },
      () => {
        this.provider.addName(this.cryptoMix, this.cryptoNumbers); 
        this.rateUsd = 34; // ค่าเงิน USD
        for (let i = 0; i < this.cryptoMix.length; i++) {
          if (this.cryptoMix[i].secondary_currency == 'BTC') {
            this.rateBtc = this.cryptoMix[i].last_price;
            this.provider.rateBtc = this.rateBtc;
          }
          if (this.cryptoMix[i].secondary_currency == 'ETH' && this.cryptoMix[i].primary_currency == 'THB') {
            this.rateEth = this.cryptoMix[i].last_price;
            this.provider.rateEth = this.rateEth;
          }
        }
        this.loopOfConvert('THB');
        this.loopOfConvert('BTC');
        this.loopOfConvert('ETH');
        this.loopOfConvert('USD');
        this.changeMarket(this.segment)
      })
  }

  loopOfConvert(type) {
    for (let i = 0; i < this.cryptoMix.length; i++) {
      this.pushCrytoTotal(type, i);
    }
    console.log(`${type} length : ${this.cryptoTotal.length}`)
  }

  pushCrytoTotal(type: any, index: number) {
    let lastIndex = this.cryptoTotal.length - 1;
    this.cryptoTotal.push({
      pairing_id: this.cryptoMix[index].pairing_id,
      primary_currency: type,
      secondary_currency: this.cryptoMix[index].secondary_currency,
      change: this.cryptoMix[index].change,
      last_price: this.convertMoney(this.cryptoMix[index], type),
      volume_24hours: this.cryptoMix[index].volume_24hours,
      nameCrypto: this.cryptoMix[index].nameCrypto,
      orderbook: this.cryptoMix[index].orderbook
    })
  }

  convertMoney(coin, type) {
    let price = 0;
    let priceDecimal;
    if (coin.primary_currency == 'THB') { // แปลงจากเงินบาท
      if (type == 'THB') {
        price = coin.last_price;
      } else if (type == 'BTC') {
        price = (coin.last_price / this.rateBtc);
      } else if (type == 'ETH') {
        price = (coin.last_price / this.rateEth);
      } else if (type == 'USD') {
        price = (coin.last_price / this.rateUsd);
      }
    } else if (coin.primary_currency == 'BTC') { // แปลงจากเงิน BTC
      if (type == 'THB') {
        price = (coin.last_price * this.rateBtc);
      } else if (type == 'BTC') {
        price = coin.last_price;
      } else if (type == 'ETH') {
        price = ((coin.last_price * this.rateBtc) / this.rateEth);
      } else if (type == 'USD') {
        price = ((coin.last_price * this.rateBtc) / this.rateUsd);
      }
    }

    // Decimal Format
    if (price < 1) {
      priceDecimal = price.toFixed(8);
    } else {
      priceDecimal = price.toFixed(2);
    }
    return priceDecimal;
  }

  // select segment
  changeMarket(type) {
    this.content.scrollToTop(300);
    this.segment = type;
    if (this.cryptoTotal.length > -1) {
      let filtered = this.cryptoTotal.filter(row => {
        if (row.primary_currency == type) {
          return true;
        } else {
          return false;
        }
      });
      this.coins = filtered;
    } else {
      console.log('No data');
    }
  }

  goToAddTransaction(slidingItem: ItemSliding, crypto: any): void {
    let modal = this.modalCtrl.create(AddTransationPage, crypto);
    if (this.user != ''){
      modal.present();
    }else{
      this.navCtrl.push(LoginPage); // go to login for user not login
    }
    slidingItem.close();
  }

  ngOnInit() {
    this.provider.getUserLogin().then(data =>{
      this.user = data;
      this.content.resize();
      console.log('ngOnInit')
      console.dir(this.user)
    })

  }

  goToDetail(crypto) {
    this.navCtrl.push(CoinsDetailPage, crypto);
  }

  goToMyCoins(){
    this.navCtrl.setRoot(FolioPage);
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

  
}
