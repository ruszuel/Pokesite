import { Component, DestroyRef, effect, inject, input, signal } from '@angular/core';
import { PokemonService } from '../pokemons.service';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-pokemon-info',
  imports: [NgOptimizedImage],
  templateUrl: './pokemon-info.component.html',
  styleUrl: './pokemon-info.component.css'
})
export class PokemonInfoComponent {
  pokemonName = input.required<string>()
  image = signal<string>('')
  hp = signal([])
  types = signal<string | string[]>('')
  abilities = signal<string | string[]>([])
  height = signal<number>(0)
  weight = signal<number>(0)
  pokedex_id = signal<number>(0)
  baseExp = signal<number>(0);
  private pokemonService = inject(PokemonService)
  private destroyRef = inject(DestroyRef)

  constructor() {
    effect(() => {
      const subscription = this.pokemonService.pokemonInfo(this.pokemonName()).subscribe({
        next: (val) => {
          this.image.set(val.sprites.other['official-artwork'].front_default)
          this.hp.set(val.stats.map((s: any) => s.base_stat))
          this.types.set(val.types.map((t: any) => t.type.name))
          this.abilities.set(val.abilities.map((a: any) => a.ability.name))
          this.height.set(val.height)
          this.weight.set(val.weight)
          this.pokedex_id.set(val.id)
          this.baseExp.set(val.base_experience)

        },
      })
      this.destroyRef.onDestroy(() => subscription.unsubscribe())
    })
  }

  addToBag() {
    this.pokemonService.addToBag({
      name: this.pokemonName(),
      image: this.image(),
      types: this.types(),
      height: this.height(),
      weight: this.weight(),
      id: this.pokedex_id(),
      base_exp: this.baseExp(),
      abilities: {
        passive: this.abilities()[0],
        active: this.abilities()[1]
      },
      stats: {
        hp: this.hp()[0],
        attack: this.hp()[1],
        defense: this.hp()[2],
        special_atk: this.hp()[3],
        special_def: this.hp()[4],
        speed: this.hp()[5]
      }
    })

    console.log('pokemon added to bag!')
  }
}
