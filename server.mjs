
import express from "express";
import mongoose, { Mongoose } from "mongoose";
import cors from "cors";
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())




app.get('/todos', (req, res) => {
    todoModel.find({}, (error, saved) => {
        if (!error) {

            res.send({
                message: "Your Data is Get Successfully",
                data: saved
            })
        } else {
            res.status(500).send({
                message: "Server Error"
            })
        }
    })
})
app.post('/todos', (req, res) => {

    todoModel.create({ text: req.body.text }, (error, saved) => {
        if (!error) {

            res.send({
                message: "Your Data is Posted Successfully"
            })
        } else {
            res.status(500).send({
                message: "Server Error"
            })
        }
    })

})


// app.delete('/todos', (req, res) => {
//     todoModel.deleteMany({}, (error, saved) => {
//         if (!error) {

//             res.send({
//                 message: "Your Data is Deleted Successfully",
//                 data: saved
//             })
//         } else {
//             res.status(500).send({
//                 message: "Server Error"
//             })
//         }
//     })
// })

app.delete('/todos', async (req, res) => {
   

    try {
        let data = await todoModel.deleteMany({}, { text: req.body.text }).exec()
        res.send({
            message: `Your is Deleted Successfully`,
            data:data
           
        })
    } catch (error) {
        res.status(500).send({
            message: "Server Error"
        })
    }
})

// app.delete('/todos/:id', (req, res) => {
//     let id = req.params.id
//     todoModel.findByIdAndDelete(id, (error, saved) => {
//         if (!error) {

//             res.send({
//                 message: `Your ${id} is Deleted Successfully`,

//             })
//         } else {
//             res.status(500).send({
//                 message: "Server Error"
//             })
//         }
//     })
// })


app.delete('/todo/:id', async (req, res) => {
    let id = req.params.id

    try {
        let data = await todoModel.findByIdAndDelete(id, { text: req.body.text }).exec()
        res.send({
            message: `Your ${id} is Deleted Successfully2`,
           
        })
    } catch (error) {
        res.status(500).send({
            message: "Server Error"
        })
    }
})
//////Updated
app.put('/todo/:id', async (req, res) => {
    let id = req.params.id

    try {
        let data = await todoModel.findByIdAndUpdate(id, { text: req.body.text }, { new: true }).exec()
        res.send({
            message: `Your ${id} is Updated Successfully2`,
            data: data
        })
    } catch (error) {
        res.status(500).send({
            message: "Server Error"
        })
    }
})
// app.put('/todos/:id',(req,res)=>{
//     let id=req.params.id
//     todoModel.findByIdAndUpdate(id,{text:req.body.text},(error,saved)=>{
//         if (!error) {

//             res.send({
//                 message :`Your ${id} is Updated Successfully`,

//             })
//         } else {
//             res.status(500).send({
//                 message:"Server Error"
//             })
//         }
//     })
// })
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})



////////////////////////Schema////////////////////////////////////////////////////

let todoSchema = mongoose.Schema({
    text: { type: String, required: true },
    classId: { type: String },
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
