import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
    try {
        const {message} = req.body; //receive the user message
        const {id: receiverId} = req.params; //get the user ID and rename to receiverId
        const senderId = req.user._id;

        //check to find this conversation between 2 users 
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        })

        //it's the first message
        if(!conversation){
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            })
        }

        //create the message
        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });

        //put the message id in the conversation in the array
        if (newMessage){
            conversation.messages.push(newMessage._id);
        }

        //SOCKET IO FUNCTIONALITY WILL GO HERE

        //save in the database
        // await conversation.save();
        // await newMessage.save();

        //this will in parallel
        await Promise.all([conversation.save(), newMessage.save()]);

        //send in the response
        res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message)
        res.status(500).json({error:"Internal server error"});
    }
}