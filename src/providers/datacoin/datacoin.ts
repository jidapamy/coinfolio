// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import _ from 'lodash';
import { OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';



/*
  Generated class for the DatacoinProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/


@Injectable()
export class DatacoinProvider {
	// myCoins: any[] = [];
	myCoins: FirebaseListObservable<any[]>;
	username: any='';
	constructor(public http: Http,
		public storage: Storage,
		public angularfire: AngularFireDatabase) {
		console.log('Hello DatacoinProvider Provider');
		// this.myCoins = angularfire.list('/myCoins');
		console.log('moduleeeeนอก then' + this.username)
		// console.log('setUsername:' + this.username)
		
		this.storage.ready().then(() => {
			this.storage.get('userLogin')
			.then((data) => {
				 if (data) {
				    this.username = data;
					console.log('moduleeee'+this.username)

				}
			});
		});


		// this.storage.ready().then(() => {
		// 	this.storage.get('myCoins').then((data) => {
		// 		if (data) {
		// 			this.myCoins = data;
		// 			console.log('myCoins')
		// 		}
		// 	});
		// });
	}

	setUsername(username){
		this.username = username;
		console.log('save:'+this.username)
		this.storage.set('userLogin', this.username); 

	}

	getUsername():Promise<any> {
		return this.username;
	}

	loadBX(): Observable<cryptoNumbers[]> {
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

	addTransaction(dataTransaction) {
		console.log('addTransaction')
		//   console.dir('dataTransaction:>> ' + dataTransaction.coin.pairing_id)

		this.myCoins.push(dataTransaction);
		//   this.storage.set('myCoins', this.myCoins);
	}

	getTransaction() {
		//   return this.myCoins;
	}
	
	loadStatistics(): Observable<tempStatisticsCoins[]> {
		return this.http.get('DataCoinPriceOfDay.json')
			.map(response => {
				return response.json();
			});
	}


	loadOrderbook(pairing_id): Observable<tempbookorder[]> {
		console.log(`loadBids: ${pairing_id}`);
		console.log('/orderbook/?/orderbook/?pairing=' + pairing_id);
		let url = `/api${pairing_id}`
		console.log(`url: ${url}`)
		return this.http.get('api/' + 'orderbook/?/orderbook/?pairing=' + pairing_id)
			.map(response => {
				return response.json()
			});
	}

	loadBids(pairing_id): Observable<any[]> {
		console.log(`loadBids: ${pairing_id}`);
		console.log('/orderbook/?/orderbook/?pairing=' + pairing_id);
		let url = `/api${pairing_id}`
		console.log(`url: ${url}`)
		return this.http.get('api/' + 'orderbook/?/orderbook/?pairing=' + pairing_id)
			.map(response => response.json().bids);
	}
	loadAsks(pairing_id): Observable<any[]> {
		console.log(`loadBids: ${pairing_id}`);
		console.log('/orderbook/?/orderbook/?pairing=' + pairing_id);
		let url = `/api${pairing_id}`
		console.log(`url: ${url}`)
		return this.http.get('api/' + 'orderbook/?/orderbook/?pairing=' + pairing_id)
			.map(response => response.json().asks);
	}

	addName(newCrypto, crypto) {
		for (let i = 0; i < crypto.length; i++) {
			newCrypto[i] = {
				pairing_id: crypto[i].pairing_id,
				primary_currency: crypto[i].primary_currency,
				secondary_currency: crypto[i].secondary_currency,
				change: crypto[i].change,
				last_price: crypto[i].last_price,
				volume_24hours: crypto[i].volume_24hours,
				nameCrypto: NAME[i],
				orderbook: crypto[i].orderbook
			}
			  console.log('Sussess ' + i + '----- name :' + newCrypto[i].nameCrypto);
		}
		console.log('newCrypto[2]'+newCrypto[2].orderbook.bids.volume);
	}






} 






export class tempStatisticsCoins {
	coins: tempStatisticsCoinsDetail[]; // 


}
export class tempStatisticsCoinsDetail {
	pairing_id: any;
	secondary_currency: any;
	priceofday: detailOfDate[];

}
// export class boxCoinPerDay {
// 	dates: detailOfDate;
// } 

export class detailOfDate {
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
}

export class categories {
	0: any;
	1: any;
	2: any;
	3: any;
}

export class cryto {
	pairing_id: any
	primary_currency: any
	secondary_currency: any
	change: number
	last_price: string
	volume_24hours: any
	// nameCrypto:any[]
	orderbook: {
					bids: { total: any, volume: any, highbid: any },
					asks: { total: any, volume: any, highbid: any }
				}

}

export class bids {
	total: any
	volume: any
	highbid: any
}
export class asks {
	total: any
	volume: any
	highbid: any
}
// export class orderbook {
// 	bids: bids
// 	asks: asks
// }

export class orderbook {
	bids: { total: any, volume: any, highbid: any}
	asks: { total: any, volume: any, highbid: any}
}
export class cryptoNumbers {
	// number:string='1';
	crytos: cryto[]
}

export class crytoMix {
	pairing_id: any;
	primary_currency: any;
	secondary_currency: any;
	change: any;
	last_price: any;
	volume_24hours: any
	nameCrypto: any;
	orderbook: orderbook;

}

export const NAME: any[] = ["Bitcoin", "Litecoin", "Namecoin", "Dogcoin",
	"Peercoin", "Feathercoin", "Primecoin", "Zcash",
	"HyperStake", "Pandacoin", "Cryptonite", "Paycoin",
	"Quark", "Ethereum", "Ethereum", "Dash", "Augur", "Gnosis",
	"Ripple", "OmiseGo", "BitcoinCash", "Everex", "Zcoin"];