export interface IBook{
    BookId:string,
    BookName:string,
    Price:number,
    Image:string
}
export class Book{
    constructor(
        public BookId:string="",
        public BookName:string="",
        public Price:number=0,
        public Image:string="")
    {}
}
export interface IBookInformation {
    BookId:string,
    BookName: string;
    BookPrice: number;
    BookDescription: string;
    BookPicture: string;
    PublishDate: string;
    BookQuantity: number;
    BookCategoryID: number;
    BookPublisherID: number;
}
export class BookInformation{
    constructor(
        public BookId:string="",
        public BookName: string = "",
        public BookPrice: number = 0,
        public BookDescription: string = "",
        public BookPicture: string = "",
        public PublishDate: string = "",
        public BookQuantity: number = 0,
        public BookCategoryID: number = 0,
        public BookPublisherID: number = 0)
    {}
}