export interface ICouponData {
  idProduct: number;
  img:string;
  name: string;
  category: string;
  discount: number;
  active?: boolean;

}

export class Coupon {

  private _idProduct!: number;

  private _img!: string;

  private _name!: string;

  private _category!: string;

  private _discount!: number;

  private _active?: boolean | undefined;


  constructor(data:ICouponData){
    Object.assign(this, data);
  }


  public get idProduct(): number {
    return this._idProduct;
  }
  public set idProduct(value: number) {
    this._idProduct = value;
  }

   public get img(): string {
    return this._img;
  }
  public set img(value: string) {
    this._img = value;
  }

  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
  }

  public get category(): string {
    return this._category;
  }
  public set category(value: string) {
    this._category = value;
  }

  public get discount(): number {
    return this._discount;
  }
  public set discount(value: number) {
    this._discount = value;
  }

  public get active(): boolean | undefined {
    return this._active;
  }
  public set active(value: boolean | undefined) {
    this._active = value;
  }

  isEquals(coupon: Coupon){
    return this._idProduct == coupon.idProduct;
  }

  isValid(){
    return !!(this.idProduct && this.name && this.discount && this.category);
  }

  toCouponData(){
    return {
      idProduct: this.idProduct,
      img: this.img,
      name: this.name,
      category: this.category,
      discount: this.discount,
      active: this.active,
    } as ICouponData
  }

}
