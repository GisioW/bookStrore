import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  /**
   * Creation d'un utilisateur.
   * @param email. Email valide
   * @param password. Mot de passe, il doit être égale ou supérieur à 6 caractères selon la recommandation
   * de Firebase
   */
  createNewUser(email: string, password: string){
    return new Promise(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  /**
   * Permet la connexion de l'utilisateur s'il est déjà enregistré dans la base de données
   * @param email. Email valide de l'utilisateur
   * @param password. Mot de passe de l'utilisateur correspondant au compte
   */
  singInUser(email: string, password: string){
    return new Promise(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  /**
   * Permet la deconnexion à la base de données
   */
  singOutUser(){
    firebase.auth().signOut();
  }
}
