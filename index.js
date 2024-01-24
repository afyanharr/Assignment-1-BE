const express = require("express")
const app = express()
const port = 3000
const fs = require('fs');
app.use(express.json())
app.set('view engine', 'ejs')

app.get('/', (req,res) => {
    res.send("hello world")
})

app.post('/books', (req,res) => {
    try {
        const readJson = fs.readFileSync('data.json','utf8', (err,data) => {
            if (err) {
                console.log("Internal Server Error")
                return res.status(500).send("Internal Server Error")
            }
        })
        const arrayJson = JSON.parse(readJson)
        const dataStored = req.body
        arrayJson.push(dataStored)
        fs.writeFileSync('data.json', JSON.stringify(arrayJson, null,2))
        res.status(200).json(dataStored)
    } catch(error) {
        res.status(500).send("Internal Server Error")
    }  
})

app.get('/books', (req,res) => {
    try {
        const readJson = fs.readFileSync('data.json','utf8', (err,data) => {
            if (err) {
                console.log("Internal Server Error")
                return res.status(500).send("Internal Server Error")
            }
        })
        const arrayJson = JSON.parse(readJson)
        res.status(200).json(arrayJson)
    } catch(error) {
        res.status(500).send("Internal Server Error")
    }  
})

app.get('/books/:booksId', (req,res) => {
    try {
        const booksId = Number(req.params.booksId)
        console.log(booksId)
        const readJson = fs.readFileSync('data.json','utf8', (err,data) => {
            if (err) {
                return res.status(500).send("Internal Server Error")
            }
        })
        const arrayJson = JSON.parse(readJson)
        const getBook = arrayJson.filter(x => x.id == booksId)
        if (getBook.length === 0) {
            return res.status(404).json({ message: 'No books found for the specified booksId' });
        }
        res.status(200).json(getBook)
    } catch(error) {
        return res.status(500).send("Internal Server Error")
    } 
})

app.get('/ejs/books', (req,res) => {
    try {
        const readJson = fs.readFileSync('data.json','utf8', (err,data) => {
            if (err) {
                console.log("Internal Server Error")
                return res.status(500).send("Internal Server Error")
            }
        })
        const arrayJson = JSON.parse(readJson)
        res.render('bookLists', { arrayJson })
    } catch(error) {
        return res.status(500).send("Internal Server Error")
    }  
})


app.listen(port, () => {
    console.log(`App is running on port ${port}`)
    console.log(`Nodemon Running`)
})