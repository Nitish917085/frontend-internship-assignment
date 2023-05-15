import { Component, OnInit,Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SubjectsService } from '../../core/services/subjects.service';
import { Books,Book } from 'src/app/core/models/book-response.model';
import { NgxUiLoaderService } from "ngx-ui-loader";

@Component({
  selector: 'front-end-internship-assignment-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss'],
})
export class SubjectsComponent implements OnChanges {
  @Input() title:string ="";

  titleAuthorName: string = '';
  allBooksbytitle: Books[] = [];
  loaderId:string="loader"
  total_books:number=0;
  
  isLoader=true;
  offset:number=0;
  limit:number=10;
  lengths:number=0;

  constructor(private ngxService: NgxUiLoaderService,
    private route: ActivatedRoute,
    private subjectsService: SubjectsService
  ) {

  }

  //modifying parameter by replacing "+" with spaces as per subject api requirements 

  changeSubName(){    
    let txt:string[]=this.titleAuthorName.split(' ');
    let count:number=1;
    let text:string="";
    txt.map((item)=>{
           if(count)
               {
                 text=item;
                 count=0;
               }
               else text=text + "+" + item;
           })     
  }

  getAllBooksByNameAuthor() {
    this.isLoader=true;
    this.ngxService.startBackgroundLoader(this.loaderId)

    //calling api service and updating variables
    this.subjectsService.getAllBooksByNameAuthor(this.titleAuthorName,this.offset,this.limit).subscribe((data) => {      
            console.log(data)
            this.allBooksbytitle = data?.docs;
            this.total_books=data?.numFound;
            this.lengths=this.allBooksbytitle.length;            
            this.isLoader=false; 
            this.ngxService.stopBackgroundLoader(this.loaderId);            
    });     
  }

  //any parameter changes reload the page

  ngOnChanges(): void {   
      this.titleAuthorName = this.title;    
      this.changeSubName();
      this.isLoader = true; 
      this.limit=10;
      this.offset=0;   
      this.getAllBooksByNameAuthor();
  }
}
