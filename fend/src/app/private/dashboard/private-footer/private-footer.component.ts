import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'private-footer',
  templateUrl: './private-footer.component.html',
  styleUrls: ['./private-footer.component.scss']
})
export class PrivateFooterComponent implements OnInit {

  copyright = "(c) Petr Trachta, 2022"
  currentDateTime: number = Date.now()

  constructor() {
    console.debug('constructor');
  }

  ngOnInit(): void {
    console.debug('ngOnInit');
  }

}
