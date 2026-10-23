import express from 'express';
import cors from 'cors';
import { MongoClient, ObjectId } from 'mongodb';
import 'dotenv/config'

const app = express();
const port = process.env.PORT || 8000

//Middleware
app.use(cors());
app.use(express.json())



const client = new MongoClient(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ac-voyktl0-shard-00-00.0uik2wp.mongodb.net:27017,ac-voyktl0-shard-00-01.0uik2wp.mongodb.net:27017,ac-voyktl0-shard-00-02.0uik2wp.mongodb.net:27017/?ssl=true&replicaSet=atlas-s6pimm-shard-0&authSource=admin`);

export async function ConnectToMongoDB() {
    try {
        await client.connect()
        console.log("successfully connected to mongodb");
        return client;
    }
    catch (err) {
        console.dir(err);
    }
};
const connectedDatabase = await ConnectToMongoDB();
const database = connectedDatabase.db("simpleCardDB");
const users = database.collection("users");


app.get('/users', async (req, res) => {
    const cursor = users.find({});
    const allUsers = await cursor.toArray();
    res.send(allUsers);
})
app.get('/users/:id', async (req, res) => {
    console.log("params in the server", req.params);
    const id = req.params.id;

    const query= {_id: new ObjectId(id)}

    const result = await users.findOne(query);
    res.send(result);

})

app.post('/users', async (req, res) => {
    const newUser = req.body;
    console.log("adding new user: ", newUser);

    const result = await users.insertOne(newUser);
    res.send(result)

})


app.patch ('/users/:id', async(req,res)=>{
    const id = req.params.id;
    const updateUser = req.body;
    
    console.log('updating user with ID:', id, 'with data:',updateUser);
    const filter ={_id:new ObjectId(id)}
    const options = {upsert:true};
    const updateDoc={
        $set:{
            name:updateUser.name,
            email:updateUser.email,
        }
    }
    const result= await users.updateOne(filter,updateDoc,options);
    res.send(result);
})


app.delete('/users/:id', async (req,res)=>{
    const id = req.params.id;
    const query ={_id: new ObjectId(id)};
    const result = await users.deleteOne(query);
    res.send(result)
   
})



app.get('/', (req, res) => {
    res.send("hi database");
});



app.listen(port, () => {
    console.log(`Example app listing on port ${port}`);
})

