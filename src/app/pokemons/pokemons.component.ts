import { Component, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { PokemonService } from './pokemons.service';
import { PokemonInfoComponent } from "./pokemon-info/pokemon-info.component";
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-pokemons',
  imports: [PokemonInfoComponent, FormsModule, RouterLink],
  templateUrl: './pokemons.component.html',
  styleUrl: './pokemons.component.css'
})
export class PokemonsComponent {
  private pokemonService = inject(PokemonService)
  private destroyRef = inject(DestroyRef)
  private route = inject(ActivatedRoute)
  private router = inject(Router)
  pokeTypes = this.pokemonService.pokeTypes
  pokemons = signal<any[]>([])
  pokes = signal<any>([])
  filtered = signal<any[]>([])
  pagesize = signal(10).asReadonly()
  currentPage = signal(1)
  filteredTypes = signal('')
  isFiltering = false
  isSearching = false
  search = ''
  listLength = 0

  ngOnInit() {
    const subscription = this.pokemonService.getPokemons().subscribe({
      next: (val) => {
        this.pokemons.set(val.results.map((val: any) => val.name))
        this.pokes.set(this.dataPerPage().map((val) => val))
      },
    })
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe()
    })

    this.route.queryParams.subscribe(params => {
      if (params['pokemon']) {
        this.search = params['pokemon']
        this.searchFn()
      } else {
        this.search = '';
        this.isSearching = false
        this.pokes.set(this.dataPerPage().map((val) => val));
      }
    })
  }

  dataPerPage() {
    const startIndex = (this.currentPage() - 1) * this.pagesize()
    if (this.isFiltering) {
      return this.filtered().slice(startIndex, this.pagesize() + startIndex)
    }
    return this.pokemons().slice(startIndex, this.pagesize() + startIndex)
  }

  nextPage() {
    const length = this.isFiltering ? this.filtered().length : this.pokemons().length
    if (this.currentPage() * this.pagesize() < length) {
      this.currentPage.set(this.currentPage() + 1)
      this.pokes.set(this.dataPerPage().map((val) => val))
    }
  }

  prevPage() {
    if (this.currentPage() > 1) {
      this.currentPage.set(this.currentPage() - 1)
      this.pokes.set(this.dataPerPage().map((val) => val))
    }
  }

  filter() {
    this.isFiltering = true
    this.currentPage.set(1)
    const subscription = this.pokemonService.filterByType(this.filteredTypes()).subscribe({
      next: (val) => {
        this.filtered.set(
          this.pokemons()
            .filter((value: any) => val.pokemon.map((p: any) => p.pokemon.name).includes(value))
            .map((val: any) => val)
        )
        console.log(this.filtered().length)
        this.pokes.set(this.dataPerPage().map((val) => val))
      }
    })
  }

  onCheckboxChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.checked) {
      this.filteredTypes.set(inputElement.value)
      this.filter()
    } else {
      this.filteredTypes.set('')
      this.isFiltering = false
      this.pokes.set(this.dataPerPage().map((val) => val))
    }
  }

  searchFn() {
    this.isSearching = true
    this.router.navigate(['/pokemons'], { queryParams: { pokemon: this.search } })
    const searchMe = this.pokemons().filter((v) => v === this.search.toLowerCase())
    this.pokes.set(searchMe)
  }

}
