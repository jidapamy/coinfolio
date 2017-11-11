// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs' ;


/*
  Generated class for the DatacoinProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatacoinProvider {

  constructor(public http: Http) {
    console.log('Hello DatacoinProvider Provider');
  }

  loadCoin():Observable<objectCoinMarKetCap[]>{
    return this.http.get('https://api.coinmarketcap.com/v1/ticker/?convert=THB&limit=100')
           .map(response => {
               return response.json();
           });
  }

}

// export class detailCoin{
//   date:any;
//   price:any;	
//   open:any;	
//   high:any;	
//   low:any;	
//   change:any;
// }

export class objectCoinMarKetCap{
	id:any;
	name:any;
	symbol:any;
	rank:any;
	price_usd:number;
	price_btc:number;
	h24_volume_usd:any;
	market_cap_usd:any;
	available_supply:any;
	total_supply:any;
	percent_change_1h:any;
	percent_change_24h:any;
	percent_change_7d:any;
	last_updated:any;
	price_thb:number;
	h24_volume_thb:any;
	market_cap_thb:any;
}