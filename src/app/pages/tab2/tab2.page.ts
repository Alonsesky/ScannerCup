import { Component, inject } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonCol,
  IonRow,
  IonText } from '@ionic/angular/standalone';

import { QRCodeComponent } from 'angularx-qrcode';
import { Coupon } from 'src/app/models/coupon.model';
import { CouponService } from 'src/app/services/coupon.service';
import { GetBrightnessReturnValue, ScreenBrightness } from '@capacitor-community/screen-brightness'
import { Platform } from '@ionic/angular';
import { App } from '@capacitor/app';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonText, IonRow, IonCol, IonGrid, IonHeader, IonToolbar, IonTitle, IonContent, QRCodeComponent]
})
export class Tab2Page {

  private couponservice: CouponService = inject(CouponService);
  public QRCode!: string;
  private currentBrightness!:GetBrightnessReturnValue;
  private platform = inject(Platform);

  constructor() {}

  async ionViewWillEnter(){

    if(!this.platform.is('desktop')){
      this.currentBrightness = await ScreenBrightness.getBrightness();
      this.setMaxBrightness();

      if(this.platform.is('ios')){
          App.addListener('appStateChange', (state) => {
            if (state.isActive) {
              this.setMaxBrightness();
            } else {
              this.restoreBrightness();
            }
        })
      }
    }


    const coupons: Coupon[] = await this.couponservice.getCoupons();
    const couponsActive: Coupon[] = coupons.filter((coupon:Coupon)=> coupon.active);

    if(couponsActive.length>0){
      this.QRCode = JSON.stringify(couponsActive);
    } else {
      this.QRCode = '';
    }

  }

  ionViewDidLeave(){
    if(!this.platform.is('desktop')){
      this.restoreBrightness();
      App.removeAllListeners();
    }
  }

  setMaxBrightness(){
    ScreenBrightness.setBrightness({ brightness: 1 });

  }

  restoreBrightness(){
    ScreenBrightness.setBrightness({
        brightness: this.currentBrightness.brightness });
  }

}
