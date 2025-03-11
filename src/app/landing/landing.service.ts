import { Injectable, signal } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class landingService {
    private sliderList = signal<{ id: string, type: string, symbol: string, pokemon: string }[]>([
        {
            id: '1',
            type: 'Grass',
            symbol: 'grass.svg',
            pokemon: 'bulbasaur.png'
        },
        {
            id: '2',
            type: 'Fire',
            symbol: 'fire.svg',
            pokemon: 'fire-type.png'
        },
        {
            id: '3',
            type: 'Water',
            symbol: 'water.svg',
            pokemon: 'totodile-nobg.png'
        },
        {
            id: '4',
            type: 'Electric',
            symbol: 'electric.svg',
            pokemon: 'pika.png'
        },
        {
            id: '5',
            type: 'Normal',
            symbol: 'normal.svg',
            pokemon: 'eeve.png'
        },
    ])

    allPokemon = this.sliderList.asReadonly()
}