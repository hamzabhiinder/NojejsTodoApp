import express from 'express';
import cors from 'cors'
import mongoose from "mongoose";


const app = express()
const port = 3000


app.use(cors())
app.use(express.json())






////////////////Post///////////////////////////////////////////////

app.post('/todos', (req, res) => {

    todoModel.create({ text: req.body.text }, (err, saved) => {
        if (!err) {
            console.log(saved)
            res.send({
                message: 'Your todo is Saved'
            })

        } else {
            res.status(500).send({
                message: "Server Error"
            })

        }
    })

})


////////////////GET///////////////////////////////////////////////

app.get('/todos', (req, res) => {

    todoModel.find({}, (err, docs) => {
        if (!err) {
            console.log(docs)
            res.send({
                message: 'here is Your todo',
                data:docs
            })

        } else {
            res.status(500).send({
                message: "Server Error"
            })

        }
    })

})


app.delete('/todos/:id', (req, res) => {
    let id = req.params.id

    todoModel.findByIdAndDelete(id, (err, docs) => {
        if (!err) {
            console.log(docs)
            res.send({
                message: 'here is Delete todo',
               
            })

        } else {
            res.status(500).send({
                message: "Server Error"
            })

        }
    })

})


// app.delete('/todos/:id', (req, res) => {
//     let id = req.params.id
//     console.log(id)
//     console.log(id);
//     todoModel.findByIdAndDelete(id, (err, data) => {
//         res.send({
//             data: data
//         })
//     })
// })


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

////////////////Schemas///////////////////////////////////////////////

let todoSchema = new mongoose.Schema({
    text: { type: String, required: true },
    classId: String,
    Date: { type: Date, default: Date.now }
})

let todoModel = mongoose.model('todos', todoSchema);

/////////////////////////////////////////////////////////////////////////////////////////////////
let dbURI = "mongodb+srv://AMEER:882292@cluster0.boegp.mongodb.net/abcdatabase?retryWrites=true&w=majority";
mongoose.connect(dbURI);

////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on('connected', () => {
    console.log('mongoos is connected')
});
mongoose.connection.on('disconnected', () => {
    console.log('mongoos is disconnected');
    process.exit(1)
});

mongoose.connection.on('error', (err) => {
    console.log('mongoos connection error' + err)
});

process.on('SIGINT', () => {
    console.log('app is terminating');
    mongoose.connection.close(() => {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});

////////////////mongodb connected disconnected events///////////////////////////////////////////////





