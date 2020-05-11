import {Component} from '@angular/core';

@Component({
  template: `
    <div class="alert alert-danger text-center">
        <h3>Erreur: 404</h3>
        <p> Page non trouvé</p>
        <button routerLink="books" class="btn btn btn-secondary">Retour</button>
    </div>`
})
export class PageNotFoundComponent {

}
