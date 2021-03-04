//npm init -y
//npm install --save-prod express 
//npm install --save-prod mongodb
//npm install --save-dev nodemon

const express = require('express')
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId
const app = express()

app.use(express.json())
// let books = [] 
const url = 'mongodb+srv://superadmin:12345678910@cluster0.wm519.mongodb.net/mazbooks?retryWrites=true&w=majority'
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true })
let db,bookscollection

async function connect(){
    await client.connect()
    db = client.db('mazbooks')
    bookscollection = db.collection('books')
}
connect()

///Commit #5: update GET /books/:id to retrieve data from MongoDB
app.get('/books',async (req, res) => {
    //input
    //process
    const cursor = await bookscollection.find({})
    const result = await cursor.toArray()
    //output
    res.status(200).json(books)
})


app.get('/books/:id', async (req, res) =>{
    //input
    let id = req.params.id
    // let book = {} 
    // book = books[id]
    const book = await bookscollection.findOne({ _id: ObjectId(id)})

    res.status(200).json(book)
})


app.post('/books', async(req, res) => { 

    //input
    let newtitle = req.body.title
    let newprice = req.body.price 
    let newunit = req.body.unit 
    let newisbn = req.body.isbn 
    let newimageurl = req.body.imageurl 

    let newBook = {
        title: newtitle,
        price: newprice,
        unit: newunit,
        isbn: newisbn,
        imageurl: newimageurl,
    }
    let bookID = 0
    const result = await bookscollection.insertOne(newBook)
    //process*
    bookID = result.insertedId
//    books.push(newBook) 
//    bookID = books.length - 1 
    //output*

    res.status(201).json(bookID)
})
const port = 3000
app.listen(port, () => console.log(`Server started again at ${port}`))


