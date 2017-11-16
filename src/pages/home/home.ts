import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatacoinProvider, cryptoNumbers, cryto, orderbook, asks, bids, NAME, crytoMix} from '../../providers/datacoin/datacoin';

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
  cryptoNumbers: cryto[];
  ETH: crytoMix[]=[];
  USD: crytoMix[] = [];
  THB: crytoMix[] = [];
  BTC: crytoMix[] = [];
  crytoName: any[] = NAME;
  cryptoMix: crytoMix[] = [];
  cryptoTotal: crytoMix[] = [];
  segment='THB';

  constructor(public navCtrl: NavController, public navParams: NavParams,public provider:DatacoinProvider) {
    this.provider.loadBX().subscribe(data => {
      this.cryptoNumbers = Object.keys(data).map(key => data[key]);
        console.dir(this.cryptoNumbers)
      },
        error => { console.log("error: " + error); },
        () => {
          this.addName();
          this.calculateOthertoTHB();
          this.calculateOthertoBTC();
          this.calculateOthertoETH();
          this.calculateOthertoUSD();
          this.selectThb();
          this.selectBtc();
          this.selectEth();
          this.selectUsd();
          console.log('THB ' + this.THB.length);
          console.log('ETH ' + this.ETH.length);
          console.log('BTC ' + this.BTC.length);
          console.log('USD ' + this.USD.length);

          console.log("Read park completely");
        })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
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

  // presentLoading() {
  //   let loader = this.loadingCtrl.create({
  //     content: "Please wait...",
  //     duration: 1000
  //   });
  //   loader.present();
  // }

  calculateOthertoTHB(){
   let rateBtc =0;
   for(let i=0;i<this.cryptoMix.length;i++){
    if(this.cryptoMix[i].secondary_currency=='BTC'){
        rateBtc = this.cryptoMix[i].last_price;
        console.log('price '+this.cryptoMix[i].secondary_currency+' '+rateBtc);
      }
    }

    for(let i=0;i<this.cryptoMix.length;i++){
      if(this.cryptoMix[i].primary_currency!=='THB'){ //เอาที่ไม่ใช่ BTC
        let price = this.cryptoMix[i].last_price*rateBtc;
        this.cryptoTotal.push({ pairing_id:this.cryptoNumbers[i].pairing_id,
                              primary_currency:'THB',
                              secondary_currency:this.cryptoNumbers[i].secondary_currency,
                              change:this.cryptoNumbers[i].change,
                              last_price:price.toFixed(2),
                              volume_24hours:this.cryptoNumbers[i].volume_24hours,
                              nameCrypto:this.crytoName[i],
                              orderbooks:this.cryptoNumbers[i].orderbooks
                             })
        // console.log('push complete :'+this.cryptoMix[i].secondary_currency)
      }else{
        this.cryptoTotal.push(this.cryptoMix[i]);
      }
    }
    console.log('length total:'+this.cryptoTotal.length)
  }

  calculateOthertoBTC(){
    let rateBtc =0;
     for(let i=0;i<this.cryptoMix.length;i++){
      if(this.cryptoMix[i].secondary_currency=='BTC'){
          rateBtc = this.cryptoMix[i].last_price;
          console.log('price '+this.cryptoMix[i].secondary_currency+' '+rateBtc);
        }
      }
    for(let i=0;i<this.cryptoMix.length;i++){
      if(this.cryptoMix[i].primary_currency!='BTC'){ //เอาที่ไม่ใช่ THB
        let price = this.cryptoMix[i].last_price/rateBtc;
        this.cryptoTotal.push({ pairing_id:this.cryptoNumbers[i].pairing_id,
                              primary_currency:'BTC',
                              secondary_currency:this.cryptoNumbers[i].secondary_currency,
                              change:this.cryptoNumbers[i].change,
                              last_price: price.toFixed(8),
                              volume_24hours:this.cryptoNumbers[i].volume_24hours,
                              nameCrypto:this.crytoName[i],
                              orderbooks:this.cryptoNumbers[i].orderbooks
                             })
                             console.log('>>>'+i);
        // console.log('countBTC = ' + i + this.cryptoMix[i].secondary_currency)
        // console.log('push complete :'+this.cryptoMix[i].secondary_currency)
      }else{
        this.cryptoTotal.push({ pairing_id: this.cryptoMix[i].pairing_id,
                                primary_currency: this.cryptoMix[i].primary_currency,
                                secondary_currency: this.cryptoMix[i].secondary_currency,
                                change: this.cryptoMix[i].change,
                                last_price: this.cryptoMix[i].last_price.toFixed(8),
                                volume_24hours: this.cryptoMix[i].volume_24hours,
                                nameCrypto: this.cryptoMix[i],
                                orderbooks: this.cryptoMix[i].orderbooks});
      }
    }
    console.log('length total:'+this.cryptoTotal.length)
  }

  calculateOthertoETH(){
    let rateEth =0;
      for(let i=0;i<this.cryptoMix.length;i++){
      if(this.cryptoMix[i].secondary_currency=='ETH' && this.cryptoMix[i].primary_currency=='THB'  ){
          rateEth = this.cryptoMix[i].last_price;
          console.log('price '+this.cryptoMix[i].secondary_currency+' '+rateEth);
        }
      }
    for(let i=0;i<this.cryptoMix.length;i++){
      if(this.cryptoMix[i].primary_currency!=='ETH'){ //เอาที่ไม่ใช่ ETH
        let price = this.cryptoMix[i].last_price/rateEth;
        this.cryptoTotal.push({ pairing_id:this.cryptoNumbers[i].pairing_id,
                              primary_currency:'ETH',
                              secondary_currency:this.cryptoNumbers[i].secondary_currency,
                              change:this.cryptoNumbers[i].change,
                              last_price: price.toFixed(2),
                              volume_24hours:this.cryptoNumbers[i].volume_24hours,
                              nameCrypto:this.crytoName[i],
                              orderbooks:this.cryptoNumbers[i].orderbooks
                             })
        // console.log('push complete :'+this.cryptoMix[i].secondary_currency)
      }else{
        this.cryptoTotal.push(this.cryptoMix[i]);
      }
    }
    console.log('length total:'+this.cryptoTotal.length)
  }

  calculateOthertoUSD(){
    for(let i=0;i<this.cryptoMix.length;i++){
      if(this.cryptoMix[i].primary_currency!=='USD'){ //เอาที่ไม่ใช่ USD
        let price = this.cryptoMix[i].last_price/33.4;
        this.cryptoTotal.push({ pairing_id:this.cryptoNumbers[i].pairing_id,
                              primary_currency:'USD',
                              secondary_currency:this.cryptoNumbers[i].secondary_currency,
                              change:this.cryptoNumbers[i].change,
                              last_price: price.toFixed(2),
                              volume_24hours:this.cryptoNumbers[i].volume_24hours,
                              nameCrypto:this.crytoName[i],
                              orderbooks:this.cryptoNumbers[i].orderbooks
                             })
        // console.log('push complete :'+this.cryptoMix[i].secondary_currency)
      }else{
        this.cryptoTotal.push(this.cryptoMix[i]);
      }
    }
    console.log('length total:'+this.cryptoTotal.length)
  }

  selectThb(){
       if (this.cryptoTotal.length>-1){
         let filteredTHB = this.cryptoTotal.filter( row => { 
            if (row.primary_currency=='THB') {
                 return true;
             }else {
                 return false ;
               }
         });
        //  this.isSelect=false;
        //  console.log('FilterTHB : '+filteredTHB) ;
        this.THB = filteredTHB ;
       }else {
        console.log('No data') ;
       }
    
  }


  selectBtc(){
       if (this.cryptoTotal.length>-1){
         let filteredBTC = this.cryptoTotal.filter( row => { 
             if (row.primary_currency=='BTC') {
                 return true;
             }else {
                 return false ;
               }
         });
        //  this.isSelect=true;
        //  console.log('FilterBTC : '+filteredBTC.toString()) ;
         this.BTC = filteredBTC ;
       } else {
         console.log('No data') ;
       }
  }

  selectEth(){
       if (this.cryptoTotal.length>-1){
         let filteredTHB = this.cryptoTotal.filter( row => { 
            if (row.primary_currency=='ETH') {
                 return true;
             }else {
                 return false ;
               }
         });
        //  this.isSelect=false;
        //  console.log('FilterETH : '+filteredTHB) ;
        this.ETH = filteredTHB.sort() ;
       }else {
        console.log('No data') ;
       }
  }

  selectUsd(){
       if (this.cryptoTotal.length>-1){
         let filteredTHB = this.cryptoTotal.filter( row => { 
            if (row.primary_currency=='USD') {
                 return true;
             }else {
                 return false ;
               }
         });
        //  this.isSelect=false;
        //  console.log('FilterUSD : '+filteredTHB) ;
        this.USD = filteredTHB.sort() ;
       }else {
        console.log('No data') ;
       }
  
 }

  test(){
    // for (let i = 0; i < this.cryptoMix.length; i++) {
    //   if (this.cryptoMix[i].primary_currency == this.segment) {
    //     console.log(i + ' = ' + this.cryptoMix[i].secondary_currency);
    //   }
    // }
    // console.log('THB '+this.THB.length);
    // console.log('ETH '+ this.ETH.length);
    // console.log('BTC '+ this.BTC.length);
    // console.log('USD '+ this.USD.length);
    
    // console.log('segment='+this.segment);
    // for (let i = 0; i < this.cryptoTotal.length;i++){
    //   if (this.cryptoTotal[i].primary_currency==this.segment){
    //    console.log(i + ' = ' + this.cryptoTotal[i].secondary_currency);

    //     }
    //       }
  }

}
