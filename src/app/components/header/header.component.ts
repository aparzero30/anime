import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {NgClass, NgIf, NgStyle} from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    NgStyle
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {





  animeActive = true;
  searchActive = false;
  savedActive = false;


  @Output() toggleSearch = new EventEmitter();
  @Output() toggleSave = new EventEmitter();

  @ViewChild('anime', { static: true }) animeRef!: ElementRef;
  @ViewChild('search', { static: true }) searchRef!: ElementRef;
  @ViewChild('saved', { static: true }) savedRef!: ElementRef;
  @ViewChild('highlight', { static: true }) highlightRef!: ElementRef;


  // ngOnInit(): void {
  //   this.setTrendingActive();
  // }
  // ngAfterViewInit(): void {
  //   if(this.trendingActive) {
  //     this.setTrendingActive()
  //   }
  //   else if(this.popularActive){
  //     this.setPopularActive()
  //   }
  //   else{
  //     this.setSearchActive()
  //   }
  // }

  @HostListener('window:resize')
  onResize() {
    if(this.animeActive) {
      this.setAnimeActive()
    }
    else if(this.savedActive){
      this.setSaveActive()
    }
    else{
      this.setSearchActive()
    }

  }



  setAnimeActive(){


    this.animeActive = true;
    this.searchActive = false;
    this.savedActive = false;
    this.toggleSearch.emit(false);
    this.toggleSave.emit(false);

    this.moveHighlight(this.animeRef.nativeElement)

  }


  setSearchActive(){

    this.searchActive = true;
    if(this.animeRef){
      this.moveHighlight(this.animeRef.nativeElement)
    }

    this.moveHighlight(this.searchRef.nativeElement)

    this.animeActive = false;

    this.savedActive = false;
    this.toggleSearch.emit(true);
    this.toggleSave.emit(false);


  }

  setSaveActive(){
    if(this.animeRef){
      this.moveHighlight(this.animeRef.nativeElement)
    }

    this.moveHighlight(this.savedRef.nativeElement)
    this.animeActive = false;
    this.searchActive = false;
    this.savedActive = true;
    this.toggleSearch.emit(false);
    this.toggleSave.emit(true);


  }


  moveHighlight(element: HTMLElement) {
    const highlightElement = this.highlightRef.nativeElement;
    const rect = element.getBoundingClientRect();
    highlightElement.style.position = 'absolute'; // Ensure the highlight is positioned correctly
    highlightElement.style.top = `${rect.top}px`;
    highlightElement.style.left = `${rect.left}px`;
    highlightElement.style.width = `${rect.width}px`;
    highlightElement.style.height = `${rect.height}px`;
    highlightElement.style.minHeight = `${rect.height}px`; // Corrected camelCase
    highlightElement.style.minWidth = `${rect.width}px`; // Corrected camelCase
    highlightElement.style.maxHeight = `${rect.height}px`; // Corrected camelCase
    highlightElement.style.maxWidth = `${rect.width}px`; // Corrected camelCase
    highlightElement.style.backgroundColor = 'var(--primary-color)';
    highlightElement.style.display = 'block';
  }









}
