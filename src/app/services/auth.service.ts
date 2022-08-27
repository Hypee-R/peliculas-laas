import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(){}

  isAuthenticated(){
    const userLogeado = JSON.parse(localStorage.getItem('auth'));
    if(userLogeado)
      return true;
    else
      return false;
  }

  login(usuario: UsuarioModel){
    localStorage.removeItem('auth');
    localStorage.setItem('auth', JSON.stringify(usuario));
  }

}
