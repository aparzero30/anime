import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AniListService} from "../../services/ani-list.service";
import {HeaderComponent} from "../../components/header/header.component";
import {TrendingPanelComponent} from "../../components/trending-panel/trending-panel.component";
import {BannerComponent} from "../../components/banner/banner.component";
import {IAnimeInfo} from "@consumet/extensions";
import {AnimeInfo} from "../../models/AnimeInfo";
import {NgIf, NgStyle} from "@angular/common";
import {DesignUtil} from "../../util/DesignUtil";
import {EpisodeWrapperComponent} from "../../components/episode-wrapper/episode-wrapper.component";
import {CharacterWrapperComponent} from "../../components/character-wrapper/character-wrapper.component";
import {LoadingComponent} from "../../components/loading/loading.component";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-info-page',
  standalone: true,
  imports: [
    HeaderComponent,
    TrendingPanelComponent,
    BannerComponent,
    NgIf,
    NgStyle,
    EpisodeWrapperComponent,
    CharacterWrapperComponent,
    LoadingComponent
  ],
  templateUrl: './info-page.component.html',
  styleUrl: './info-page.component.css'
})
export class InfoPageComponent implements OnInit{


  animeInfo:AnimeInfo | undefined = undefined;
  isLoading  = true;

  episodesActive = true;
  charactersActive = false;

  animeId = "0";

  @ViewChild('mediaWrapper') mediaWrapper!: ElementRef;

  setCharactersActive() {
    this.episodesActive = false;
    this.charactersActive = true;
    const wrapper = this.mediaWrapper.nativeElement;
    wrapper.scrollBy({ left: wrapper.scrollWidth, behavior: 'smooth' });
  }
  setEpisodesActive(){
    this.episodesActive = true;
    this.charactersActive = false;
    const wrapper = this.mediaWrapper.nativeElement;
    // Scroll left by a specific amount (e.g., 200px)
    // wrapper.scrollBy({ left: 0-wrapper.width, behavior: 'smooth' });
    wrapper.scrollTo({ left: 0, behavior: 'smooth' });
  }




  constructor(private route: ActivatedRoute,
              private titleService: Title,
              private aniListService:AniListService){
  }

  ngOnInit(): void {
    this.animeId = this.route.snapshot.paramMap.get('id')!;
    this.getInfo();
  }


  getInfo(){
    this.aniListService.getAnimeInfo(this.animeId).subscribe({
      next: (v) => {
        this.animeInfo = v;
        this.isLoading  = false;

        if(this.animeInfo){
          this.titleService.setTitle(this.animeInfo?.title.english)
        }

      },
      error: (e) => {
        console.log("Error")
        console.log(e)
      },
      complete: () => console.info('complete'),
    });
  }

  protected readonly DesignUtil = DesignUtil;
}
