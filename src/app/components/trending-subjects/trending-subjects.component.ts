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

  isLoader=true;
  subjectName: string = '';
  allBooks: Book[] = [];
  isTrending: boolean = false;
  isTitle: boolean = true;
  loaderId:string="loader";
  total_books:number=0;


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
    this.subjectsService.getAllBooks(this.subjectName).subscribe((data) => {
        this.allBooks = data?.works;
        this.total_books=data?.work_count;  
        this.ngxService.stopBackgroundLoader(this.loaderId);  
        this.isLoader=false; 
      });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.subjectName = params.get('name') || '';
      this.getAllBooks();
    });
  }

}
