import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatacoinProvider, cryptoNumbers, cryto, orderbook, asks, bids, NAME, crytoMix} from '../../providers/datacoin/datacoin';
import { Content } from 'ionic-angular';
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
  cryptoNumbers: cryto[];
  ETH: crytoMix[]=[];
  USD: crytoMix[] = [];
  THB: crytoMix[] = [];
  BTC: crytoMix[] = [];
  crytoName: any[] = NAME;
  cryptoMix: crytoMix[] = [];
  cryptoTotal: crytoMix[] = [];
  segment='THB';
  rateBtc:any=0; // 1 BTC = 247900 THB
  rateEth:any=0; // 1 ETC = 10600 THB
  rateUsd:any=0; // 1 USD = 34 THB
  coins: crytoMix[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,public provider:DatacoinProvider) {
    this.provider.loadBX().subscribe(data => {
      this.cryptoNumbers = Object.keys(data).map(key => data[key]);
        console.dir(this.cryptoNumbers)
      },
        error => { console.log("error: " + error); },
        () => {
          this.addName();
          // this.calculateOthertoTHB();
          // this.calculateOthertoBTC();
          // this.calculateOthertoETH();
          // this.calculateOthertoUSD();
          // this.selectThb();
          // this.selectBtc();
          // this.selectEth();
          // this.selectUsd();
          // console.log('THB ' + this.THB.length);
          // console.log('ETH ' + this.ETH.length);
          // console.log('BTC ' + this.BTC.length);
          // console.log('USD ' + this.USD.length);
          // for(let i=0;i<this.BTC.length;i++){
          //   console.log(`BTC:[${i}] = ${this.BTC[i].nameCrypto}`);
          // }
          this.rateUsd = 34;

          for (let i = 0; i < this.cryptoMix.length; i++) {
            if (this.cryptoMix[i].secondary_currency == 'BTC') {
              this.rateBtc = this.cryptoMix[i].last_price;
              console.log('price ' + this.cryptoMix[i].secondary_currency + ' ' + this.rateBtc);
            }
            if (this.cryptoMix[i].secondary_currency == 'ETH' && this.cryptoMix[i].primary_currency == 'THB') {
              this.rateEth = this.cryptoMix[i].last_price;
              console.log('ETH:price ' + this.cryptoMix[i].secondary_currency + ' ' + this.rateEth);
            }
          }
          console.log("Read park completely");
          
          this.loopOfConvert('THB');
          this.loopOfConvert('BTC');
          this.loopOfConvert('ETH');
          this.loopOfConvert('USD');
          this.changeMarket(this.segment)
          // this.selectCoin('THB');
          // this.selectCoin('BTC');
          // this.selectCoin('ETH');
          // this.selectCoin('USD');
          
        
        
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
  
  convertMoney(coin,type){
    let price=0;
    let priceDecimal;
      if (coin.primary_currency == 'THB'){ // แปลงจากเงินบาท
        if (type == 'THB'){
          price = coin.last_price;
        }else if (type == 'BTC') {
          price = (coin.last_price/this.rateBtc);
          // console.log(`BTC>>> ${price}`)
        } else if (type == 'ETH') {
          price = (coin.last_price / this.rateEth);
        } else if (type == 'USD') {
          price = (coin.last_price / this.rateUsd);
        }
      }else if (coin.primary_currency =='BTC'){ // แปลงจากเงิน BTC
        if (type == 'THB') {
          price = (coin.last_price * this.rateBtc);
        } else if (type == 'BTC') {
          price = coin.last_price;
          // console.log(`${coin.secondary_currency}/BTC>>> ${price}`)
        } else if (type == 'ETH') {
          price = ((coin.last_price * this.rateBtc) / this.rateEth);
        } else if (type == 'USD') {
          price = ((coin.last_price * this.rateBtc) / this.rateUsd);
        }
      }

      if(price < 1){
        priceDecimal = price.toFixed(8);
      }else{
        priceDecimal = price.toFixed(2);
      }
      return priceDecimal;
  }

  pushCrytoTotal(type: any,index:number){
    // console.log('convertMoney :'+this.convertMoney(this.cryptoNumbers[index],type));
    let lastIndex = this.cryptoTotal.length-1;
    this.cryptoTotal.push({   pairing_id:this.cryptoNumbers[index].pairing_id,
                              primary_currency:type,
                              secondary_currency:this.cryptoNumbers[index].secondary_currency,
                              change:this.cryptoNumbers[index].change,
                              last_price: this.convertMoney(this.cryptoNumbers[index],type),
                              volume_24hours:this.cryptoNumbers[index].volume_24hours,
                              nameCrypto:this.crytoName[index],
                              orderbooks:this.cryptoNumbers[index].orderbooks
                             })
    console.log(`[${index}] push: ${this.cryptoTotal[lastIndex + 1].secondary_currency}/${this.cryptoTotal[lastIndex + 1].primary_currency} price: ${this.cryptoTotal[lastIndex + 1].last_price}`);
  }

  loopOfConvert(type){
    for (let i = 0; i < this.cryptoMix.length; i++) {
      this.pushCrytoTotal(type,i);
    }
    console.log(`${type} length : ${this.cryptoTotal.length}`)
  }





    // for(let i= 0;i<this.cryptoMix.length;i++){
    //   if(this.cryptoMix[i].primary_currency!='BTC'){ //เอาที่ไม่ใช่ THB
    //     this.convertFromTHB(this.cryptoMix[i].last_price,'BTC')
    //     let price = this.cryptoMix[i].last_price/this.rateBtc;
    //     this.cryptoTotal.push({ pairing_id:this.cryptoNumbers[i].pairing_id,
    //                           primary_currency:'BTC',
    //                           secondary_currency:this.cryptoNumbers[i].secondary_currency,
    //                           change:this.cryptoNumbers[i].change,
    //                           last_price: price.toFixed(8),
    //                           volume_24hours:this.cryptoNumbers[i].volume_24hours,
    //                           nameCrypto:this.crytoName[i],
    //                           orderbooks:this.cryptoNumbers[i].orderbooks
    //                          })
    //                          console.log('>>>'+i);
        // console.log('countBTC = ' + i + this.cryptoMix[i].secondary_currency)
        // console.log('push complete :'+this.cryptoMix[i].secondary_currency)
  //     }else{
  //       this.cryptoTotal.push({ pairing_id: this.cryptoMix[i].pairing_id,
  //                               primary_currency: this.cryptoMix[i].primary_currency,
  //                               secondary_currency: this.cryptoMix[i].secondary_currency,
  //                               change: this.cryptoMix[i].change,
  //                               last_price: this.cryptoMix[i].last_price.toFixed(8),
  //                               volume_24hours: this.cryptoMix[i].volume_24hours,
  //                               nameCrypto: this.cryptoMix[i].nameCrypto,
  //                               orderbooks: this.cryptoMix[i].orderbooks});
  //     }
  //   }
  //   console.log('length total:'+this.cryptoTotal.length)
  // }


  // }



  


  

  // calculateOthertoTHB(){
  // //  let rateBtc =0;
  //  for(let i=0;i<this.cryptoMix.length;i++){
  //   if(this.cryptoMix[i].secondary_currency=='BTC'){
  //       this.rateBtc = this.cryptoMix[i].last_price;
  //       console.log('price '+this.cryptoMix[i].secondary_currency+' '+this.rateBtc);
  //     }
  //   }

  //   for(let i=0;i<this.cryptoMix.length;i++){
  //     if(this.cryptoMix[i].primary_currency!=='THB'){ //เอาที่ไม่ใช่ BTC
  //       let price = this.cryptoMix[i].last_price*this.rateBtc;
  //       this.cryptoTotal.push({ pairing_id:this.cryptoNumbers[i].pairing_id,
  //                             primary_currency:'THB',
  //                             secondary_currency:this.cryptoNumbers[i].secondary_currency,
  //                             change:this.cryptoNumbers[i].change,
  //                             last_price:price.toFixed(4),
  //                             volume_24hours:this.cryptoNumbers[i].volume_24hours,
  //                             nameCrypto:this.crytoName[i],
  //                             orderbooks:this.cryptoNumbers[i].orderbooks
  //                            })
  //       // console.log('push complete :'+this.cryptoMix[i].secondary_currency)
  //     }else{
  //       this.cryptoTotal.push(this.cryptoMix[i]);
  //     }
  //   }
  //   console.log('length total:'+this.cryptoTotal.length)
  // }

  // calculateOthertoBTC(){
  //   // let rateBtc =0;
  //    for(let i=0;i<this.cryptoMix.length;i++){
  //     if(this.cryptoMix[i].secondary_currency=='BTC'){
  //         this.rateBtc = this.cryptoMix[i].last_price;
  //         console.log('price '+this.cryptoMix[i].secondary_currency+' '+this.rateBtc);
  //       }
  //     }
  //   for(let i=0;i<this.cryptoMix.length;i++){
  //     if(this.cryptoMix[i].primary_currency!='BTC'){ //เอาที่ไม่ใช่ THB
  //       let price = this.cryptoMix[i].last_price/this.rateBtc;
  //       this.cryptoTotal.push({ pairing_id:this.cryptoNumbers[i].pairing_id,
  //                             primary_currency:'BTC',
  //                             secondary_currency:this.cryptoNumbers[i].secondary_currency,
  //                             change:this.cryptoNumbers[i].change,
  //                             last_price: price.toFixed(8),
  //                             volume_24hours:this.cryptoNumbers[i].volume_24hours,
  //                             nameCrypto:this.crytoName[i],
  //                             orderbooks:this.cryptoNumbers[i].orderbooks
  //                            })
  //                            console.log('>>>'+i);
  //       // console.log('countBTC = ' + i + this.cryptoMix[i].secondary_currency)
  //       // console.log('push complete :'+this.cryptoMix[i].secondary_currency)
  //     }else{
  //       this.cryptoTotal.push({ pairing_id: this.cryptoMix[i].pairing_id,
  //                               primary_currency: this.cryptoMix[i].primary_currency,
  //                               secondary_currency: this.cryptoMix[i].secondary_currency,
  //                               change: this.cryptoMix[i].change,
  //                               last_price: this.cryptoMix[i].last_price.toFixed(8),
  //                               volume_24hours: this.cryptoMix[i].volume_24hours,
  //                               nameCrypto: this.cryptoMix[i].nameCrypto,
  //                               orderbooks: this.cryptoMix[i].orderbooks});
  //     }
  //   }
  //   console.log('length total:'+this.cryptoTotal.length)
  // }

  // calculateOthertoETH(){
  //   // let rateEth =0;
  //     for(let i=0;i<this.cryptoMix.length;i++){
  //     if(this.cryptoMix[i].secondary_currency=='ETH' && this.cryptoMix[i].primary_currency=='THB'  ){
  //         this.rateEth = this.cryptoMix[i].last_price;
  //         console.log('ETH:price '+this.cryptoMix[i].secondary_currency+' '+this.rateEth);
  //       }
  //     }
  //   for(let i=0;i<this.cryptoMix.length;i++){
  //     if(this.cryptoMix[i].primary_currency!=='ETH'){ //เอาที่ไม่ใช่ ETH
  //       let price = this.cryptoMix[i].last_price/this.rateEth;
  //       this.cryptoTotal.push({ pairing_id:this.cryptoNumbers[i].pairing_id,
  //                             primary_currency:'ETH',
  //                             secondary_currency:this.cryptoNumbers[i].secondary_currency,
  //                             change:this.cryptoNumbers[i].change,
  //                             last_price: price.toFixed(8),
  //                             volume_24hours:this.cryptoNumbers[i].volume_24hours,
  //                             nameCrypto:this.crytoName[i],
  //                             orderbooks:this.cryptoNumbers[i].orderbooks
  //                            })
  //       // console.log('push complete :'+this.cryptoMix[i].secondary_currency)
  //     }else{
  //       this.cryptoTotal.push(this.cryptoMix[i]);
  //     }
  //   }
  //   console.log('length total:'+this.cryptoTotal.length)
  // }

  // calculateOthertoUSD(){
  //   for(let i=0;i<this.cryptoMix.length;i++){
  //     if(this.cryptoMix[i].primary_currency=='THB'){ //เอาที่เป็นเงิน THB
  //       let price = this.cryptoMix[i].last_price/33.4;
  //       this.cryptoTotal.push({ pairing_id:this.cryptoNumbers[i].pairing_id,
  //                             primary_currency:'USD',
  //                             secondary_currency:this.cryptoNumbers[i].secondary_currency,
  //                             change:this.cryptoNumbers[i].change,
  //                             last_price: price.toFixed(8),
  //                             volume_24hours:this.cryptoNumbers[i].volume_24hours,
  //                             nameCrypto:this.crytoName[i],
  //                             orderbooks:this.cryptoNumbers[i].orderbooks
  //                            })
  //       // console.log('push complete :'+this.cryptoMix[i].secondary_currency)
  //     }else if (this.cryptoMix[i].primary_currency == 'BTC') { //เอาที่เป็นเงิน BTC
  //       let price = this.cryptoMix[i].last_price * this.rateBtc // แปลงเป็นไทย
  //       price = this.cryptoMix[i].last_price/33.4;//แปลง USD
  //       this.cryptoTotal.push({ pairing_id:this.cryptoNumbers[i].pairing_id,
  //                             primary_currency:'USD',
  //                             secondary_currency:this.cryptoNumbers[i].secondary_currency,
  //                             change:this.cryptoNumbers[i].change,
  //                             last_price: price.toFixed(8),
  //                             volume_24hours:this.cryptoNumbers[i].volume_24hours,
  //                             nameCrypto:this.crytoName[i],
  //                             orderbooks:this.cryptoNumbers[i].orderbooks
  //                            })
  //       // console.log('push complete :'+this.cryptoMix[i].secondary_currency)
  //     }else{
  //       this.cryptoTotal.push(this.cryptoMix[i]);
  //     }
  //   }
  //   console.log('length total:'+this.cryptoTotal.length)
  // }

  // selectCoin(type){
  //   if (this.cryptoTotal.length > -1) {
  //       let filtered = this.cryptoTotal.filter(row => {
  //         if (row.primary_currency == type) {
  //           return true;
  //         } else {
  //           return false;
  //         }
  //       });
  //       //  this.isSelect=false;
  //       //  console.log('FilterTHB : '+filteredTHB) ;
  //       if(type=='THB'){
  //         this.THB = filtered;
  //       }else if (type == 'BTC') {
  //         this.BTC = filtered;
  //       } else if (type == 'ETH') {
  //         this.ETH = filtered;
  //       } else if (type == 'USD') {
  //         this.USD = filtered;
  //       }
        
  //   } else {
  //       console.log('No data');
  //   }
  // }

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
  }






//   selectThb(){
//        if (this.cryptoTotal.length>-1){
//          let filteredTHB = this.cryptoTotal.filter( row => { 
//             if (row.primary_currency=='THB') {
//                  return true;
//              }else {
//                  return false ;
//                }
//          });
//         //  this.isSelect=false;
//         //  console.log('FilterTHB : '+filteredTHB) ;
//         this.THB = filteredTHB ;
//        }else {
//         console.log('No data') ;
//        }
    
//   }


//   selectBtc(){
//        if (this.cryptoTotal.length>-1){
//          let filteredBTC = this.cryptoTotal.filter( row => { 
//              if (row.primary_currency=='BTC') {
//                  return true;
//              }else {
//                  return false ;
//                }
//          });
//         //  this.isSelect=true;
//         //  console.log('FilterBTC : '+filteredBTC.toString()) ;
//          this.BTC = filteredBTC ;
//        } else {
//          console.log('No data') ;
//        }
//   }

//   selectEth(){
//        if (this.cryptoTotal.length>-1){
//          let filteredETH = this.cryptoTotal.filter( row => { 
//             if (row.primary_currency=='ETH') {
//                  return true;
//              }else {
//                  return false ;
//                }
//          });
//         //  this.isSelect=false;
//         //  console.log('FilterETH : '+filteredTHB) ;
//         this.ETH = filteredETH ;
//        }else {
//         console.log('No data') ;
//        }
//   }

//   selectUsd(){
//        if (this.cryptoTotal.length>-1){
//          let filteredUSD = this.cryptoTotal.filter( row => { 
//             if (row.primary_currency=='USD') {
//                  return true;
//              }else {
//                  return false ;
//                }
//          });
//         //  this.isSelect=false;
//         //  console.log('FilterUSD : '+filteredTHB) ;
//         this.USD = filteredUSD ;
//        }else {
//         console.log('No data') ;
//        }
  
//  }

  // test(){
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
  // }

}
