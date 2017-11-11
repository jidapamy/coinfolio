import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { AddTransationPage } from '../pages/add-transation/add-transation';
import { AlertPage } from '../pages/alert/alert';
import { ChattingPage } from '../pages/chatting/chatting';
import { DetailsPage } from '../pages/details/details';
import { NewsPage } from '../pages/news/news';
import { NewsSourcePage } from '../pages/news-source/news-source';
import { PrivacyPage } from '../pages/privacy/privacy';
import { SelectCoinPage } from '../pages/select-coin/select-coin';
import { SettingPage } from '../pages/setting/setting';
import { TutorialPage } from '../pages/tutorial/tutorial';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'My Folio', component: HomePage },
      { title: 'News', component: NewsPage },
      { title: 'Talks', component: ChattingPage },
      { title: 'Settings', component: SettingPage }
      
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
