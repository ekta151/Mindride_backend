const {UserResponseService} = require('../biz/userResponse')


exports.saveUserResponse = async(req,res)=>{
    try{
        let result = await UserResponseService.saveUserResponses(req.userId, req.body.answers);
        console.log(result);
        res.status(201).json({ ...result, success: true });
        console.log("response stored succesfully")
    }catch(e){
        console.error('Error saving user responses:', e);        
        res.status(500).json({ message: 'Error saving user responses', error: e.message });
    }
}

