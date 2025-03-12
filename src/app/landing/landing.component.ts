import { AfterViewInit, Component, effect, ElementRef, inject, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { landingService } from './landing.service';
import { Router } from '@angular/router';
import Flickity from 'flickity';

@Component({
  selector: 'app-landing',
  imports: [],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent implements AfterViewInit {
  @ViewChild('carousel', { static: false }) carouselElement!: ElementRef
  private landingService = inject(landingService)
  sliders = this.landingService.allPokemon
  private route = inject(Router)

  flickityInstance: any

  ngAfterViewInit() {
    this.flickityInstance = new Flickity(this.carouselElement.nativeElement, {
      cellAlign: 'center',
      contain: true,
      wrapAround: true,
      autoPlay: 3000,
      pageDots: false,
      percentPosition: false,
      resize: true,
      initialIndex: 1
    });


    setTimeout(() => {
      this.flickityInstance.resize();
      this.flickityInstance.reposition();

      const cells = this.carouselElement.nativeElement.querySelectorAll('.carousel-cell:not(.is-selected)');
      cells.forEach((cell: HTMLElement) => {
        cell.style.alignSelf = 'center';
      });
    }, 100);
  }



  onClick() {
    this.route.navigate(['pokemons'])
  }
}
