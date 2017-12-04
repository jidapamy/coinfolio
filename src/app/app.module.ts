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
import { SettingPage } from '../pages/setting/setting';
import { FolioPage } from '../pages/folio/folio';
import { CoinsDetailPage } from '../pages/coins-detail/coins-detail';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { HeaderPage } from '../pages/header/header';

import { PrivacyPage } from '../pages/privacy/privacy';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { FeedbackPage } from '../pages/feedback/feedback';

import { HttpModule } from '@angular/http' ;
import { FormsModule } from '@angular/forms' ;

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DatacoinProvider } from '../providers/datacoin/datacoin';
import { IonicStorageModule } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { EmailComposer } from '@ionic-native/email-composer';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';
import { EditTransactionPage } from '../pages/edit-transaction/edit-transaction';
import { Screenshot } from '@ionic-native/screenshot';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { SocialSharing } from '@ionic-native/social-sharing';


export const config = {
  apiKey: "AIzaSyCqUaUXncsFJqpFi4LnTa_ak3iI3SzNJ0M",
  authDomain: "coinfoli.firebaseapp.com",
  databaseURL: "https://coinfoli.firebaseio.com",
  projectId: "coinfoli",
  storageBucket: "coinfoli.appspot.com",
  messagingSenderId: "993908064513"
};

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
    SettingPage,
    TutorialPage,
    FolioPage,
    CoinsDetailPage,
    LoginPage,
    RegisterPage,   
    FeedbackPage,
    EditTransactionPage,
    HeaderPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    FormsModule,
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    
    
    
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
    SettingPage,
    TutorialPage,
    FolioPage,
    CoinsDetailPage,
    LoginPage,
    RegisterPage,
    FeedbackPage,
    EditTransactionPage,
    HeaderPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatacoinProvider,
    InAppBrowser, EmailComposer,
    FingerprintAIO,
    Screenshot,
    Camera,
    SocialSharing
  ]
})
export class AppModule {}
