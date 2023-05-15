const express = require("express");
const fs = require("fs");
const path = require("path");
const buffer = require("buffer");


const fileRouter = express.Router();



//this will create file as we define that our file will be text.txt
fileRouter.get("/createfile", (req, res) => {

    const data = new Uint8Array(Buffer.from('Hello Node.js'));
    fs.writeFile(`Routes/AllFiles/text.txt`, data, (err) => {
        if (err) throw err;
        res.send(`The file has been saved!`)
        console.log('The file has been saved!');
    });
    //we can run loop here and make many files at a time 

});


//this will read file that we created with above route
fileRouter.get("/readfile", (req, res) => {

    fs.readFile(`Routes/AllFiles/text.txt`, "utf-8",(err, data) => {
        if (err) throw err;
        console.log(data);
      });
})

//this route will read file in particular directory
fileRouter.get('/readdirectory', (req, res) => {

    //For example we will count all files in AllFiles directory
    fs.readdir(`Routes/AllFiles`, (err, result) => {
        if (err) throw err 
        res.status(200).send({ msg: `Total files in this directory ${result.length}`, files: result });
    });
});


//we define a function called `processFile` that takes a file path as an argument and reads the contents of the file using the `fs.readFile` method. When the file is read, the contents are logged to the console.
fileRouter.get("/process", (req, res)=>{
    function processFile(filePath) {
        fs.readFile(filePath, 'utf8', (err, data) => {
          if (err) {
            console.error(`Error reading file ${filePath}: ${err}`);
          } else {
            console.log(`File contents of ${filePath}:`);
            console.log(data);
          }
        });
      }
      
      processFile("Routes/AllFiles/text.txt")
})

module.exports={
    fileRouter
}