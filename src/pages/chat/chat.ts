import { Component, ViewChild, AfterViewChecked, ElementRef } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { DatacoinProvider } from '../../providers/datacoin/datacoin';

// import { Content } from 'ionic-angular';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
	selector: 'page-chat',
	templateUrl: 'chat.html',
})
export class ChatPage {
	@ViewChild('scrollMe') private myScrollContainer: ElementRef;
	MAX_NUMBER = 100;
	sendMessage: FormGroup;

	chatsList:any[];
	username: string;
	message: string;
	userLogin: boolean;
	errorMessage: string = '';
	date: Date = new Date();

	constructor(public builder: FormBuilder,
		public alertCtrl: AlertController,
		public navCtrl: NavController,
		public navParams: NavParams,
		public angularfire: AngularFireDatabase,
		public provider: DatacoinProvider) {
		this.chatsList = this.provider.getChatData();
		
		// remove chat if over limit (MAX_NUMBER)
		for (let i = 0; i < this.chatsList.length - this.MAX_NUMBER; i++) {
			this.provider.removedChat(this.chatsList[i])
		}
		
		// username in chat
		this.provider.getUsername().then((item) => {
			if (item) {
				this.username = item;
				this.userLogin = true;
			} else {
				let random = Math.floor(Math.random() * (9999 - 1000) + 1000);
				this.username = 'User' + random;
			}
		});

		this.sendMessage = this.builder.group({
			'message': ['', Validators.required]
		});

	}

	// scroll to buttom when add chat
	ngAfterViewChecked() {
		this.myScrollContainer.nativeElement.scrollTop =
			this.myScrollContainer.nativeElement.scrollHeight;
	}

	editUsername() {
		let prompt = this.alertCtrl.create({
			title: 'Edit Username',
			message: "Enter a new username for chatting!",
			inputs: [
				{
					name: 'newUsername',
					placeholder: 'Your Username'
				},
			],
			buttons: [
				{
					text: 'Cancel',
					handler: data => {
						console.log('Cancel clicked');
					}
				},
				{
					text: 'Save',
					handler: data => {
						console.log('Saved clicked');
						if (data.newUsername) {
							this.username = data.newUsername;
						}
					}
				}
			]
		});

		prompt.present();
	}


	validate(): any {
		let errorMsg: string;
		if (this.sendMessage.valid) {
			return true;
		}

		let controlMsg = this.sendMessage.controls['message'];
		if (controlMsg.invalid) {
			if (controlMsg.errors['required']) {
				errorMsg = 'Please provide a message.';
			}
		}

		this.errorMessage = errorMsg;
		return false;
	}

	saveMsg() {
		this.errorMessage = '';
		if (this.validate()) {
			this.message = this.sendMessage.value.message;
			console.log("message : " + this.message)
			console.log("date: " + this.date.toDateString())

			// Object of chat
			let chatTemp = {
				messages: this.message,
				username: this.username,
				date: this.date.toDateString()
			}
			this.provider.addChats(chatTemp) // add chat in database
			this.chatsList = this.provider.getChatData();
			for (let i = 0; i < this.chatsList.length - this.MAX_NUMBER; i++) { // remove chat if over limit
				this.provider.removedChat(this.chatsList[i])
			}
			this.message = '';
		} else {
			this.errorMessage = 'Please provide a message.';
			console.log(this.errorMessage)
		}
	}

}
