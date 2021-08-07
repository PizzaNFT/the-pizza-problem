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
  loading = false;
  async ngOnInit(): Promise<void> {
    this.proposals = await this.pizzaBallotService.listProposals()
  }

  async vote() {
    this.loading = true;
    await this.pizzaBallotService.vote(parseInt(this.selectedItem[0]))
    this.loading = false;
  }
}
