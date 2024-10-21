import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass, NgForOf} from "@angular/common";

@Component({
  selector: 'app-page-control',
  standalone: true,
  imports: [
    NgForOf,
    NgClass
  ],
  templateUrl: './page-control.component.html',
  styleUrl: './page-control.component.css'
})
export class PageControlComponent {

  @Input() maxPageSize!:number;
  @Input() currentPage!:number;
  @Input() selectedPage!:number;


  @Output() public changePage = new EventEmitter();

  setCurrentPage(page: number) {
    this.selectedPage = page;
    this.changePage.emit(page)
  }

}
