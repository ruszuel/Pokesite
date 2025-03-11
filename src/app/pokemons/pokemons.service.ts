import { HttpClient } from "@angular/common/http";
import { effect, inject, Injectable, signal } from "@angular/core";
import { pokebag } from "./pokemons.model";

@Injectable({ providedIn: 'root' })
export class PokemonService {
    private pokemons = signal<pokebag[]>([])
    private httpClient = inject(HttpClient)
    bag = this.pokemons.asReadonly()

    constructor() {
        effect(() => {
            const storedItem = window.localStorage.getItem('bag')
            if (storedItem) {
                this.pokemons.set(JSON.parse(storedItem))
            }
        })
    }

    pokeTypes = [
        {
            type: 'normal',
            label: 'Normal'
        },
        {
            type: 'fighting',
            label: 'Fighting'
        },
        {
            type: 'flying',
            label: 'Flying'
        },
        {
            type: 'poison',
            label: 'Poison'
        },
        {
            type: 'ground',
            label: 'Ground'
        },
        {
            type: 'rock',
            label: 'Rock'
        },
        {
            type: 'bug',
            label: 'Bug'
        },
        {
            type: 'ghost',
            label: 'Ghost'
        },
        {
            type: 'steel',
            label: 'Steel'
        },
        {
            type: 'fire',
            label: 'Fire'
        },
        {
            type: 'water',
            label: 'Water'
        },
        {
            type: 'grass',
            label: 'Grass'
        },
        {
            type: 'electric',
            label: 'Electric'
        },
        {
            type: 'psychic',
            label: 'psychic'
        },
        {
            type: 'ice',
            label: 'Ice'
        },
        {
            type: 'dragon',
            label: 'Dragon'
        },
        {
            type: 'dark',
            label: 'Dark'
        },
        {
            type: 'fairy',
            label: 'Fairy'
        },
    ]

    getPokemons() {
        return this.httpClient.get<{ results: any }>('https://pokeapi.co/api/v2/pokemon/?limit=1100')
    }

    pokemonInfo(name: string) {
        return this.httpClient.get<any>(`https://pokeapi.co/api/v2/pokemon/${name}`)
    }

    filterByType(type: string) {
        return this.httpClient.get<any>(`https://pokeapi.co/api/v2/type/${type}`)
    }

    addToBag(data: pokebag) {
        if (!this.pokemons().some((v) => v.id === data.id)) {
            const updatedBag = [...this.pokemons(), data];
            this.pokemons.set(updatedBag);
            window.localStorage.setItem('bag', JSON.stringify(updatedBag));
        } else {
            console.log("Pokemon already in bag")
        }
    }

    removeToBag(id: number) {
        this.pokemons.set(this.pokemons().filter((v) => v.id !== id))
        window.localStorage.setItem('bag', JSON.stringify(this.pokemons()))
    }

}