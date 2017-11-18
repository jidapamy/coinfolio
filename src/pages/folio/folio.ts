import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
// import { DatacoinProvider , objectCoinMarKetCap} from '../../providers/datacoin/datacoin';
import { DatacoinProvider ,cryptoNumbers ,cryto ,orderbook ,asks , bids , NAME} from '../../providers/datacoin/datacoin';
@Component({
  selector: 'page-folio',
  templateUrl: 'folio.html'
}) 
export class FolioPage {
// coins:objectCoinMarKetCap[];
cryptoNumbers:cryto[];
THB:cryto[];
BTC:cryto[];
isSelect:boolean;
crytoName:any[]=NAME;
cryptoMix:any[]=[{pairing_id:'',
                  primary_currency:'',
                  secondary_currency:'',
                  change:'',
                  last_price:'',
                  volume_24hours:'',
                  nameCrypto:'',
                  orderbooks:''}];
priceDecimal:any[];
  constructor(public navCtrl: NavController,public provider:DatacoinProvider) {
    this.provider.loadBX().subscribe(data => {
      this.cryptoNumbers = Object.keys(data).map(key => data[key]);
                            console.dir(this.cryptoNumbers)
                          },
                          error => { console.log("error: " + error); },
                          () => {
                            this.addName();
                          })
  }

  addName(){
    for(let i=0;i<this.cryptoNumbers.length;i++){
      this.cryptoMix[i]={ pairing_id:this.cryptoNumbers[i].pairing_id,
                          primary_currency:this.cryptoNumbers[i].primary_currency,
                          secondary_currency:this.cryptoNumbers[i].secondary_currency,
                          change:this.cryptoNumbers[i].change,
                          last_price:this.cryptoNumbers[i].last_price,
                          volume_24hours:this.cryptoNumbers[i].volume_24hours,
                          nameCrypto:this.crytoName[i],
                          orderbooks:this.cryptoNumbers[i].orderbooks}
      console.log('Sussess '+i+'----- name :'+this.cryptoMix[i].nameCrypto);
    }
  }

  // selectThb() {
  //      if (this.cryptoTotal.length>-1){
  //        let filteredTHB = this.cryptoTotal.filter( row => { 
  //           if (row.primary_currency=='THB') {
  //                return true;
  //            }else {
  //                return false ;
  //              }
  //        });
  //       //  this.isSelect=false;
  //       //  console.log('FilterTHB : '+filteredTHB) ;
  //       this.THB = filteredTHB ;
  //      }else {
  //       console.log('No data') ;
  //      }

  // }

}
