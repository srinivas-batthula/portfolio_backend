const express = require('express');
const email = require('./services/email');

const app =express();

app.use(express.json());

app.post('/sendEmail', async(req, res)=>{
    let body = req.body;  // Extract the necessary fields from the request body

    if (!body.to || !body.name || !body.txt) {
        return res.status(400).json({ error: 'To, subject, and text fields are required.' });
    }

    const result = await email.sendEmail(body);

    if(result.status=='success'){
        return res.status(200).json({ message: 'Email sent successfully!' });
    }
    else{
        return res.status(400).json({ message: 'Failed to send Email!' });
    }
});

app.get('/test', (req, res, next)=>{
    try{
    return res.status(200).json({'status':'success', 'details':'API is live'})
    }
    catch(err){
        next(err);
    }
})

app.use((err, req, res, next)=>{
    return res.status(404).json({'status':'Fail', 'details':'Request URI/Path Not Found'});
})


app.listen(10000, ()=>{
    console.log(`Listening on PORT 10000`)
})