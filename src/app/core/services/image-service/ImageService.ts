import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  getImageElement(base64Image: string): string {
    return `data:image/jpg;base64,${base64Image}`;
  }
}
