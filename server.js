const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const multer = require('multer');
const fs = require('fs');



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${__dirname}/resources`)
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, req.body.title + ext);
    const newData = {
        name: req.body.title,
        file: req.body.title + ext
    };

    fs.readFile('resources.json', 'utf8', (err, jsonString) =>{
        try {
            // Parse existing data (an array)
            const data = JSON.parse(jsonString);
            console.log('Writing to json')
            // Add new data to the array
            data.push(newData);

            // Convert back to JSON string with formatting
            const updatedJson = JSON.stringify(data, null, 2);

            // Write the updated data back to the file
            fs.writeFile('resources.json', updatedJson, err => {
            if (err) {
                console.error('Error writing file:', err);
            } else {
                console.log('New data added successfully');
            }
            });
        }catch (err) {
            console.error('Error parsing JSON:', err);
        }
    })

  },
});


const upload = multer({storage});


app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
})

app.post('/upload', upload.single('file'), function (req, res, next){
    res.send("Uploaded Successfully");
    console.log('Done!!!')
})

app.listen(port, () => {
  console.log(`Resourceful app listening on port ${port}`)
})



