import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController, Content, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { DatacoinProvider } from '../../providers/datacoin/datacoin';
/**
 * Generated class for the EditTransactionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-edit-transaction',
  templateUrl: 'edit-transaction.html',
})
export class EditTransactionPage {
  @ViewChild(Content) content: Content
  editTransactionForm: FormGroup;
  transaction: any;
  crypto: any;
  errorStatus: any;
  tradePrice: any;
  quantity: any;
  total: any;
  status: any

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public builder: FormBuilder,
    public viewCtrl: ViewController,
    public provider: DatacoinProvider,
    public alertCtrl: AlertController) {
    console.log(this.navParams.data);
    this.transaction = this.navParams.get('transaction')
    this.crypto = this.navParams.get('coin')
    console.log(this.transaction);
    console.log(this.crypto);
    this.tradePrice = this.transaction.tradePrice;
    this.quantity = this.transaction.quantity;
    this.total = this.tradePrice * this.quantity
    this.status = this.transaction.status

    this.editTransactionForm = this.builder.group({
      'status': [this.transaction.status, Validators.required],
      'tradePrice': [this.transaction.tradePrice, Validators.required],
      'quantity': [this.transaction.quantity, Validators.required],
      'date': [this.transaction.date, Validators.required],
      'note': [this.transaction.note]
    });
  }

  goBack() {
    this.navCtrl.pop();
  }

  chooseStatus() {
    this.errorStatus = '';
    console.log(this.transaction.status)
    if (this.transaction.status == 'Watch') {
      this.quantity = 0;
      this.total = 0
    }

  }

  calPrice(event) {
    console.log(event.target.value)
    this.total = this.tradePrice * this.quantity
  }

  removeTransaction() {
    let confirm = this.alertCtrl.create({
      // title: 'Remove Coin',
      message: 'Are you sure you wish to remove this transaction?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            console.log('Agree clicked');
            this.updateHolding('remove')
            this.viewCtrl.dismiss();
            // }
          }
        }
      ]
    });
    confirm.present();
  }

  updateHolding(param) {
    let valueInform = this.editTransactionForm.value

    let quantityTotal = +this.crypto.totalQuantity
    let totalPrice = +this.crypto.totalPrice;

    let quantityNew = +valueInform.quantity;
    let quantityOld = +this.transaction.quantity;

    let tradePriceOld = +this.transaction.total;

    let statusNew = valueInform.status;
    let statusOld = this.status;

    if (param == 'remove') {
      if (statusOld == 'Buy') {
        quantityTotal = (quantityTotal - quantityOld)
        console.log(`${totalPrice} = (${totalPrice} - ${tradePriceOld}) + ${this.total}`)
        totalPrice = (totalPrice - tradePriceOld)
      } else if (statusOld == 'Sell') {
        quantityTotal = (quantityTotal + quantityOld)
        totalPrice = (totalPrice + tradePriceOld)
      }
      this.provider.removedTransaction(this.transaction.$key);
      this.provider.updateAmountHolding(this.crypto, quantityTotal, totalPrice);  //update totalPrice & totalQuantity
    } else {
      if (quantityNew > 0) {
        if (statusOld == 'Buy' && statusNew == 'Buy') {
          quantityTotal = (quantityTotal - quantityOld) + quantityNew
          console.log(`${totalPrice} = (${totalPrice} - ${tradePriceOld}) + ${this.total}`)
          totalPrice = (totalPrice - tradePriceOld) + this.total
        } else if (statusOld == 'Buy' && statusNew == 'Sell') {
          quantityTotal = (quantityTotal - quantityOld) - quantityNew
          totalPrice = (totalPrice - tradePriceOld) - this.total
        } else if (statusOld == 'Sell' && statusNew == 'Buy') {
          quantityTotal = (quantityTotal + quantityOld) + quantityNew
          totalPrice = (totalPrice + tradePriceOld) + this.total
        } else if (statusOld == 'Sell' && statusNew == 'Sell') {
          quantityTotal = (quantityTotal + quantityOld) - quantityNew
          totalPrice = (totalPrice + tradePriceOld) - this.total
        }
      } else {
        if (statusOld == 'Buy' && statusNew == 'Watch') {
          quantityTotal = (quantityTotal - quantityOld)
          console.log(`${totalPrice} = (${totalPrice} - ${tradePriceOld}) + ${this.total}`)
          totalPrice = (totalPrice - tradePriceOld)
        } else if (statusOld == 'Sell' && statusNew == 'Watch') {
          quantityTotal = (quantityTotal + quantityOld)
          totalPrice = (totalPrice + tradePriceOld)
        }
      }

      let dataAddTransaction = {
        status: this.editTransactionForm.value.status,
        tradePrice: this.editTransactionForm.value.tradePrice,
        quantity: this.editTransactionForm.value.quantity,
        total: this.total,
        date: ('' + this.editTransactionForm.value.date).substr(0, 10),
        note: this.editTransactionForm.value.note
      };
      console.dir(dataAddTransaction)

      this.provider.updateTransaction(this.transaction.$key, dataAddTransaction)    //add transtion
      this.provider.updateAmountHolding(this.crypto, quantityTotal, totalPrice);  //update totalPrice & totalQuantity
    }

  }


  validate(): any {
    if (this.editTransactionForm.valid) {
      return true;
    }
    let controlStatus = this.editTransactionForm.controls['status'];
    if (controlStatus.invalid) {
      if (controlStatus.errors['required']) {
        this.errorStatus = 'Please choose a status.';
      }
    }
    return false;
  }

  editTransation() {
    this.errorStatus = '';
    let valueInform = this.editTransactionForm.value

    if (this.validate()) {
      if (this.editTransactionForm.value.note == undefined) {
        this.editTransactionForm.value.note = ''
      }
      this.updateHolding('add')
      this.viewCtrl.dismiss();
    }
    // }
    console.log('success')
  }
}
