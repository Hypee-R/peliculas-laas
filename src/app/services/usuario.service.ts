import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Usuario, UsuarioModel } from '../models/usuario.model';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    public http: HttpClient
  ){}

  getDataUsuario(){
    return this.http.get('https://randomuser.me/api')
                    .pipe(
                      map( (resp: any) => {
                        let respuesta: Usuario = resp.results[0];
                        respuesta.nameComplete = respuesta.name.title + ' ' + respuesta.name.first + ' ' + respuesta.name.last;
                        return respuesta;
                      })
                    );
  }

  getListaUsuarios(){
    let listaUsuarios: UsuarioModel[] = [];
    let list: UsuarioModel[] = JSON.parse(localStorage.getItem('usuarios'));
    if(list && list?.length > 0){
      listaUsuarios = list;
    }
    return listaUsuarios;
  }

  setListaUsuarios(listaUsuarios: UsuarioModel[]){
    localStorage.removeItem('usuarios');
    localStorage.setItem('usuarios', JSON.stringify(listaUsuarios));
  }

}
