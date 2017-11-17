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

import { HttpModule } from '@angular/http' ;
import { FormsModule } from '@angular/forms' ;

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DatacoinProvider } from '../providers/datacoin/datacoin';
import { IonicStorageModule } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';

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
    FolioPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    FormsModule
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
    FolioPage
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
