import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatacoinProvider} from '../../providers/datacoin/datacoin';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the HeaderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-header',
  templateUrl: 'header.html',
})
export class HeaderPage {
  usersData: FirebaseListObservable<any[]>;
  myCoinsData: FirebaseListObservable<any[]>;

  usersArray:any[];
  username:any;
  totalPrice:any=0;
  test:any;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public provider: DatacoinProvider,
              public storage: Storage,
              public angularfire: AngularFireDatabase) {
    this.usersData = this.provider.userData;
    this.usersData.subscribe((data) => {
      this.usersArray = data
      this.username = '';
      this.storage.ready().then(() => {
        this.provider.getUsername().then((data) => {
          this.username = data
          for (let i = 0; i < this.usersArray.length; i++) {
            if (this.usersArray[i].username == this.username) {
              console.log('Key User:' + this.usersArray[i].$key + '/Username:' + this.usersArray[i].username)
              this.provider.userKey = this.usersArray[i].$key;
              this.provider.username = this.usersArray[i].username;
              break;
            }
          }
          let myCoins: any[];
          let mycoinsPath = this.provider.getMycoinsPath();
          this.myCoinsData = this.angularfire.list(mycoinsPath);
          this.myCoinsData.subscribe(data => {
            myCoins = data;
          })
          console.log('MyCoins: ' + myCoins.length)
          this.totalPrice = 0;
          for (let i = 0; i < myCoins.length; i++) {
            let totalEachCoin = myCoins[i].totalPrice;
            this.totalPrice += totalEachCoin
          }
          this.totalPrice = (+this.totalPrice).toFixed(2);
          console.log('this.totalPrice: ' + this.totalPrice)

        });
      });
    });


    // this.usersData = this.provider.userData;
    // this.usersData.subscribe((data) => {
    //   this.usersArray = data
    //   this.username = '';
    //   this.storage.ready().then(() => {
    //     this.provider.getUsername().then((data) => {
    //       this.username = data
    //       for (let i = 0; i < this.usersArray.length; i++) {
    //         if (this.usersArray[i].username == this.username) {
    //           console.log('Key User:' + this.usersArray[i].$key + '/Username:' + this.usersArray[i].username)
    //           this.provider.userKey = this.usersArray[i].$key;
    //           this.provider.username = this.usersArray[i].username;
    //           break;
    //         }
    //       }
    //       let myCoins: any[];
    //       let mycoinsPath = this.provider.getMycoinsPath();
    //       this.myCoinsData = this.angularfire.list(mycoinsPath);
    //       this.myCoinsData.subscribe(data => {
    //         myCoins = data;
    //       })
    //       console.log('MyCoins: '+myCoins.length)
    //       for(let i=0;i<myCoins.length;i++){
    //         let totalEachCoin = myCoins[i].totalPrice;
    //         this.totalPrice += totalEachCoin 
    //       }
    //       this.totalPrice = (+this.totalPrice).toFixed(2);

    //     });
    //   });
    // });
    


  } 

  ionViewDidLoad() {
    console.log('ionViewDidLoad HeaderPage');
  }

}
