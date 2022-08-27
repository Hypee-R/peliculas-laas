import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { VariablesService } from '../../services/variablesGL.service';
import { Usuario, UsuarioModel } from '../../models/usuario.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  loading = false;
  loadingData = true;
  dataUsuario: Usuario;
  nombreCompleto = '';
  usuario = '';
  contrasena = '';
  listaUsuarios: UsuarioModel[] = [];
  constructor(
    public router: Router,
    public modalCtrl: ModalController,
    public variablesGL: VariablesService,
    public usuarioService: UsuarioService,
  ) {
    this.getDataUsuario();
    this.getListaUsuariosRegistrados();
  }

  ngOnInit() {
  }

  getDataUsuario(){
    this.usuarioService.getDataUsuario().subscribe(response => {
      this.dataUsuario = response;
      console.log('usuario ', response);
      this.nombreCompleto = response.nameComplete;
      this.usuario = response.login.username;
      this.contrasena = response.login.password;
      this.loadingData = false;
    },
    err => {
      console.log('Error al obtener los usuarios');
      this.loadingData = false;
    })
  }

  getListaUsuariosRegistrados(){
    this.listaUsuarios = this.usuarioService.getListaUsuarios();
  }

  async guardar(){

    if(this.nombreCompleto.length > 0 && this.usuario.length > 0 && this.contrasena.length > 0){

      let newUser: UsuarioModel = {
        nombreCompleto: this.nombreCompleto,
        usuario: this.usuario,
        password: this.contrasena,
        fechaRegistro: new Date()
      }

      this.listaUsuarios.push(newUser);
      this.usuarioService.setListaUsuarios(this.listaUsuarios);
      this.variablesGL.presentAlert('Exito!', '¡Usuario registrado correctamente!');
      this.dismiss();
    }else{
      this.variablesGL.toastMessage("Todos los campos son requeridos!!");
    }

  }

  async dismiss(){
    this.modalCtrl.dismiss();
    this.variablesGL.modalOpen.next(false);
  }

}
