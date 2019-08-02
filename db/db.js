const mongoose = require('mongoose');

const connectionString = 'mongodb://localhost/monday12';
const db = mongoose.connection;

mongoose.connect(connectionString, {useNewUrlParser: true, useCreateIndex: true});


db.on('connect', ()=>{
	console.log(`mongoose is connected to ${connectionString}`)
})

db.on('disconnect', ()=>{
	console.log(`mongoose is disconnected to ${connectionString}`)
})

db.on('error', (err)=>{
	console.log(`mongoose error: ${err}`)
})




















