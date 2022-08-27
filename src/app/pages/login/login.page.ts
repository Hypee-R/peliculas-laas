import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { VariablesService } from '../../services/variablesGL.service';
import { UsuarioService } from '../../services/usuario.service';
import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario = '';
  password = '';
  loading = false;
  listaUsuarios: UsuarioModel[] = [];
  constructor(
    private router: Router,
    private authService: AuthService,
    private modalCtrl: ModalController,
    private variablesGL: VariablesService,
    private usuarioService: UsuarioService,
  ) { }

  ngOnInit() {
    this.getListaUsuariosRegistrados();
  }

  getListaUsuariosRegistrados(){
    this.listaUsuarios = this.usuarioService.getListaUsuarios();
  }

  async dismiss(){
    this.modalCtrl.dismiss();
    this.variablesGL.modalOpen.next(false);
  }

  async login(){

    if(this.usuario.length > 0 && this.password.length > 0){

      if(this.listaUsuarios.length > 0){
        let existeUsuario = this.listaUsuarios.find(x => x.usuario == this.usuario && x.password == this.password);
        if(existeUsuario){

          this.authService.login(existeUsuario);
          this.dismiss();
          this.router.navigateByUrl('/home');
          this.variablesGL.presentAlert('Exito!', 'Credenciales Correctas!!');

        }else{
          this.variablesGL.presentAlert('Error!', 'Credenciales Incoreectas!!');
        }
      }else{
        this.variablesGL.toastMessage("No hay usuarios registrados!!");
      }

    }else{
      this.variablesGL.toastMessage("Todos los campos son requeridos!!");
    }

  }

}
