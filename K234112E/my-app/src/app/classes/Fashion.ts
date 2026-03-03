export class Fashion {
  constructor(
    public _id: any = null,
    public style: string = '',
    public fashion_subject: string = '',
    public fashion_detail: string = '',
    public fashion_image: string = '',
  ) {}
}
export interface IFashion {
    _id: string;
    style: string;
    fashion_subject: string;
    fashion_detail: string;
    fashion_image: string;
}