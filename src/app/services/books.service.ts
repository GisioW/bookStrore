import { Injectable } from '@angular/core';
import {IBook} from '../models/book.model';
import {Subject} from 'rxjs/Subject';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;
@Injectable({
  providedIn: 'root'
})
export class BooksService {
  books: IBook[] = [];
  // @ts-ignore
  booksSubject = new Subject<IBook[]>();

  constructor() {
    this.geBooks();
  }

  emitBook(): void {
    this.booksSubject.next(this.books);
  }

  saveBooks(){
    console.log('le des données enregistré' + JSON.stringify(this.books));
    firebase.database().ref('/books').set(this.books);
  }

  geBooks(){
    firebase.database().ref('/books').on('value', (data: DataSnapshot) => {
      this.books = data.val() ? data.val() : [];
      this.emitBook();
    });
  }

  getBook(id: number){
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/books' + id).once('value').then(
          (data) => {
            resolve(data.val());
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createNewBook(book: IBook){
    console.log('En registrement du livre ' + JSON.stringify(this.books));
    this.books.push(book);
    this.saveBooks();
    this.emitBook();
  }

  removeBook(book: IBook){
    const indexToRemove = this.books.findIndex(
      (bookEL) => {
        if (bookEL === book){
          return true;
        }
      }
    );
    this.books.splice(indexToRemove, 1);
    this.saveBooks();
    this.emitBook();
  }

  uploadFile(file: File){
    return new Promise(
      (resolve, reject) => {
        const uniqueFile = Date.now().toString();
        const upload = firebase.storage().ref().child('images/' + uniqueFile + file.name).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
              console.log('Chargement...');
            },
            (error) => {
              console.log('Erreur de chargement! : ' + error);
              reject();
            },
            () => {
              resolve(upload.snapshot.ref.getDownloadURL());
            }
          );
      }
    );
  }
}
