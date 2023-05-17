import {   Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ChangeDetectionStrategy} from '@angular/core';
  import * as _ from 'lodash';

import { Book,Books } from 'src/app/core/models/book-response.model';

@Component({
  selector: 'front-end-internship-assignment-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableViewComponent {
  @Input() booksList: Book[] = [];
  @Input() booksListbyTitle: Books[] = [];
  @Input() subjectName: string = '';
  @Input() isTrending: boolean = false;
  @Input() isTitle: boolean = false;
  @Input() offset: number = 0;
  @Input() limit: number = 10;
  @Input() total_books: number = 0;

  @Output() pageUpdate = new EventEmitter<Number>();
  @Output() limitUpdate = new EventEmitter<number>();
  
  page:number=1
  // sbling is  used just for condition when dots to be shown 
  siblings:number=1

  isNextButton: boolean = false;
  isPreButton: boolean = true;
  selectlimit:number=10;
  no_of_pages:number=0;
  paginationRanges:any=[];
  
  constructor() {}

  // to set the pages number on button
  //here 7 numbered button is used
  //on which two button are changed into dots conditionally
  paginationRange()
  {
    this.page=Math.ceil((this.offset+1)/this.limit);
    let totalBooksInArray=7+this.siblings;

    if(totalBooksInArray>=this.no_of_pages)
      return this.paginationRanges= _.range(1,this.no_of_pages+1)
    
    let leftSiblingIndex=Math.max(this.page - this.siblings,1)
    let rightSiblingIndex=Math.min(this.page + this.siblings,this.no_of_pages)

    let showLeftDots=leftSiblingIndex > 2
    let showRightDots=rightSiblingIndex < (this.no_of_pages-2)
  
  // adding dots conditionally 
    if(!showLeftDots && showRightDots){
        let leftItemCount=3+2*this.siblings;
        let leftRange=_.range(1,leftItemCount+1)
        return this.paginationRanges = [...leftRange,"...",this.no_of_pages]
    } else if(showLeftDots && !showRightDots){
        let rightItemCOunt=3+2*this.siblings
        let rightRange=_.range(this.no_of_pages-rightItemCOunt+1,this.no_of_pages+1)
       return this.paginationRanges= [1,"...",...rightRange]
      }else{
        let middleRange=_.range(leftSiblingIndex,rightSiblingIndex+1)
       return this.paginationRanges= [1,"...",...middleRange,"...",this.no_of_pages]
      }
  }

  // to disable/enable arrow buttons  
  setButton(){
    if((this.page)>=this.no_of_pages)    
      this.isNextButton=true;          
    if((this.page)<this.no_of_pages)    
      this.isNextButton=false;    
    if(this.page<=1)
      this.isPreButton=true
    if(this.page>1)
      this.isPreButton=false
  }

  //on limit value change
  onlimitselect($event:any){    
    this.limitUpdate.emit(parseInt($event.target.value));   
  }

  //calls when page changes takes place
  handlePageChange(value:any)
  {
    if(value==-1 || value=="...")
      this.page=1;      
    else if(value==-2)
      this.page=this.page-1
    else if(value==-3)
      this.page=this.page+1
    else if(value==-4 || value=="...")
      this.page=this.no_of_pages;
    else
      this.page=value;  
    this.setButton(); 
    this.pageUpdate.emit((this.page-1)*this.limit);
  }

  ngOnInit(): void {
    this.no_of_pages = Math.floor(this.total_books/this.limit)
    this.paginationRange();
    this.setButton();
  }
}
