import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DatacoinProvider, cryptoNumbers, cryto, asks, bids, NAME, crytoMix } from '../../providers/datacoin/datacoin';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'page-folio',
  templateUrl: 'folio.html'
})
export class FolioPage {
  myCoins: FirebaseListObservable<any[]>;

  cryptoNumbers: cryto[];
  cryptoMix: crytoMix[] = [];
  cryptoTotal: crytoMix[] = [];
  rateBtc: any = 0;
  myCoinsList: any[] = [];
  // array: any[] = [];
  cryptoRecent: any[] = [];

  myfolio: any;
  constructor(public navCtrl: NavController,
    public provider: DatacoinProvider,
    public angularfire: AngularFireDatabase,
  ) {
    console.log('constructor FolioPage');
    console.log(this.provider.getMycoinsPath());
    this.myCoins = angularfire.list(this.provider.getMycoinsPath());
    this.provider.loadBX().subscribe(data => {
      this.cryptoNumbers = Object.keys(data).map(key => data[key]);
      console.dir(this.cryptoNumbers)
    },
      error => { console.log("error: " + error); },
      () => {
        this.provider.addName(this.cryptoMix, this.cryptoNumbers);

        for (let i = 0; i < this.cryptoMix.length; i++) {
          if (this.cryptoMix[i].secondary_currency == 'BTC') { // เอา BTC มาแปลงเป็น THB ทั้งหมด
            this.rateBtc = this.cryptoMix[i].last_price;
            console.log('price ' + this.cryptoMix[i].secondary_currency + ' ' + this.rateBtc);
          }
        }
        this.loopOfConvert('THB');
        this.myCoins.subscribe(data => {
          this.myCoinsList = data;
          console.log(this.myCoinsList)
          for (let j = 0; j < this.myCoinsList.length; j++) {
            for (let i = 0; i < this.cryptoMix.length; i++) {
              if (this.cryptoMix[i].pairing_id == this.myCoinsList[j].pairing_id) {
                let length = this.cryptoRecent.length - 1;
                this.cryptoRecent.push({
                  pairing_id: this.cryptoMix[i].pairing_id,
                  primary_currency: this.cryptoMix[i].primary_currency,
                  secondary_currency: this.cryptoMix[i].secondary_currency,
                  change: this.cryptoMix[i].change,
                  last_price: this.cryptoMix[i].last_price,
                  volume_24hours: this.cryptoMix[i].volume_24hours,
                  nameCrypto: this.cryptoMix[i].nameCrypto,
                  totalQuantity: this.myCoinsList[j].totalQuantity,
                  totalPrice: this.myCoinsList[j].totalPrice
                })
                console.log('push:' + this.cryptoRecent[length + 1].pairing_id)

              }
            }
          }
        })



      })


    // this.myCoins.forEach(item => {
    //   this.array = Object.keys(item).map(key => item[key]);
    //   this.cryptoRecent = [];
    //   console.log('array length:' + this.array.length)
    //   for (let j = 0; j < this.array.length; j++) {
    //     for (let i = 0; i < this.cryptoMix.length; i++) {
    //       if (this.cryptoMix[i].pairing_id == this.array[j].pairing_id) {
    //         let length = this.cryptoRecent.length - 1;
    //         this.cryptoRecent.push({
    //           pairing_id: this.cryptoMix[i].pairing_id,
    //           primary_currency: this.cryptoMix[i].primary_currency,
    //           secondary_currency: this.cryptoMix[i].secondary_currency,
    //           change: this.cryptoMix[i].change,
    //           last_price: this.cryptoMix[i].last_price,
    //           volume_24hours: this.cryptoMix[i].volume_24hours,
    //           nameCrypto: this.cryptoMix[i].nameCrypto,
    //           totalQuantity: this.array[j].totalQuantity,
    //           totalPrice: this.array[j].totalPrice
    //         })
    //         console.log('push:' + this.cryptoRecent[length + 1].pairing_id)

    //       }
    //     }
    //   }
    //   console.log('this.cryptoRecent:' + this.cryptoRecent.length)

    // });
    // console.dir('this.cryptoRecent:' + this.cryptoRecent)
    // })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FolioPage');
  }

  loopOfConvert(type) {
    for (let i = 0; i < this.cryptoMix.length; i++) {
      this.pushCrytoTotal(type, i);
    }
    // console.log(`${type} length : ${this.cryptoTotal.length}`)
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
    // console.log(`[${index}] push: ${this.cryptoTotal[lastIndex + 1].secondary_currency}/${this.cryptoTotal[lastIndex + 1].primary_currency} price: ${this.cryptoTotal[lastIndex + 1].last_price}`);
  }

  convertMoney(coin, type) {
    let price = 0;
    let priceDecimal;
    if (coin.primary_currency == 'THB') { // แปลงจากเงินบาท
      if (type == 'THB') {
        price = coin.last_price;
      }
    } else if (coin.primary_currency == 'BTC') { // แปลงจากเงิน BTC
      if (type == 'THB') {
        price = (coin.last_price * this.rateBtc);
      }
    }

    if (price < 1) {
      priceDecimal = price.toFixed(8);
    } else {
      priceDecimal = price.toFixed(2);
    }
    return priceDecimal;
  }


}
