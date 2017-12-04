import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatacoinProvider } from '../../providers/datacoin/datacoin';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';
import { PrivacyPage } from '../privacy/privacy';
import { TutorialPage } from '../tutorial/tutorial';
import { FeedbackPage } from '../feedback/feedback';
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
  checkedFiger: boolean;
  statusToggle: boolean;

  constructor(public provider: DatacoinProvider,private faio: FingerprintAIO,private EmailComposer:EmailComposer,public navCtrl: NavController, public navParams: NavParams){
    this.provider.getFingerprint().then(data => {
      this.statusToggle = data;
    })
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
  goToPrivacy() {
    this.navCtrl.push(PrivacyPage);

  }
  goToTutorail() {
    this.navCtrl.push(TutorialPage);

  } 
  checkToggle(){
    this.statusToggle = !this.statusToggle;
    this.provider.setFingerprint(this.statusToggle);
  }
}




