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
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';
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
  filteredQuotes: Array<any> = [];
  screen: any;
  state: boolean = false;
  isfiltered: boolean;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private faio: FingerprintAIO,
    public provider: DatacoinProvider,
    public modalCtrl: ModalController,
    private screenshot: Screenshot,
    public menuControl: MenuController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }
  searchQuotes(event) {
    console.dir(this.cryptoTotal)
    if (event.target.value) {
      console.log(event.target.value)
      if (event.target.value.length > 2) {
        let filteredJson = this.cryptoTotal.filter(row => {
          if (row.secondary_currency.indexOf(event.target.value) != -1) {
            return true;
          } else {
            return false;
          }
        });
        this.isfiltered = true;
        this.filteredQuotes = filteredJson;
        console.log(this.filteredQuotes)
      } else {
        this.isfiltered = false;
      }
    } else {
      this.isfiltered = false;
    }
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
    let statusStorage;
    this.provider.getDataTutorial().then(data => {
      statusStorage = data;
      console.log('statusStorage ' + statusStorage)
      if (!statusStorage) {

        this.faio.show({
          clientId: 'Coinfolio-Demo',
          localizedFallbackTitle: 'Use Pin',
          localizedReason: 'Please authenticate'
        })
          .then((result: any) => {
            let modal = this.modalCtrl.create(HomePage);
            modal.present();
            // this.navCtrl.push(TutorialPage);
          })
          .catch((error: any) => {
            console.log('err: ', error);
          });

      } else {
        let modal = this.modalCtrl.create(HomePage);
      }
    })
    
      // this.navCtrl.setRoot(FolioPage);
      
    
    
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
