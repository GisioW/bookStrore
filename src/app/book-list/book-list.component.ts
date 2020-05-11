import {Component, OnDestroy, OnInit} from '@angular/core';
import {IBook} from '../models/book.model';
import {Subject, Subscription} from 'rxjs';
import {BooksService} from '../services/books.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, OnDestroy {

  books: IBook[];
  bookSubscription: Subscription;

  constructor(private booksService: BooksService, private router: Router) { }


  ngOnInit(): void {
    this.bookSubscription = this.booksService.booksSubject.subscribe(
      (books) => {
        console.log(JSON.stringify(books));
        this.books = books;
      }
    );
    this.booksService.emitBook();
  }

  onNewBook(){
    this.router.navigate(['/books', 'news']);
  }

  onDeleteBook(book: IBook){
    this.booksService.removeBook(book);
  }

  onViewBook(id: number){
    this.router.navigate(['/books', id, 'view']);
  }

  ngOnDestroy(): void {
    this.bookSubscription.unsubscribe();
  }





}
