const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const ejs = require('ejs');
const https = require('https');
const fs = require('fs');

const options = {
    key: fs.readFileSync('/Users/taylorhuston/Desktop/Uber Project/localhost-key.pem'), // replace it with your key path
    cert: fs.readFileSync('/Users/taylorhuston/Desktop/Uber Project/localhost.pem'), // replace it with your certificate path
}

https.createServer(options, (req, res) => {
  res.writeHead(200);
  res.end('Hello, HTTPS World!');
}).listen(443, () => {
  console.log('Server is running on port 443');
});

const uri = 'mongodb://localhost:27017/Uber';
const client = new MongoClient(uri);


app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.listen(3000, function() {
    console.log('listening on 3000')
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.post('/submit', (req, res) => {
    let time = req.body.time
    if (time === 'Now'){
        async function rides(){
            try {
                const database = client.db('mydb');
                const uber = database.collection('Uber-Project');
                const rides = await uber.find({'MinutesAway': {$lt : 5}}).toArray();
                console.log(rides);
                res.render('/Users/abigailbowen/Desktop/Uber Project/views/index.ejs', {rides});
            }finally {
                await client.close();
            }
        }
        rides().catch(console.error);
    }
    if (time === '5'){
        async function rides(){
            try {
                const database = client.db('mydb');
                const uber = database.collection('Uber-Project');
                const rides = await uber.find({$and:[{'MinutesAway':{$gte : 5}}, {'MinutesAway':{$lt:10}}]}).toArray(function(err, results){
                    console.log(results)
                });
                res.render('/Users/abigailbowen/Desktop/Uber Project/views/index.ejs', {rides});
                console.log(rides);
            }finally {
                await client.close();
            }
        }
        rides().catch(console.error);
    }
    if (time === '10'){
        async function rides(){
            try {
                const database = client.db('mydb');
                const uber = database.collection('Uber-Project');
                const rides = await uber.find({$and:[{'MinutesAway':{$gte : 10}}, {'MinutesAway':{$lt:15}}]}).toArray(function(err, results){
                    console.log(results)
                });
                res.render('/Users/abigailbowen/Desktop/Uber Project/views/index.ejs', {rides});
                console.log(rides);
            }finally {
                await client.close();
            }
        }
        rides().catch(console.error);
    }
    if (time === '15'){
        async function rides(){
            try {
                const database = client.db('mydb');
                const uber = database.collection('Uber-Project');
                const rides = await uber.find({$and:[{'MinutesAway':{$gte : 15}}, {'MinutesAway':{$lt:20}}]}).toArray(function(err, results){
                    console.log(results)
                });
                console.log(rides);
                res.render('/Users/abigailbowen/Desktop/Uber Project/views/index.ejs', {rides});
            }finally {
                await client.close();
            }
        }
        rides().catch(console.error);
    }
    if (time === '20'){
        async function rides(){
            try {
                const database = client.db('mydb');
                const uber = database.collection('Uber-Project');
                const rides = await uber.find({'MinutesAway':{$gte : 20}}).toArray(function(err, results){
                    console.log(results)
                });
                console.log(rides);
                res.render('/Users/abigailbowen/Desktop/Uber Project/views/index.ejs', {rides});
            }finally {
                await client.close();
            }
        }
        rides().catch(console.error);
    }
    else{
        
    }
})


