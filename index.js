import express from 'express';
import cors from 'cors';

const app = express ();
const port = process.env.PORT || 8000

//Middleware
app.use(cors());
app.use(express.json())


app.get ('/', (req,res)=>{
    res.send("hi database");
});

app.listen(port, ()=>{
    console.log(`Example app listing on port ${port}`);
})

