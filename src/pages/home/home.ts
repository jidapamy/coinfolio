import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DatacoinProvider , objectCoinMarKetCap} from '../../providers/datacoin/datacoin';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
coins:objectCoinMarKetCap[];
priceDecimal:any[];
  constructor(public navCtrl: NavController,public provider:DatacoinProvider) {
    this.provider.loadCoin().subscribe(data => { this.coins = data },
      error => {console.log("error: "+error);},
        () => {console.log("Read qoute completely");})
    
        // for(let i=0;i<this.coins.length;i++){
        //   this.priceDecimal.push({symbol:this.coins[i].symbol,price:this.coins[i].price_thb});
        // }
  }


}
