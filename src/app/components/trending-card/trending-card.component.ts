import {Component, Input} from '@angular/core';
import {AnimePreview} from "../../models/AnimePreview";

@Component({
  selector: 'app-trending-card',
  standalone: true,
  imports: [],
  templateUrl: './trending-card.component.html',
  styleUrl: './trending-card.component.css'
})
export class TrendingCardComponent {
  @Input() animePreview!:AnimePreview;

  viewAnime(){
    window.open('/info/'+this.animePreview.id, '_blank');
    // this.router.navigate(['/leave-request/'+id]);
  }

}
