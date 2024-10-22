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
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgClass,
    NgIf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements AfterViewInit {





  trendingActive = true;
  searchActive = false;
  popularActive = false;

  @Output() toggleSearch = new EventEmitter();

  @ViewChild('trending', { static: true }) trendingRef!: ElementRef;
  @ViewChild('search', { static: true }) searchRef!: ElementRef;
  @ViewChild('popular', { static: true }) popularRef!: ElementRef;
  @ViewChild('highlight', { static: true }) highlightRef!: ElementRef;


  // ngOnInit(): void {
  //   this.setTrendingActive();
  // }
  ngAfterViewInit(): void {
    // if(this.trendingActive) {
    //   this.setTrendingActive()
    // }
    // else if(this.popularActive){
    //   this.setPopularActive()
    // }
    // else{
    //   this.setSearchActive()
    // }
    this.setPopularActive();
  }

  @HostListener('window:resize')
  onResize() {
    if(this.trendingActive) {
      this.setTrendingActive()
    }
    else if(this.popularActive){
      this.setPopularActive()
    }
    else{
      this.setSearchActive()
    }

  }



  setTrendingActive(){

    if(this.trendingRef){
      this.moveHighlight(this.trendingRef.nativeElement)
    }
    else{
      console.log("NOT YET BEEN RENDERED")
    }


    this.trendingActive = true;
    this.searchActive = false;
    this.popularActive = false;
    this.toggleSearch.emit(false);
  }


  setSearchActive(){
    this.moveHighlight(this.searchRef.nativeElement)
    this.trendingActive = false;
    this.searchActive = true;
    this.popularActive = false;
    this.toggleSearch.emit(true);

  }

  setPopularActive(){
    this.moveHighlight(this.popularRef.nativeElement)
    this.trendingActive = false;
    this.searchActive = false;
    this.popularActive = true;
    this.toggleSearch.emit(false);

  }


  moveHighlight(element: HTMLElement) {
    const highlightElement = this.highlightRef.nativeElement;
    const rect = element.getBoundingClientRect();
    console.log(rect);
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
