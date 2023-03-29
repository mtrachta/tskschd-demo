import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'public-footer',
  templateUrl: './public-footer.component.html',
  styleUrls: ['./public-footer.component.scss']
})
export class PublicFooterComponent implements OnInit {

  copyright = "(c) Miloš Trachta, 2022"
  currentDateTime: number = Date.now()

  constructor() {
    console.debug('constructor');
  }

  ngOnInit(): void {
    console.debug('ngOnInit');
  }

}
