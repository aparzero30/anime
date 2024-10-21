import { Routes } from '@angular/router';
import {AnimePageComponent} from "./pages/anime-page/anime-page.component";
import {InfoPageComponent} from "./pages/info-page/info-page.component";

export const routes: Routes = [
  {path:'',component: AnimePageComponent},
  {path:'info/:id',component: InfoPageComponent},
  {path:'info/:id/episode/:episode-id',component: InfoPageComponent},
];
