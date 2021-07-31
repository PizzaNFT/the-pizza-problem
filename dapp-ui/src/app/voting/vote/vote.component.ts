import { Component, OnInit } from '@angular/core';
import { PizzaBallotService } from 'src/app/services/pizzaBallot.service';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit {

  constructor(private pizzaBallotService: PizzaBallotService) { }

  proposals: string[] = ["pizza 1", "pizza 2"]
  selectedItem: string = ""

  ngOnInit(): void {
    this.pizzaBallotService.listProposals()
    this.proposals = ["pizza 1", "pizza 2"]
  }

  vote() {
    console.log(this.selectedItem[0])
  }
}
