// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import _ from 'lodash';
import { OnInit } from '@angular/core';


/*
  Generated class for the DatacoinProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

let num;
for (let i = 1 ; i <= 27; i++) {
	num=[i];
}


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

  loadBX():Observable<cryptoNumbers[]>{
  	return this.http.get("/api")
  			   .map(response => {
  			   		return response.json()
  			   });
  }
  loadNews(): Observable<newsData[]> {

	  return this.http.get('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fcointelegraph.com%2Frss&api_key=ss1px1umuunducpxqlhspjeyh18k9hfweenrq8ds')
		  .map(response => {
			  return response.json();
		  });
  } 
  loadStatistics(): Observable<tempStatisticsCoins[]> {
	  return this.http.get('DataCoinPriceOfDay.json')
	.map(response => {
		return response.json();
	});
  } 

	
  loadOrderbook(pairing_id): Observable<tempbookorder[]> {
	  console.log(`loadBids: ${pairing_id}`);
	 console.log('/orderbook/?/orderbook/?pairing='+pairing_id);
	  let url = `/api${pairing_id}`
	  console.log(`url: ${url}`)
	  return this.http.get('api/'+'orderbook/?/orderbook/?pairing='+pairing_id)
		  .map(response => {
			  return response.json()
		  });
  }

loadBids(pairing_id): Observable<any[]> {
	 console.log(`loadBids: ${pairing_id}`);
	 console.log('/orderbook/?/orderbook/?pairing='+pairing_id);
	  let url = `/api${pairing_id}`
	  console.log(`url: ${url}`)
	  return this.http.get('api/'+'orderbook/?/orderbook/?pairing='+pairing_id)
	  	.map(response => response.json().bids);
}
loadAsks(pairing_id): Observable<any[]> {
	 console.log(`loadBids: ${pairing_id}`);
	 console.log('/orderbook/?/orderbook/?pairing='+pairing_id);
	  let url = `/api${pairing_id}`
	  console.log(`url: ${url}`)
	  return this.http.get('api/'+'orderbook/?/orderbook/?pairing='+pairing_id)
	  	.map(response => response.json().asks);
  }


} 






export class tempStatisticsCoins {
	coins: tempStatisticsCoinsDetail[]; // 


}
export class tempStatisticsCoinsDetail {
	pairing_id:any;
	secondary_currency: any;
	priceofday: detailOfDate[];

}
// export class boxCoinPerDay {
// 	dates: detailOfDate;
// } 

export class detailOfDate{
	date: any;
	price: any;
}






export class tempbookorderBidBox {
	box: tempbookorderBidItem[];
	

} export class tempbookorderAsksBox {
	box: tempbookorderBidItem[];

}

 export class tempbookorder {
	bids: tempbookorderBidItem[];
	asks: tempbookorderAsksItem[];
	

}

export class tempbookorderBidItem {
	Item: tempbookorderBid[];
	
}
export class tempbookorderAsksItem {
	Item: tempbookorderAsks[];

}


export class Bids {
	total: any
	volume: any
	highbid: any
}


export class tempbookorderBid {
	price: any[];
	amount: any[];	
}
export class tempbookorderAsks {
	price: any[];
	amount: any[];	
}


export class newsData {
	status: any;
	feed: feeds[];
	items: newsDataDetail[];

}
export class feeds {
	url: any;
	title: any;
	link: any;
	author: any;
	description: any;
	image: any;
}
export class newsDataDetail {
	title: any;
	pubDate: any;
	link: any;
	guid: any;
	author: any;
	thumbnail: any;
	description: any;
	content: any;
	enclosure: enclosure[];
	categories: categories[];
}
export class enclosure {
	link: any;
} export class categories {
	0: any;
	1: any;
	2: any;
	3: any;
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


export class bids{
	total:any
	volume:any
	highbid:any
}
export class asks{
	total:any
	volume:any
	highbid:any
}
export class orderbook{
	bids : bids[]
	asks : asks[]
}
export class cryto{
	pairing_id:any
	primary_currency:any
	secondary_currency:any
	change:number
	last_price:string
	volume_24hours:any
	// nameCrypto:any[]
	orderbooks:orderbook[]

}
export class cryptoNumbers{
	// number:string='1';
	crytos:cryto[]
}

export class crytoMix {
	pairing_id: any;
	primary_currency: any;
	secondary_currency: any;
	change: any;
	last_price: any;
	volume_24hours: any
	nameCrypto: any;
	orderbooks: any;

}

export const NAME:any[] = ["Bitcoin","Litecoin","Namecoin","Dogcoin",
					"Peercoin","Feathercoin","Primecoin","Zcash",
					"HyperStake","Pandacoin","Cryptonite","Paycoin",
					"Quark","Ethereum","Ethereum","Dash","Augur","Gnosis",
					"Ripple","OmiseGo","BitcoinCash","Everex","Zcoin"];