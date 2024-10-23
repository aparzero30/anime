import {AfterViewInit, Component, ElementRef, Input, QueryList, ViewChildren} from '@angular/core';
import {AnimePreview} from "../../models/AnimePreview";

@Component({
  selector: 'app-trending-card',
  standalone: true,
  imports: [],
  templateUrl: './trending-card.component.html',
  styleUrl: './trending-card.component.css'
})
export class TrendingCardComponent implements AfterViewInit{
  ngAfterViewInit(): void {
      this.fixHeight();
  }
  @Input() animePreview!:AnimePreview;

  @ViewChildren('card') cards!: QueryList<ElementRef>;

  viewAnime(){
    window.open('/info/'+this.animePreview.id, '_blank');
    // this.router.navigate(['/leave-request/'+id]);
  }

  fixHeight(){
    const cardElements = this.cards.toArray();
    if (cardElements.length > 0) {
      const initialHeight = cardElements[0].nativeElement.offsetHeight;
      const initialWidth = cardElements[0].nativeElement.offsetWidth;

      //const firstCardHeight = initialHeight>30? initialHeight:37;
      const firstCardHeight =  initialWidth+(initialWidth/2)-10;
      console.log(cardElements[0].nativeElement.width)

      cardElements.forEach(card => {
        card.nativeElement.style.height = `${firstCardHeight}px`;
        card.nativeElement.style.minHeight = `${firstCardHeight}px`;
        card.nativeElement.style.maxHeight = `${firstCardHeight}px`;

      });
    }
  }
}
