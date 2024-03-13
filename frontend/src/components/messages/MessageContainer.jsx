import Messages from "./Messages"
import MessageInput from "./MessageInput"

const MessageContainer = () => {
  return (
    <div className="md:min-w-[450px] flex flex-col">
        <>
            {/* Header */}
            <div>
                <span className="label-text">To:</span> <span className="text-gray-900 font-bold">John Doe</span>
            </div>

            <Messages />
            <MessageInput />
            
        </>
    </div>
  )
}

export default MessageContainer


//STARTER CODE SNIPPET
// import Messages from "./Messages"
// import MessageInput from "./MessageInput"

// const MessageContainer = () => {
//   return (
//     <div className="md:min-w-[450px] flex flex-col">
//         <>
//             {/* Header */}
//             <div>
//                 <span className="label-text">To:</span> <span className="text-gray-900 font-bold">John Doe</span>
//             </div>

//             <Messages />
//             <MessageInput />
            
//         </>
//     </div>
//   )
// }

// export default MessageContainer
