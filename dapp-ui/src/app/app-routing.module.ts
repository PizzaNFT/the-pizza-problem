import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAccountComponent } from './account/create-account/create-account.component';
import { SigninComponent } from './account/signin/signin.component';
import { BuyPizzaComponent } from './pizza/buy-pizza/buy-pizza.component';
import { CreateVotingComponent } from './voting/create-voting/create-voting.component';
import { VoteComponent } from './voting/vote/vote.component';

const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  { path: 'signin', component: SigninComponent },
  { path: 'create-voting', component: CreateVotingComponent },
  { path: 'create-account', component: CreateAccountComponent },
  { path: 'vote', component: VoteComponent },
  {
    path: 'pizza', children: [
      { path: '', redirectTo: 'buy', pathMatch: 'full' },
      { path: 'buy', component: BuyPizzaComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
