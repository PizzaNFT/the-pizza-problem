import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-voting',
  templateUrl: './create-voting.component.html',
  styleUrls: ['./create-voting.component.scss']
})
export class CreateVotingComponent implements OnInit {

  firstPizza: string = ""
  secondPizza: string = ""
  constructor() { }

  ngOnInit(): void {
  }

  createVoting() {
    console.log("")
  }

}
