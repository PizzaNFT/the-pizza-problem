import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAccountComponent } from './account/create-account/create-account.component';
import { CreateVotingComponent } from './voting/create-voting/create-voting.component';
import { VoteComponent } from './voting/vote/vote.component';

const routes: Routes = [
  { path: '', redirectTo: 'create-voting', pathMatch: 'full' },
  { path: 'create-voting', component: CreateVotingComponent },
  { path: 'create-account', component: CreateAccountComponent },
  { path: 'vote', component: VoteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
