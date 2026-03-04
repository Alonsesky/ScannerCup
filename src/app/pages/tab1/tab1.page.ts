import { CapacitorBarcodeScannerScanResult } from './../../../../node_modules/@capacitor/barcode-scanner/dist/esm/definitions.d';
import { NgTemplateOutlet } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSegmentButton,
  IonLabel,
  IonSegment,
  IonSegmentView,
  IonSegmentContent,
  IonGrid,
  IonCol,
  IonRow,
  IonImg,
  IonCard,
  IonCardSubtitle,
  IonCardTitle,
  IonCardHeader,
  IonIcon,
  IonItem
} from '@ionic/angular/standalone';
import { Coupon, ICouponData } from 'src/app/models/coupon.model';
import { FilterCouponCategoryPipe } from 'src/app/pipes/filter-coupon-category-pipe';
import { CouponService } from 'src/app/services/coupon.service';
import { cameraOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { CapacitorBarcodeScanner, CapacitorBarcodeScannerTypeHint } from '@capacitor/barcode-scanner';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonItem, IonIcon,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCard,
    IonImg,
    IonRow,
    IonCol,
    IonGrid,
    IonSegmentContent,
    IonSegmentView,
    IonSegment,
    IonLabel,
    IonSegmentButton,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    FilterCouponCategoryPipe,
    NgTemplateOutlet],
})
export class Tab1Page {
  private couponService: CouponService = inject(CouponService);
  public coupons:  Coupon[] = [];
  private toastService: ToastService = inject(ToastService);

  constructor() {
    addIcons({
      cameraOutline
    })
  }

  async ionViewWillEnter(){
    this.coupons = await this.couponService.getCoupons();

  }

  async changeActive(coupon: Coupon){
    coupon.active = !coupon.active
    await this.couponService.saveCoupon(this.coupons);
  }

  startCamara(){
    CapacitorBarcodeScanner.scanBarcode({
      hint: CapacitorBarcodeScannerTypeHint.QR_CODE,

    }).then((resultBarcode: CapacitorBarcodeScannerScanResult) =>{
      console.log(resultBarcode);
      if(resultBarcode.ScanResult){
        try{

          const couponData: ICouponData = JSON.parse(resultBarcode.ScanResult);
          const coupon = new Coupon(couponData);
          if(coupon.isValid()){
            const couponExists = this.coupons.some((c: Coupon) => c.isEquals(coupon));
            if(!couponExists){
              this.coupons=[
                ...this.coupons,
                coupon
              ]
              this.couponService.saveCoupon(this.coupons);
            }else{
              this.toastService.showToast('El cupón ya existe.');
            }
          }else{
            this.toastService.showToast('El cupón no es válido.');
          }

        }catch(error){
          console.error('Error:', error);
          this.toastService.showToast('El código QR no contiene datos de cupón válidos.');
        }
      }
    })
  }

}
