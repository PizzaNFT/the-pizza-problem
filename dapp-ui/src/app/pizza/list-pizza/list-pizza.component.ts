import { Component, OnInit } from '@angular/core';
import { PizzaTokenService } from 'src/app/services/pizzaToken.service';

@Component({
  selector: 'app-list-pizza',
  templateUrl: './list-pizza.component.html',
  styleUrls: ['./list-pizza.component.scss']
})
export class ListPizzaComponent implements OnInit {

  pizzas: any[]
  loading = true;
  constructor(private pizzaTokenService: PizzaTokenService) { }

  async ngOnInit(): Promise<void> {
    this.pizzas = await this.pizzaTokenService.listPizzas()
    this.loading = false
  }

}
