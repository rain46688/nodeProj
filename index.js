const express = require('express')
const app = express()
const port = 5000

const monoose = require('mongoose')
monoose.connect('mongodb+srv://circlestar:alstn8775*@cmsmongo.07d76.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser: true, useUnifiedTopology:true,useCreateIndex:true,useFindAndModify:false
}).then(() => console.log('연결됨....'))
.catch(err => console.log(err))


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})