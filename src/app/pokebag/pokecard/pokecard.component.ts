import { Component, inject, input, output, signal } from '@angular/core';
import { pokebag } from '../../pokemons/pokemons.model';

@Component({
  selector: 'app-pokecard',
  imports: [],
  templateUrl: './pokecard.component.html',
  styleUrl: './pokecard.component.css'
})
export class PokecardComponent {
  pokemons = input.required<any>({})
  tapped = output<pokebag>()

  getClicked() {
    this.tapped.emit(this.pokemons())
  }
}
