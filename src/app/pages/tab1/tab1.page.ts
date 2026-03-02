import { NgTemplateOutlet } from '@angular/common';
import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSegmentButton, IonLabel, IonSegment, IonSegmentView, IonSegmentContent, IonGrid, IonCol, IonRow, IonImg, IonCard, IonCardSubtitle, IonCardTitle, IonCardHeader } from '@ionic/angular/standalone';
import { Coupon } from 'src/app/models/coupon.model';
import { FilterCouponCategoryPipe } from 'src/app/pipes/filter-coupon-category-pipe';
import { CouponService } from 'src/app/services/coupon.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [
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

  constructor() {}

  async ionViewWillEnter(){
    this.coupons = await this.couponService.getCoupons();

  }

  async changeActive(coupon: Coupon){
    coupon.active = !coupon.active
    await this.couponService.saveCoupon(this.coupons);
  }

}
