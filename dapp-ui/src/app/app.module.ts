import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidenavComponent } from './sidenav/sidenav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';

import { CreateVotingComponent } from './voting/create-voting/create-voting.component';
import { VoteComponent } from './voting/vote/vote.component';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateAccountComponent } from './account/create-account/create-account.component';
import { BuyPizzaComponent } from './pizza/buy-pizza/buy-pizza.component';

import { GlobalService } from './services/global.service';
import { PizzaTokenService } from './services/pizzaToken.service';
import { WalletService } from './services/wallet.service';
import { SigninComponent } from './account/signin/signin.component';
import { PizzaBallotService } from './services/pizzaBallot.service';
import { AuthGuard } from './services/auth-guard.service';
import { PizzaCoinService } from './services/pizzaCoin.service';
import { ListPizzaComponent } from './pizza/list-pizza/list-pizza.component';
import { VotingResultsComponent } from './voting/voting-results/voting-results.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    CreateVotingComponent,
    VoteComponent,
    CreateAccountComponent,
    BuyPizzaComponent,
    SigninComponent,
    ListPizzaComponent,
    VotingResultsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    AppRoutingModule,
    NgbModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDividerModule,
  ],
  providers: [
    GlobalService,
    WalletService,
    PizzaTokenService,
    PizzaBallotService,
    PizzaCoinService,
    AuthGuard,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
