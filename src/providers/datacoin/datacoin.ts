import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Platform } from 'ionic-angular';


/*
  Generated class for the DatacoinProvider provider.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/


@Injectable()
export class DatacoinProvider {
	pathFirebase = '/users';
	userData: FirebaseListObservable<any[]> = this.angularfire.list(this.pathFirebase);
	myCoinsData: FirebaseListObservable<any[]>;
	transactionData: FirebaseListObservable<any[]>;
	chatsData: FirebaseListObservable<any[]> = this.angularfire.list('/chats');

	userLogin:any;
	userKey:any;
	coinsKey: any;
	mycoinsPath:any;
	transactionPath:any;
	getNameCoinsBX:any[];
	username: any='';
	// private headers = new Headers({ 'Content-Type': 'application/json' });
	private apiUrl = "/api";
	rateBtc: any = 0;
	rateEth: any = 0;
	rateUsd : any =34;
	cryptoWithName:any[]=[]
	cryptoCurrency:any[]=[];

	constructor(public http: Http,
		public platform: Platform,
		public storage: Storage,
		public angularfire: AngularFireDatabase) {
		console.log('Hello DatacoinProvider Provider');
		this.mixNameCoins() 
		console.log('this.cryptoCurrency นะจ๊ะ')
		console.dir(this.cryptoCurrency)
		if (this.platform.is('cordova')) {                // <<< is Cordova available?
			this.apiUrl = 'https://bx.in.th/api';
		}	

		this.storage.ready().then(() => {
			this.storage.get('userLogin').then((data) => {
				console.log('userLogin Provider')
				console.dir(data);
				if (data) {
					this.userLogin = data.user;
					this.userKey = data.key;
					// console.log('userLogin นะจ๊ะ อิอิ ==' + this.userKey )
				}
			});
		});



		this.storage.ready().then(() => {
			this.storage.get('tutorial').then((data) => {
				console.log('tutoraial')
				console.dir(data);
			});
		});


		this.storage.ready().then(() => {
			this.storage.get('Fingerprint').then((data) => {
				console.log('Fingerprint')
				console.dir(data);
			});
		});
		// this.storage.set('tutorial', false);
		// this.setDataTutorial(false);
	}

	getFingerprint(): Promise<any> {
		return this.storage.get('Fingerprint')
	}
	setFingerprint(data) {
		this.storage.set('Fingerprint', data)
		console.log(data)
	}
	
	getDataTutorial(){
		return this.storage.get('tutorial')
	}
	setDataTutorial(boolean){
		this.storage.set('tutorial', boolean)
	}
	

	

	

	// getTransactionPath(myCoinsKey) { // เพิ่ม Transition ใน coin ที่มีอยู่แล้ว
	// 	this.transactionPath = this.getMycoinsPath() + '/' + myCoinsKey + '/transaction';
	// 	return this.transactionPath;
	// }

// //////////////////////////////////////////////
	
	// Transition & Coins
	getMycoinsPath(){ //myCoin ของ User ตามที่ login
		this.mycoinsPath = this.pathFirebase + '/' + this.userKey + '/myCoins';
		return this.mycoinsPath;
	}
	getMycoins() { //myCoin ของ User ตามที่ login
		let myCoins;
		this.myCoinsData = this.angularfire.list(this.getMycoinsPath())
		this.myCoinsData.subscribe(data => {
			myCoins = data;
		})
		return myCoins;
	}
	addMycoins(coin){
		this.myCoinsData = this.angularfire.list(this.getMycoinsPath())
		this.myCoinsData.push(coin)
	}

	updateAmountHolding(coin, totalQuantity, totalPrice) {
		console.log('Update')
		this.myCoinsData = this.angularfire.list(this.mycoinsPath);
		this.myCoinsData.update(coin.$key, { totalQuantity: totalQuantity, totalPrice: totalPrice })
	}

	addTransactionAlreadyCoin(transaction){
		console.log()
		this.transactionData = this.angularfire.list(this.getTransactionPath());
		this.transactionData.push(transaction);
	}

	getTransactionPath() {
		return this.getMycoinsPath() + '/' + this.coinsKey + '/transaction'
	}

	getTransactionOfCoin(){
		let transaction;
		this.transactionData = this.angularfire.list(this.getTransactionPath())
		this.transactionData.subscribe(data => {
			transaction = data;
		})
		return transaction;
	}
	removedMyCoins(coin) {
		this.myCoinsData.remove(coin);
	}
	updateTransaction(key,newTransaction){
		console.log('Key :'+key)
		console.dir(newTransaction)
		this.transactionData.update(key, { date: newTransaction.date, note: newTransaction.note,
										   quantity: newTransaction.quantity, status: newTransaction.status,
										   total: newTransaction.total, tradePrice: newTransaction.tradePrice});
	}


	// Chat
	getChatData(){
		let chats=[];
		this.chatsData.subscribe(data => {
			chats = data;
		})
		return chats;
	}
	removedChat(chat){
		this.chatsData.remove(chat.$key);
	}
	addChats(message){
		this.chatsData.push(message);
	}

	// User
	setUsername(username){
		console.log('save:' + username)
		this.username = username
		this.storage.set('userLogin', this.username); 
	}

	getUsername():Promise<any>{
		return this.storage.get('userLogin')
	}

	registerUser(data){
		this.userData.push(data)
	}

	getAllUSer(){
		let userList:any[];
		this.userData.subscribe(data =>{
			userList = data
			// return userList;
		})
		return userList;
	}

	setUserLogin(user){
		// this.userLogin = user; 
		// console.log('Login: '+user.username)
		console.dir(user)
		this.storage.set('userLogin', user); 
		this.username = user.user.username
		this.userKey = user.key
		console.log('Set Username :'+this.username+'KEY: ' + this.userKey)
		

	}
	getUserLogin(): Promise<any>{
		return this.storage.get('userLogin')
	}

	loadBX(): Observable<crypto[]> {
		return this.http.get("bx.in.th.json")
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

	// addTransaction(dataTransaction) {
	// 	console.log('addTransaction')
	// 	//   console.dir('dataTransaction:>> ' + dataTransaction.coin.pairing_id)
	// 	// this.myCoins.push(dataTransaction);
	// 	//   this.storage.set('myCoins', this.myCoins);
	// }
	
	removedMycoin(){
		this.myCoinsData = this.angularfire.list(this.pathFirebase);
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
		console.log(`url: ${url}-`)
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
			//   console.log('Sussess ' + i + '----- name :' + newCrypto[i].nameCrypto);
		}
	}

	// BX Coins
	mixNameCoins()  {
		let cryptoNumbers; 
		this.loadBX().subscribe(data => {
			cryptoNumbers = Object.keys(data).map(key => data[key]);
		},
			error => { console.log("error: " + error); },
			() => {
				for (let i = 0; i < cryptoNumbers.length; i++) {
					this.cryptoWithName[i] = {
						pairing_id: cryptoNumbers[i].pairing_id,
						primary_currency: cryptoNumbers[i].primary_currency,
						secondary_currency: cryptoNumbers[i].secondary_currency,
						change: cryptoNumbers[i].change,
						last_price: cryptoNumbers[i].last_price,
						volume_24hours: cryptoNumbers[i].volume_24hours,
						nameCrypto: NAME[i],
						orderbook: cryptoNumbers[i].orderbook
					}
				}
				
				for (let i = 0; i < this.cryptoWithName.length; i++) {
					if (this.cryptoWithName[i].secondary_currency == 'BTC') {
						this.rateBtc = this.cryptoWithName[i].last_price;
					}
					if (this.cryptoWithName[i].secondary_currency == 'ETH' && this.cryptoWithName[i].primary_currency == 'THB') {
						this.rateEth = this.cryptoWithName[i].last_price;
					}
				}
				this.loopOfConvert('THB');
				this.loopOfConvert('BTC');
				this.loopOfConvert('ETH');
				this.loopOfConvert('USD'); 
			})
	}

	loopOfConvert(type) {
		for (let i = 0; i < this.cryptoWithName.length; i++) {
			this.pushCrytoTotal(type, i);
		}
	}

	pushCrytoTotal(type: any, index: number) {
		this.cryptoCurrency.push({
			pairing_id: this.cryptoWithName[index].pairing_id,
			primary_currency: type,
			secondary_currency: this.cryptoWithName[index].secondary_currency,
			change: this.cryptoWithName[index].change,
			last_price: this.convertMoney(this.cryptoWithName[index], type),
			volume_24hours: this.cryptoWithName[index].volume_24hours,
			nameCrypto: this.cryptoWithName[index].nameCrypto,
			orderbook: this.cryptoWithName[index].orderbook
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

	getBxCoin(){
		// this.mixNameCoins();

		console.log('getBxCoin : '+this.cryptoCurrency.length)
		return this.cryptoCurrency;
	}
	getName(){
		this.loadBX().subscribe(data => {
			this.getNameCoinsBX = Object.keys(data).map(key => data[key]);
			console.dir(this.getNameCoinsBX)
		},
			error => { console.log("error: " + error); },
			() => {
				
				
			})	
		return this.getNameCoinsBX		
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

export class crypto {
	pairing_id: any
	primary_currency: any
	secondary_currency: any
	change: number
	last_price: string
	volume_24hours: any
	orderbook: orderbook;
}

// export class bids {
// 	total: any
// 	volume: any
// 	highbid: any
// }
// export class asks {
// 	total: any
// 	volume: any
// 	highbid: any
// }

export class orderbook {
	bids: { total: any, volume: any, highbid: any}
	asks: { total: any, volume: any, highbid: any}
}
// export class cryptoNumbers {
// 	crytos: crypto[]
// }

export class cryptoCurrency{
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