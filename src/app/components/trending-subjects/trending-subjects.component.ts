import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SubjectsService } from '../../core/services/subjects.service';
import { Book } from 'src/app/core/models/book-response.model';
import { NgxUiLoaderService } from "ngx-ui-loader";

@Component({
  selector: 'front-end-internship-assignment-trending-subjects',
  templateUrl: './trending-subjects.component.html',
  styleUrls: ['./trending-subjects.component.scss'],
})
export class TrendingSubjectsComponent implements OnInit {

  isLoader: boolean = true;
  subjectName: string = '';
  allBooks: Book[] = [];
  isTrending: boolean = false;
  isTitle: boolean = true;
  total_books:number=0;
  offset: number = 10;
  limit: number = 10;
  loaderId:string="loader"


  constructor(private ngxService: NgxUiLoaderService,
    private route: ActivatedRoute,
    private subjectsService: SubjectsService
  ) {}

  
  getAllBooks() {
    this.isLoader=true;
    this.isTrending = true;
    this.ngxService.start();
    this.ngxService.startBackgroundLoader(this.loaderId)
    this.isTitle = false;
    this.subjectsService.getAllBooks(this.subjectName, this.offset, this.limit).subscribe((data) => {
        this.allBooks = data?.works;
        this.total_books=data?.work_count;  
        this.ngxService.stopBackgroundLoader(this.loaderId);  
        this.isLoader=false; 
      });
  }

  public pageUpdate($event: any): void {
    this.offset = $event;
    this.getAllBooks();
  }

  public limitUpdate($event:number):void {
    this.limit=$event;
    this.getAllBooks();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.subjectName = params.get('name') || '';
      this.limit = 10;
      this.offset = 0;
      this.isLoader = true;
      this.getAllBooks();
    });
  }

}
