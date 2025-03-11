import { Component, computed, inject } from '@angular/core';
import { landingService } from './landing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  imports: [],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  private landingService = inject(landingService)
  sliders = this.landingService.allPokemon
  private route = inject(Router)
  onClick() {
    this.route.navigate(['pokemons'])
  }
}
