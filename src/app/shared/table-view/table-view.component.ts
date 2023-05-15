import { Component, Input } from '@angular/core';
import { Book,Books } from 'src/app/core/models/book-response.model';

@Component({
  selector: 'front-end-internship-assignment-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss'],
})
export class TableViewComponent {
  @Input() booksList: Book[] = [];
  @Input() booksListbyTitle: Books[] = [];
  @Input() subjectName: string = '';
  @Input() isTrending: boolean = false;
  @Input() isTitle: boolean = false;
  @Input() total_books: number = 0;
}
