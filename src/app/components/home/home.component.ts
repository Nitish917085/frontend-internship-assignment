import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, filter } from 'rxjs';
import { Router } from '@angular/router';
import {  BreakpointObserver,} from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'front-end-internship-assignment-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit,OnChanges {
  @ViewChild(MatSidenav)
  sidenav!:MatSidenav;

  bookSearch: FormControl;
  subject: string = '';
  title: string = '';
  titleAuthorName: string = '';
  isTitleDisplay: boolean = false;
  isCloseDisplay:boolean=false;
  initilize:boolean=true;

  constructor(private route: Router,
    public observer : BreakpointObserver) {
    this.bookSearch = new FormControl('');    

  }

  // to show sidebar according to diffrent screen size
  ngAfterViewInit() {
    this.observer.observe(["(max-width: 800px)"]).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode='over';
        this.sidenav.close();
      }else{
        this.sidenav.mode='side';
        this.sidenav.open();
      }
    });
  }

   
  //update every then when field value is changed
  getValue(val: string) {
    this.isTitleDisplay = false;    
   if (val.length>0)
      this.isCloseDisplay=true;
    else
     this.isCloseDisplay=false;

    this.title = val;
  }

  //call when hit enter or search btoon clicked
  getBooks() {
    this.initilize=false
    this.isTitleDisplay = true;
    this.titleAuthorName = this.title;
  }
  
  // function call when home button clicked on sidebar
  homePage(){
    this.initilize=true
    this.titleAuthorName=""
  }

  //clear input Field when close button clicked in search bar
  clearInputText(){
    this.bookSearch?.reset();
    this.isCloseDisplay=false;
  }

  trendingSubjects: Array<any> = [
    { name: 'JavaScript' },
    { name: 'CSS' },
    { name: 'HTML' },
    { name: 'Harry Potter' },
    { name: 'Crypto' },
  ];

  ngOnChanges(changes: SimpleChanges): void {
      
  }

  ngOnInit(): void {
    this.initilize=true;    
    this.bookSearch.valueChanges
      .pipe(debounceTime(300))
      .subscribe((value: string) => {});
  }
}
