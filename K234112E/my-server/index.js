const express=require("express")
const app=express()
const port=3000
//create default API
app.get("/",(req,res)=>{
    res.send("Xin chào quý khách!")
})
app.listen(port,()=>{
    console.log(`My server is starting at port = ${port}`)
})
