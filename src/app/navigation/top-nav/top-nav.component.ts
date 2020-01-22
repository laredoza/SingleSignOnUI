import { Component, OnInit } from '@angular/core';
import {NavService} from '../nav.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {

  public header: string;

  constructor(public navService: NavService) { }

  ngOnInit() {
    this.navService.header.subscribe((value) => {
      this.header = value; 
    });
  }
}
