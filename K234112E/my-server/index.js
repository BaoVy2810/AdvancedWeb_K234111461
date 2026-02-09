const express=require("express")
const app=express()
const port=3000
const morgan=require("morgan")
app.use(morgan("combined"))
//create default API
app.get("/",(req,res)=>{
    res.send("Xin chào quý khách!")
})
app.listen(port,()=>{
    console.log(`My server is starting at port = ${port}`)
})

const cors=require("cors")
app.use(cors())

const bodyParser=require("body-parser")
app.use(bodyParser.json())

const path=require("path")
app.use("/static",express.static(path.join(__dirname,"public")))

let database=[
    {"BookId":"b1","BookName":"Kỹ thuật lập trình cơ bản","Price":70,"Image":"b1.png"},
    {"BookId":"b2","BookName":"Kỹ thuật lập trình nâng cao","Price":100,"Image":"b2.png"},
    {"BookId":"b3","BookName":"Máy học cơ bản","Price":200,"Image":"b3.png"},
    {"BookId":"b4","BookName":"Máy học nâng cao","Price":300,"Image":"b4.png"},
    {"BookId":"b5","BookName":"Lập trình Robot cơ bản","Price":250,"Image":"b5.png"},
    ]
app.get("/books",cors(),(req,res)=>{
    res.send(database)
})
//exercise 40
app.get("/books/:id",cors(),(req,res)=>{
    const id=req.params["id"]
    const p=database.find(x=>x.BookId==id)
    res.send(p || {})
})
//exercise 42
app.post("/books",cors(),(req,res)=>{
    // console.log(req.body)
    // res.send("Server received your data, Your data:"+req.body)

    //put json book into database
    database.push(req.body);
    //send message to client(send all database to client)
    res.send(database)
})

//exercise 44
app.put("/books",cors(),(req,res)=>{
    const book=database.find(x=>x.BookId==req.body.BookId)
    if(book!=null)
    {
        book.BookName=req.body.BookName
        book.Price=req.body.Price
        book.Image=req.body.Image
    }
    res.send(database)
})

//exercise 44 - DELETE
app.delete("/books/:id",cors(),(req,res)=>{
    const id=req.params["id"]
    const idx=database.findIndex(x=>x.BookId==id)
    if(idx>=0){
        database.splice(idx,1)
    }
    res.send(database)
})

//exercise50
let BookInfo=[
    {"BookId":"info1","BookName":"Giáo trình tin học cơ bản","BookPrice":26000.00,"BookDescription":"Nội dung của cuốn: Tin Học Cơ Bản Windows XP gồm có 7 chương: Chương 1: Một số vấn để cơ bản. Chương 2: Sử dụng nhanh thanh công cụ và thanh thực đơn trong My Computer và Windows Explorer. Chương 3: Các thao tác trong windows XP. Chương 4: Các thiết lập trong Windows XP. Chương 5: Bảo trì máy tinh. Chương 6: Các phim tắt Chương 7: Hỏi và đáp các thắc mắc. Xin trân trọng giới thiệu cuốn sách cùng bạn",
        "BookPicture":"THCB.jpg","PublishDate":"25/10/2024 12:00:00 SA", "BookQuantity":120, "BookCategoryID":7, "BookPublisherID":1},
    {"BookId":"info2","BookName":"Giáo trình Cơ Sở Dữ Liệu Với Visual Basic 2005 Và ADO.NET 2.0","BookPrice":12000.00,"BookDescription":"Cuốn sách này gồm 3 phần sau: Phần 1: Xử lý văn bản trong Microsoft thiệu các nội dung sau: Chương 1: Căn bản về cơ sở dữ liệu. Chương 2: Các bộ kết nối và tương tác dữ liệu. Chương 3: Bộ chứa dữ liệu DataSet. Chương 4: Bộ điều hợp dữ liệu DataAdapter. Chương 5: Sử dụng các điều khiến ràng buộc dữ liệu. Chương 6: Tạo báo cáo với Crystal Report. Chương 7: ADO.NET và XML. Xin trân trọng giới thiệu cùng các bạn.",
        "BookPicture":"TH004.jpg","PublishDate":"23/10/2013 12:00:00 SA", "BookQuantity":25, "BookCategoryID":3, "BookPublisherID":2},
    {"BookId":"info3","BookName":"Visual Basic 2005 Tập 3, Quyền 2: Lập Trình Web","BookPrice":20000.00,"BookDescription":"'Visual Basic 2005 Tập 3, Quyển 2: Lập Trình Web Với Cơ Sở Dữ Liệu' sẽ cung cấp kỹ thuật và hướng dẫn bạn: Tự học xây dựng ứng dụng Web quản lý CSDL toàn diện với ADO.NET 2.0 và ASP.NET. Khai thác các đổi tượng và nguồn dữ liệu dành cho WebForm. Sử dụng các điều khiên dữ liệu đặc thủ dành riêng cho ASP.NET và Web. Làm quen với những khái niệm xử lý dữ liệu hoàn toàn mới. Ràng buộc dữ liệu với các thành phần giao diện Web Forms. Thiết kể ứng dụng Web 'Quản lý CD Shop' trực quan và thực tế. Cung cấp một kiến thức hoàn chỉnh về Web cho các bạn yêu thích ngôn ngữ Visual Basic và .NET Framework. Sách có kèm theo CD-ROM bài tập.",
        "BookPicture":"LTWeb2005.jpg","PublishDate":"15/09/2014 12:00:00 SA", "BookQuantity":240, "BookCategoryID":8, "BookPublisherID":4}
]
app.get("/bookinfo",cors(),(req,res)=>{
    res.send(BookInfo)
})
app.get("/bookinfo/:id",cors(),(req,res)=>{
    const id = req.params.id;
    const p = BookInfo.find(x => x.BookId === id);
    res.send(p || {});
})
app.post("/bookinfo",cors(),(req,res)=>{
    const body = req.body;
    if (!body.BookId) body.BookId = "info" + (BookInfo.length + 1);
    BookInfo.push(body);
    res.send(BookInfo)
})
app.put("/bookinfo",cors(),(req,res)=>{
    const book = BookInfo.find(x => x.BookId === req.body.BookId);
    if (book) {
        Object.assign(book, req.body);
    }
    res.send(BookInfo)
})
app.delete("/bookinfo/:id",cors(),(req,res)=>{
    const id = req.params.id;
    const idx = BookInfo.findIndex(x => x.BookId === id);
    if (idx >= 0) BookInfo.splice(idx, 1);
    res.send(BookInfo)
})


