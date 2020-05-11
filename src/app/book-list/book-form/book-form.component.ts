import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BooksService} from '../../services/books.service';
import {Router} from '@angular/router';
import {IBook} from '../../models/book.model';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {

  bookForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;

  constructor(private formBuilder: FormBuilder,
              private booksService: BooksService,
              private router: Router) { }

  ngOnInit(): void {
    this.intForm();
  }

  intForm(): void {
    this.bookForm = this.formBuilder.group({
      titre: ['', Validators.required],
      auteur: ['', Validators.required],
      photo: ''
    });
  }

  onSaveBook(){
    const title = this.bookForm.get('titre').value;
    const author = this.bookForm.get('auteur').value;
    const photos = this.bookForm.get('photo').value;
    const newBook: IBook = {
      titre: title,
      auteur: author,
    };
    this.booksService.createNewBook(newBook);
    this.router.navigate(['/books']);
  }

  onUploadFile(file: File){
    this.fileIsUploading = true;
    this.booksService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    );
  }

  detecteFiles(event){
    this.onUploadFile(event.target.files[0]);
  }

}
