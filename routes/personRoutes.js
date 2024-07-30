const express = require('express');
const  router = express.Router();
const User = require("./../model/User");

router.get('/', async(req, res)=>{
    try{
        const data = await User.find();
        console.log("Data fetched");
        res.status(200).json(data);
        res.send("Data has been fetched");
    }
    catch(error){
      res.status(500).json({error: "internal server error"});
    
    }
})

router.post('/', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).send('All fields are required.');
        }
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.status(201).send(newUser);
    } catch (error) {
        if (error.code === 11000) { // Duplicate email error code
            return res.status(400).send('Email already exists.');
        }
        res.status(500).send('Server error');
    }
});

router.put("/:id", async(req, res)=>{
    try{
        const personId = req.params.id;
        const updatedData =  req.body;
        const response = await User.findByIdAndUpdate(personId, updatedData, {
            new: true,
            runValidators: true
        });
        console.log("Data has been updated");
        res.status(200).json(response);

    }
    catch(error){
        res.status(500).send('Server error');
    }
})

router.delete("/:id", async(req, res)=>{
    try{
        const personId = req.params.id;
        const response = await User.findByIdAndDelete(personId);

        if(!response){
            res.status(500).json({error: "There is an error"});
        }
        console.log("Data has been deleted");
        res.status(200).json(response);

    }
    catch(error){
        res.status(500).send('Server error');
    }
})



module.exports = router;

// **********extra feature *******
// app.get('/users/:workType', async(req, res)=>{
//     try{

//         const workType = req.params.workType;
//         if(workType == 'chef'|| workType == 'manager'|| workType == 'waiter'){
//             const response = await Person.find({work: workType});
//             console.log("response fetched");
//             res.status(200).json(express.response);
//         }
//         else{
//             res.status(404).json({error: "sorry Invalid work type"})
//         }

//     }
//     catch(error){
//         res.status(500).json({error: "Internal server error"});
//     }
// })

// Now it's time to create a actual server using using mongodb a 