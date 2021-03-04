const express = require('express')
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId
const app = express()

app.use(express.json())
// let books = [] //arry ตั้งแต่0->n-1 << before mongodb

const url = 'mongodb+srv://superadmin:23479.naruto@cluster0.wm519.mongodb.net/mbooks?retryWrites=true&w=majority'
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true })
let db,bookscollection

async function connect(){
    await client.connect()
    db = client.db('mbooks')
    bookscollection = db.collection('books')
}
connect()

app.get('/books', async (req, res) => {
    //input*

    //process*
    const cursor = await bookscollection.find({})
    const result = await cursor.toArray()

    //output*
    res.status(200).json(result)
})


app.get('/books/:id', async (req, res) =>{
    //input*
    let id = req.params.id
    // console.log(`id: ${id}`) <<เช็คว่า id ออกมาไหม
    //  let book = {} //<<ประกาศเป็น object << before mongodb
    
    //process*
    // book = books[id] //<< before
    const book = await bookscollection.findOne({ _id: ObjectId(id)})

    //output*
    res.status(200).json(book)

})
//POST /`movies`
//npm install --save-prod express <<ติดตั้ง express แบบ production
//npm install --save-dev nodemon <<ติดตั้ง nodemon แบบ development dependency << restart server ให้ auto ไม่ต้องทำเอง
//npm install --save-prod mongodb
//npm init -y
// เรียกใช้ nodemon index.js
// << npm run dev ใช้ run dev ที่กำหนดใน package.json

app.post('/books', async (req, res) => { //<<แอโร่ function

    //input*
    let newtitle = req.body.title //<<ตรง.title กำหนดเองชื่ออื่นได้ 
    let newprice = req.body.price 
    let newunit = req.body.unit 
    let newisbn = req.body.isbn 
    let newimageurl = req.body.imageurl 

    let newBook = {
        title: newtitle, //key:value
        price: newprice,
        unit: newunit,
        isbn: newisbn,
        imageurl: newimageurl,
    }
    let bookID = 0

    //process*
    const result = await bookscollection.insertOne(newBook)
//    books.push(newBook) //<<insert ต่อท้ายไปเรื่อยๆ << before mongodb
    bookID = result.insertedId
//    bookID = books.length - 1 //<< before mongodb

    //output*

    res.status(201).json(bookID)
})

const port = 3000
app.listen(port, () => console.log(`Server started again at ${port}`))
