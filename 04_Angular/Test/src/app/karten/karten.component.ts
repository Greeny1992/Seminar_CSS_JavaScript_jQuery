import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-karten',
  templateUrl: './karten.component.html',
  styleUrls: ['./karten.component.scss']
})
export class KartenComponent implements OnInit {
  @Input() name: string = ""
  constructor() { }

  ngOnInit(): void {
  }

}
