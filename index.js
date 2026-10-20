import express from 'express';

const app = express ();

const port = process.env.PORT || 8000

app.get ('/', (req,res)=>{
    res.send("object");
});

app.listen(port, ()=>{
    console.log(`Example app listing on port ${port}`);
})

