import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { VariablesService } from '../../services/variablesGL.service';
import { LoginPage } from '../login/login.page';
import { RegisterPage } from '../register/register.page';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  public modalIsOpen: boolean;
  constructor(
    public modalCtrl: ModalController,
    public variablesGL: VariablesService,
  ) {
    variablesGL.modalOpen.subscribe(value => {
      this.modalIsOpen = value;
    });
  }

  ngOnInit() {
  }

  async showLogin(){
    const modal = await this.modalCtrl.create({
      component: LoginPage,
      animated: true,
      mode: 'ios',
      backdropDismiss: false,
      cssClass: 'login-modal',
    });
    this.variablesGL.modalOpen.next(true);
    return await modal.present();
  }

  async showRegister(){
    const modal = await this.modalCtrl.create({
      component: RegisterPage,
      animated: true,
      mode: 'ios',
      backdropDismiss: false,
      cssClass: 'login-modal',
    });
    this.variablesGL.modalOpen.next(true);
    return await modal.present();
  }

}
