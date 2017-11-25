import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { AddTransationPage } from '../pages/add-transation/add-transation';
import { AlertPage } from '../pages/alert/alert';
import { ChatPage } from '../pages/chat/chat';
import { DetailsPage } from '../pages/details/details';
import { NewsPage } from '../pages/news/news';
import { NewsSourcePage } from '../pages/news-source/news-source';
import { PrivacyPage } from '../pages/privacy/privacy';
import { SettingPage } from '../pages/setting/setting';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { FolioPage } from '../pages/folio/folio';
import { LoginPage } from '../pages/login/login';
import { EditTransactionPage } from '../pages/edit-transaction/edit-transaction';
import { DatacoinProvider } from '../providers/datacoin/datacoin';
import { PasscodePage } from '../pages/passcode/passcode';
import { Content } from 'ionic-angular';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  // rootPage: any = LoginPage;
  // rootPage: any = TutorialPage;
  username:any='';
  test:any='';
  test2:any='';
  @ViewChild(Content) content: Content

  pagesForLogin: Array<{icon:string;title: string, component: any}>;
  pages: Array<{ icon: string; title: string, component: any }>;

  constructor(public platform: Platform, 
              public statusBar: StatusBar, 
              public splashScreen: SplashScreen,
              public provider: DatacoinProvider,
            ) {
    this.initializeApp();
    this.provider.getUsername().then((data) => {
      this.username = data;
      this.content.resize();
      console.log('Menu Constructor: ' + this.username)
    })

    // used for an example of ngFor and navigation
    this.pagesForLogin = [
      { icon:'home',title: 'Home', component: HomePage },
      { icon: 'star',title: 'My Folio', component: FolioPage },
      { icon: 'information-circle',title: 'News', component: NewsPage },
      { icon: 'chatbubbles',title: 'Talks', component: ChatPage },
      { icon: 'settings',title: 'Settings', component: SettingPage }
    ];

    this.pages = [
      { icon: 'home', title: 'Home', component: HomePage },
      { icon: 'information-circle', title: 'News', component: NewsPage },
      { icon: 'chatbubbles', title: 'Talks', component: ChatPage },
    ];

    if(this.username==''){
      this.test = 'null';
    }else{
      this.test = this.username;
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyApp');
    // this.username = this.provider.getUsername();
    // console.log('Username: '+this.username);
    // if (this.username == '') {
    //   this.test2 = 'null';
    // } else {
    //   this.test2 = this.username;
    // }
    // console.log('Test: ' + this.test);
    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      console.log('OKKK')
      this.content.resize();
      
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

  logout(){
    this.provider.setUsername('');
    this.username='';
    this.nav.setRoot(HomePage);
    this.content.resize();
    
    
  }

  login(){
    this.nav.push(LoginPage);
    // this.username = this.provider.getUsername();
    
  }

  ngOnInit() {
    this.provider.getUsername().then((data) => {
      this.username = data;
      this.content.resize();
      console.log('ngOnInit refresh: ' + this.username);
      // this.doRefresh(event);
      // console.log(this.content)
    })
    // this.username = this.provider.getUsername();
    // console.log('Menu : ' + this.username)
  }

  ionViewWillEnter(){
    this.content.resize();
    console.log('ionViewWillEnter : ' + this.username)
  }


  doRefresh(refresher) {
    console.log("5555555");
    setTimeout(() => {
      this.content.resize();
      refresher.complete();
      console.log('refresher')
      console.log('USername refresh: '+this.username)
    }, 500);



  }
}
