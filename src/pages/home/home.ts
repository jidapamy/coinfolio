import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ItemSliding, ModalController, MenuController, Content} from 'ionic-angular';
import { DatacoinProvider, cryptoCurrency,crypto } from '../../providers/datacoin/datacoin';
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
  segment = 'THB';
  user: any;
  cryptoTotal: cryptoCurrency[] = [];
  coins: cryptoCurrency[] = [];

  screen: any;
  state: boolean = false;
  
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public provider: DatacoinProvider,
    public modalCtrl: ModalController,
    private screenshot: Screenshot,
    public menuControl: MenuController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
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
    console.log('this.coins')
    console.dir(this.coins);
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

    let intervel = setInterval(() => {        // fetch data BXCoin API
      if (this.cryptoTotal.length == 0) {
        this.cryptoTotal = this.provider.getBxCoin();
        console.log('this.cryptoTotal')
        console.dir(this.cryptoTotal)
        clearInterval(intervel);
        this.changeMarket(this.segment);
      }
    }, 300);


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
