import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Photo } from '../models/photo';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/photos';

  constructor(private http: HttpClient) {}

  getAllPhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error fetching photos:', error);
        return throwError(
          () => new Error('Error fetching photos. Please try again later.')
        );
      })
    );
  }
}
