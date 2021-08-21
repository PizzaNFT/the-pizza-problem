import { Component, OnInit } from '@angular/core';
import { PizzaBallotService } from 'src/app/services/pizzaBallot.service';

@Component({
  selector: 'app-voting-results',
  templateUrl: './voting-results.component.html',
  styleUrls: ['./voting-results.component.scss']
})
export class VotingResultsComponent implements OnInit {

  constructor(private pizzaBallotService: PizzaBallotService) { }

  async ngOnInit(): Promise<void> {
    await this.pizzaBallotService.getVotingResults()
  }

}
