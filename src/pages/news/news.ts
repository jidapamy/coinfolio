import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import xml2js from 'xml2js';
import { InAppBrowser, InAppBrowserOptions } from "@ionic-native/in-app-browser";
// import { DatacoinProvider , objectCoinMarKetCap} from '../../providers/datacoin/datacoin';
import { DatacoinProvider, newsData, newsDataDetail } from '../../providers/datacoin/datacoin';

/**
 * Generated class for the NewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {
  news: any = '';
  items: newsDataDetail[] = [];
  isSelect: boolean;

  title: any;
  pubDate: any;
  link: any;
  description: any;

  url: string;
  constructor(private inAppBrowser: InAppBrowser, public http: Http, public navCtrl: NavController, public provider: DatacoinProvider) {

    this.provider.loadNews().subscribe(data => {
      this.news = data;
      console.dir(this.news)
    },
      error => { console.log("error: " + error); },
      () => {
        // วนเอาค่า ข่าวที่เก็บมาใส่ ใน itemที่เป็น objectเพื่อไปแสดงในหน้า html
        for (let i = 0; i < this.news.items.length; i++) {

          this.items.push({
            title: this.news.items[i].title,
            pubDate: this.news.items[i].pubDate,
            link: this.news.items[i].link,
            guid: this.news.items[i].guid,
            author: this.news.items[i].author,
            thumbnail: this.news.items[i].thumbnail,
            description: this.news.items[i].description,
            content: this.news.items[i].content,
            enclosure: this.news.items[i].enclosure.link,
            categories: this.news.items[i].categories

          })

        }

      })

    this.isSelect = false;
  }


  //   method   รับlink จาก หน้า html มาเปิดในเบาเซอร์
  openWebpage(item) {
    const options: InAppBrowserOptions = {
      zoom: 'no'
    }
    // Opening a URL and returning an InAppBrowserObject
    const browser = this.inAppBrowser.create(item.link, '_self', options);

    // Inject scripts, css and more with browser.X
  }
  doRefresh(refresher) {
    // ดึงข้อมูลมาเมื่อมีการใช้ method 
    setTimeout(() => {
      console.log('Async operation has ended');
      this.items.length = 0;
      for (let i = 0; i < this.news.items.length; i++) {
        this.items.push({
          title: this.news.items[i].title,
          pubDate: this.news.items[i].pubDate,
          link: this.news.items[i].link,
          guid: this.news.items[i].guid,
          author: this.news.items[i].author,
          thumbnail: this.news.items[i].thumbnail,
          description: this.news.items[i].description,
          content: this.news.items[i].content,
          enclosure: this.news.items[i].enclosure.link,
          categories: this.news.items[i].categories
        })
        console.log('item' + i + ' ' + this.news.items[i].title);
      }
      // ตั้งเวลาหน่วงเวลา รีเฟรชหน้า
      refresher.complete();
      console.log(`length: ${this.items.length}`)

    }, 500);
  }

 
}
