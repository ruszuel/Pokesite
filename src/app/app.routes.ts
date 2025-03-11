import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { PokemonsComponent } from './pokemons/pokemons.component';
import { PokebagComponent } from './pokebag/pokebag.component';

export const routes: Routes = [
    {
        path: '',
        component: LandingComponent
    },
    {
        path: 'pokemons',
        component: PokemonsComponent
    },
    {
        path: 'pokebag',
        component: PokebagComponent
    },
    {
        path: '**',
        component: PokemonsComponent
    }
];
