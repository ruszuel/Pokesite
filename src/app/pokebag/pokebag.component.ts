import { Component, DestroyRef, effect, inject, signal } from '@angular/core';
import { PokecardComponent } from "./pokecard/pokecard.component";
import { pokebag } from '../pokemons/pokemons.model';
import { CommonModule, DecimalPipe } from '@angular/common';
import { PokemonService } from '../pokemons/pokemons.service';

@Component({
  selector: 'app-pokebag',
  imports: [PokecardComponent, DecimalPipe, CommonModule],
  templateUrl: './pokebag.component.html',
  styleUrl: './pokebag.component.css'
})
export class PokebagComponent {
  private pokemonService = inject(PokemonService)
  private destroyRef = inject(DestroyRef)
  pokeInfo = signal<pokebag[]>([])
  weakness = signal<any[]>([])
  pokemonList = ''
  isClicked = false

  constructor() {
    effect(() => {
      const bag = window.localStorage.getItem('bag')
      this.pokemonList = bag ? JSON.parse(bag) : []
    })
  }

  getCLickedEvent(data: pokebag) {
    const subss = this.pokemonService.filterByType(data.types[0]).subscribe({
      next: (val) => {
        this.weakness.set(val.damage_relations.double_damage_from)
      }
    })
    this.pokeInfo.set([data])
    this.isClicked = true
    this.destroyRef.onDestroy(() => {
      subss.unsubscribe()
    })
  }

  removeFromBag(id: number) {
    this.pokemonService.removeToBag(id)
    const bag = window.localStorage.getItem('bag')
    this.pokemonList = bag ? JSON.parse(bag) : []
    this.pokeInfo.set([])
    this.isClicked = false
  }
}
