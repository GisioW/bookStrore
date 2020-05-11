import { Component } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bookStrore';
  constructor() {
    const firebaseConfig = {
      apiKey: 'AIzaSyBMM2yifGpVthAqRnvFpHqSX9ROkeLFaNs',
      authDomain: 'bookstrore-53f79.firebaseapp.com',
      databaseURL: 'https://bookstrore-53f79.firebaseio.com',
      projectId: 'bookstrore-53f79',
      storageBucket: 'bookstrore-53f79.appspot.com',
      messagingSenderId: '298444939214',
      appId: '1:298444939214:web:41e792adef446b8db0d59f',
      measurementId: 'G-31SG9GSLFP'
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

  }
}
