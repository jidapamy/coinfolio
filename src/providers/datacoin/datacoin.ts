// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import _ from 'lodash';
import { OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';



/*
  Generated class for the DatacoinProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/


@Injectable()
export class DatacoinProvider {
	myCoins: crytoMix[] = [];

	constructor(public http: Http,public storage: Storage) {
		console.log('Hello DatacoinProvider Provider');
		this.storage.ready().then(() => {
			this.storage.get('myCoins').then((data) => {
				if (data) {
					this.myCoins = data;
				}
			});
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

//   addTransaction(coin,){
// 	  this.myCoins.push()
//   }

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
} 

export class categories {
	0: any;
	1: any;
	2: any;
	3: any;
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