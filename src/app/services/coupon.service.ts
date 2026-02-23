import { Injectable } from '@angular/core';
import { Coupon, ICouponData } from '../models/coupon.model';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class CouponService {

  private readonly KEY_COUPS = 'ddr_key_coupons';

  async getCoupons(){

    const couponData: ICouponData[] | null = await this.recoverCupons();

    if(couponData){
      return this.processCoupons(couponData);
    }

    return fetch('./assets/data/coupons.json').then(async(res: Response)=>{
      const couponsData: ICouponData[] = await res.json();
      const coupons: Coupon[] = this.processCoupons(couponsData);

      coupons.forEach(coupons => coupons.active = false);

      return coupons;
    }).catch(err =>{
      return [];
    })
  }

  private processCoupons(couponsData: ICouponData[]){
    const coupons: Coupon[] = [];
    for(const couponData of couponsData){
      const coupon = new Coupon(couponData);
      coupons.push(coupon);
    }
    return coupons;
  }

  saveCoupon(coupons: Coupon[]){
    const couponData: ICouponData[] = coupons.map((coupon:Coupon) => coupon.toCouponData());
    Preferences.set({
      key:'ddr_key_coupons',
      value: JSON.stringify(couponData)
    })
  }

  private async recoverCupons(){


    const couponsPreference = await Preferences.get({
      key:this.KEY_COUPS
    });
    if(couponsPreference.value){
      return JSON.parse(couponsPreference.value) as
      ICouponData[];

    }
    return null;
  }

}
