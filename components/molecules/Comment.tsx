import { ChatAlt2Icon, DotsHorizontalIcon, HeartIcon, RefreshIcon, UploadIcon } from "@heroicons/react/outline"
import TimeAgo from "react-timeago"
import { Comment } from "../../typings"
import TweetOption from "../atoms/TweetOption"

interface Props{
    commentuser: Comment,
    answerto:string
}
 
const Comment = ({commentuser,answerto}:Props) => {
    const {profileImg,_createdAt,comment,username} = commentuser
  return (
     <div  className="flex px-4 pt-1 hover:bg-gray-50  cursor-pointer comment" >
            <div  className="comment-avatar flex-shrink-0 flex justify-center mt-2 relative after:content-['*] after:absolute after:top-0 after:-mt-8 after:bottom-0 after:w-[2px] after:bg-gray-200 ">
                <img className="w-[48px] h-[48px] object-cover object-center rounded-full relative z-10 outline-4 outline-white outline  " src={profileImg} alt="" />
            </div>
            <div  className=" flex-grow ">
              <div  className="ml-3 ">
                <div className="text-sm flex  items-center  ">
                  <span  className="font-semibold" >{username} </span>
                  <span  className="text-gray-500 mx-1" > @{username.replace(/\s+/g,'').toLowerCase()}  </span>
                  .  <TimeAgo  className="text-gray-500 ml-1"  date={_createdAt}   />

                  
                  <ul className="ml-auto text-gray-500 -mr-2 "><TweetOption Icon = {DotsHorizontalIcon}  color="text-blue-500"/></ul>  

                </div> 
                <p className="text-sm text-gray-500 -mt-2">En respuesta a <a className="text-blue-500 hover:underline" href="#">@{answerto.replace(/\s+/g,'').toLowerCase()}</a></p>
                <p  className="text-sm" >{comment}</p> 
              </div> 
              <div >
                <ul className="grid grid-cols-4 gap-4 text-gray-600 py-[6px] comment-options ">
                  <TweetOption Icon = {ChatAlt2Icon} counter = {59} color="text-blue-500" /> 
                  <TweetOption Icon = {RefreshIcon} counter = {31}  color="text-green-500"/>  
                  <TweetOption Icon = {HeartIcon} counter = {59} color="text-pink-500"/> 
                  <TweetOption Icon = {UploadIcon}  color="text-blue-500"/> 
                </ul> 
              </div> 
            </div> 
        </div> 
  )
}

export default Comment