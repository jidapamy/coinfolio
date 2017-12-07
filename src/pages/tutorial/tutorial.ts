import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { DatacoinProvider } from '../../providers/datacoin/datacoin';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';

import { HomePage } from '../home/home';
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
  @ViewChild(Slides) slides: Slides;
  data: any;
  usersInFirebase:any[]=[]
  key:any[];
  user:any[];
  SkipMs:string="SKIP";

  constructor(public navCtrl: NavController,
              public provider: DatacoinProvider,
              public navParams: NavParams,
              public angularfire: AngularFireDatabase) {

   
    console.log('Length: '+this.usersInFirebase.length);
    this.provider.setDataTutorial(true);
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
  skip() {
    this.navCtrl.setRoot(HomePage);
  }

  slideChanged() {
    if (this.slides.isEnd()){
      this.SkipMs = "Alright, I got it";
    }else{
      this.SkipMs = "SKIP";
    }
      
  }
  
}
