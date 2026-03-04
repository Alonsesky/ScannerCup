import { inject, Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular/standalone';


@Injectable({
  providedIn: 'root',
})
export class ToastService {

  private toastController: ToastController = inject(ToastController);

  async showToast(
    message: string,
    duration: number = 2000,
    position: 'top' | 'bottom' | 'middle' = 'bottom') {
    const toast = await this.toastController.create({
      message,
      duration,
      position,
    });
    await toast.present();
  }

}
