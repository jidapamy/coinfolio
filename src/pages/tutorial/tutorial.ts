import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

/**
 * Generated class for the TutorialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html',
})
export class TutorialPage {
  data: any;
  users: FirebaseListObservable<any[]>;
  usersInFirebase:any[]=[]
  key:any[];
  user:any[];
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public angularfire: AngularFireDatabase) {

    this.users = angularfire.list('/users');
    this.users.update('-KzgePivGfYHDl2kx4D8',{username:'msmdmsms'})
   
    console.log('Length: '+this.usersInFirebase.length);
    // console.log('KEY:' + this.myCoins)
  }

  pushKey(userKey){
    if(userKey){
      console.log(userKey);
    }
  }
  click(){
    console.log(this.usersInFirebase[1].username)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TutorialPage');
  }

}
