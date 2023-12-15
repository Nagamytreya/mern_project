const express = require('express');
const mongoose = require('mongoose');
const TaskSchema = require('./model');
const cors=require('cors');
const app = express();
const dburi = "mongodb+srv://bittu43786:bittu@cluster1.tq325fj.mongodb.net/mern?retryWrites=true&w=majority";
mongoose.connect(dburi).then(() => console.log('mongodb is connected'));

app.use(express.json());
app.use(cors(
    {
        origin:'*'
    }
))
app.use(express.urlencoded({ extended: true }));

app.post('/addtask', async (req, res) => {
    const { todo } = req.body;
    try {
        const newData = new TaskSchema({
            todo: todo
        });
        await newData.save();
        return res.json(await TaskSchema.find());
    }
    catch (err) {
        console.log(err);
    }
});
app.get('/gettask',async(req,res)=>{
    try{
        return res.json(await TaskSchema.find());
    }
    catch(err){
        console.log(err);
    }
})

app.delete('/delete/:id',async(req,res)=>{
    try{
        await TaskSchema.findByIdAndDelete(req.params.id);
        return res.json(await TaskSchema.find());
    }
    catch(err){
        console.log(err);
    }
})
app.listen(5000, () => console.log('server is running on port 5000'));
