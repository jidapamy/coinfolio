import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the NewsSourcePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-news-source',
  templateUrl: 'news-source.html',
})
export class NewsSourcePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsSourcePage');
  }

}
