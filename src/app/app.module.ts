import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AddTransationPage } from '../pages/add-transation/add-transation';
import { AlertPage } from '../pages/alert/alert';
import { ChatPage } from '../pages/chat/chat';
import { DetailsPage } from '../pages/details/details';
import { NewsPage } from '../pages/news/news';
import { NewsSourcePage } from '../pages/news-source/news-source';
import { PrivacyPage } from '../pages/privacy/privacy';
import { SelectCoinPage } from '../pages/select-coin/select-coin';
import { SettingPage } from '../pages/setting/setting';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { FolioPage } from '../pages/folio/folio';
<<<<<<< HEAD
import { CoinsDetailPage } from '../pages/coins-detail/coins-detail';
=======
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
>>>>>>> 4e39091bf8cf0188a7f77a8c53ec7e37bfec1573

import { HttpModule } from '@angular/http' ;
import { FormsModule } from '@angular/forms' ;

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DatacoinProvider } from '../providers/datacoin/datacoin';
import { IonicStorageModule } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';

<<<<<<< HEAD

=======
export const config = {
  apiKey: "AIzaSyCqUaUXncsFJqpFi4LnTa_ak3iI3SzNJ0M",
  authDomain: "coinfoli.firebaseapp.com",
  databaseURL: "https://coinfoli.firebaseio.com",
  projectId: "coinfoli",
  storageBucket: "coinfoli.appspot.com",
  messagingSenderId: "993908064513"
};
>>>>>>> 4e39091bf8cf0188a7f77a8c53ec7e37bfec1573

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddTransationPage,
    AlertPage,
    ChatPage,
    DetailsPage,
    NewsPage,
    NewsSourcePage,
    PrivacyPage,
    SelectCoinPage,
    SettingPage,
    TutorialPage,
    FolioPage,
<<<<<<< HEAD
    CoinsDetailPage
=======
    LoginPage,
    RegisterPage
>>>>>>> 4e39091bf8cf0188a7f77a8c53ec7e37bfec1573
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    FormsModule,
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddTransationPage,
    AlertPage,
    ChatPage,
    DetailsPage,
    NewsPage,
    NewsSourcePage,
    PrivacyPage,
    SelectCoinPage,
    SettingPage,
    TutorialPage,
    FolioPage,
<<<<<<< HEAD
    CoinsDetailPage
=======
    LoginPage,
    RegisterPage
>>>>>>> 4e39091bf8cf0188a7f77a8c53ec7e37bfec1573
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatacoinProvider,
    InAppBrowser
  ]
})
export class AppModule {}
