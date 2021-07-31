import { Component, OnInit } from '@angular/core';
import { PizzaBallotService } from 'src/app/services/pizzaBallot.service';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit {

  constructor(private pizzaBallotService: PizzaBallotService) { }

  proposals: string[]
  selectedItem: string = ""

  async ngOnInit(): Promise<void> {
    this.proposals = await this.pizzaBallotService.listProposals()
  }

  vote() {
    console.log(this.selectedItem[0])
    this.pizzaBallotService.vote(parseInt(this.selectedItem[0]))
  }
}
