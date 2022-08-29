import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class VariablesService {
  modalOpen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  getAllMovies: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
  ){

  }

  async toastMessage(msg: string){
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  async presentAlert(title: string, msg: string) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: msg,
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {

          },
        },
      ],
    });

    await alert.present();
    setTimeout(() => {
      alert.dismiss();
    }, 1500);
  }

  async loadingActionShow(msg: string){
    const loading = await this.loadingCtrl.create({
      message: msg,
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
  }

  async loadingActionDismiss(){
    this.loadingCtrl.dismiss();
  }

  removeCredentials(){
    localStorage.removeItem('auth');
    this.router.navigateByUrl('/welcome');
    location.reload();
  }


}
