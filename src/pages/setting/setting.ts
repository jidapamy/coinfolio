import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { PasscodePage } from '../passcode/passcode';
import { PrivacyPage } from '../privacy/privacy';
import { TutorialPage } from '../tutorial/tutorial';
import { FeedbackPage } from '../feedback/feedback';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { EmailComposer } from '@ionic-native/email-composer';
/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {
  checked:boolean;
  checkedFiger: boolean;
  

  constructor(private EmailComposer:EmailComposer,public navCtrl: NavController, public navParams: NavParams){
    
  }
  goToFeedback() {
    let email = {
      to: 'thailand_hka@hotmail.com',
      cc: 'thailand_hka@hotmail.com',
      bcc: ['thailand_hka@hotmail.com'],
      
      subject: 'แจ้งปัญหา Coinfolio',
      body: 'กรุณาแจ้งปัญหาที่เกิดขึ้นกับแอปของเราแล้วทางเราจะรีบปรับปรุงโดยด่วน!!',
      isHtml: true
    };
    this.EmailComposer.open(email);
  }
  goToEnablePasscodLock() {
    this.navCtrl.push(PasscodePage);

  }
  goToPrivacy() {
    this.navCtrl.push(PrivacyPage);

  }
  goToTutorail() {
    this.navCtrl.push(TutorialPage);
    this.checked

  }

}




