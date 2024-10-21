import {Component, Input} from '@angular/core';
import {Character} from "../../models/AnimeInfo";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-character-wrapper',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './character-wrapper.component.html',
  styleUrl: './character-wrapper.component.css'
})
export class CharacterWrapperComponent {

   @Input() characters!:Character[]|undefined;

}
