import {Component, ViewChild} from '@angular/core';
import {HeaderComponent} from "../../components/header/header.component";
import {TrendingPanelComponent} from "../../components/trending-panel/trending-panel.component";
import {SearchBarComponent} from "../../components/search-bar/search-bar.component";
import {PopularPanelComponent} from "../../components/popular-panel/popular-panel.component";
import {NgIf} from "@angular/common";
import {LoadingComponent} from "../../components/loading/loading.component";
import {ErrorComponent} from "../../components/error/error.component";
import {MyCornerComponent} from "../../components/my-corner/my-corner.component";

@Component({
  selector: 'app-anime-page',
  standalone: true,
  imports: [
    HeaderComponent,
    TrendingPanelComponent,
    SearchBarComponent,
    PopularPanelComponent,
    NgIf,
    LoadingComponent,
    ErrorComponent,
    MyCornerComponent
  ],
  templateUrl: './anime-page.component.html',
  styleUrl: './anime-page.component.css'
})
export class AnimePageComponent {

  showSearchBar = false;

  showError = false;

  showSaved = false;

  setShowSearchBar(show:boolean) {
    this.showSearchBar = show;
  }

  setShowSaved(show:boolean) {
    this.showSaved  =show;
  }

  setShowError(show:boolean) {
    this.showError = show;
  }

}
