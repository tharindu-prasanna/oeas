import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-individuals',
  templateUrl: './individuals.component.html',
  styleUrls: ['./individuals.component.css']
})
export class IndividualsComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription()

  constructor() {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
