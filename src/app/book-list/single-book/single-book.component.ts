import { Component, OnInit } from '@angular/core';
import {IBook} from '../../models/book.model';
import {ActivatedRoute, Router} from '@angular/router';
import {BooksService} from '../../services/books.service';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.css']
})
export class SingleBookComponent implements OnInit {

  book: IBook;

  constructor(private route: ActivatedRoute,
              private booksService: BooksService,
              private router: Router) { }

  ngOnInit(): void {
    this.book = {
      titre: '',
      auteur: ''
    };
    const id = this.route.snapshot.params.id;
    this.booksService.getBook(+id).then(
      (book: IBook) => {
        this.book = book;
      }
    );
  }

  onBack(): void {
    this.router.navigate(['/books']);
  }
}
