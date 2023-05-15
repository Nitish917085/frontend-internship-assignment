import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';
import { BookResponse,BookResponseByTitle} from 'src/app/core/models/book-response.model';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {

  constructor(private apiService: ApiService) {}

  getAllBooks(subjectName: string): Observable<BookResponse> {
    const limit = 10;
    return this.apiService.get(`/subjects/${subjectName.toLowerCase().split(' ').join('_')}.json?limit=${limit}`);
  }

  getAllBooksByNameAuthor(titleAuthorName: string, offset: number, limit: number): Observable<BookResponseByTitle> {
    console.log("fetching")
    return this.apiService.get(`/search.json?q=${titleAuthorName}&limit=${limit}&offset=${offset}`);
  }
}
