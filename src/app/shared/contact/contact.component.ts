import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ContactService} from "../../services/contact.service";
import {ContactModel} from "../../models/contact.model";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit, OnDestroy {
  contacts: ContactModel = {}
  subscription: Subscription = new Subscription();

  constructor(private contactService: ContactService) {
  }

  ngOnInit() {
    // this.subscription = this.contactService.getContacts().subscribe(
    //   (contactsData: ContactModel) => {
    //     this.contacts = contactsData
    //   }
    // )

    this.contacts = {
      "show_contacts": true,
      "show_inquiry": false,
      "telephone": "011 278 4537",
      "telephone_status": true,
      "email_link": "https://slexamscomp@gmail.com",
      "email": "slexamscomp@gmail.com",
      "email_status": true
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
