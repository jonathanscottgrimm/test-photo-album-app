import { Component, OnInit } from '@angular/core';
import { PhotoService } from './services/photo.service';
import { Album } from './models/album';
import { Photo } from './models/photo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  albums: Album[] = [];

  constructor(private photoService: PhotoService) {}

  ngOnInit(): void {
    this.photoService.getAllPhotos().subscribe((photos: Photo[]) => {
      const albumMap: { [albumId: number]: Album } = {};

      photos.forEach((photo) => {
        if (!albumMap[photo.albumId]) {
          albumMap[photo.albumId] = { albumId: photo.albumId, photos: [] };
        }
        albumMap[photo.albumId].photos.push(photo);
      });

      this.albums = Object.values(albumMap);
    });
  }
}
