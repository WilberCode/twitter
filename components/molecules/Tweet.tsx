import { ChatAlt2Icon, ChatIcon, DotsHorizontalIcon, HeartIcon, RefreshIcon, UploadIcon } from "@heroicons/react/outline"
import { Comment, CommentBody, Tweet } from "../../typings"
import TweetOption from "../atoms/TweetOption"
import TimeAgo from 'react-timeago'
import { FormEvent, useEffect, useState } from "react"
import fetchComments from "../../utils/fetchComments"
import { GetServerSideProps, GetStaticProps } from "next"
import { groq } from "next-sanity"
import { sanityClient } from "../../sanity"
import ComponentComment from "./Comment" 
import { useSession } from "next-auth/react"
import toast from "react-hot-toast"

interface Props{
  tweet: Tweet
}



const Tweet = ({tweet}:Props) => {

  const {data:session} = useSession()

  const [comments, setComments] = useState<Comment[]>([])
  const [commentBoxVisible, setCommentBoxVisible] = useState<boolean>(false)
  const [input, setInput] = useState<string>('')

  let {_id,username,text,profileImg,image, _createdAt} = tweet
  const refreshComments = async ()=>  {
    const comments:Comment[] = await fetchComments(_id) 
    setComments(comments)
  }  
  useEffect(() => {
    refreshComments() 
  }, [tweet])
 
  const commentTweet = async()=>{
    const tweetInfo:CommentBody = {
        comment: input,
        username: session?.user?.name || 'Usuario desconocido',
        profileImg: session?.user?.image || 'https://links.papareact.com/gll' 

    }

    const result =  await fetch(`/api/addComment?tweetId=${_id}`,{
        body: JSON.stringify(tweetInfo),
        method: 'POST'
    })
    const json = await  result.json()

    const newComments = await fetchComments(_id)
    setComments(newComments)
  
    toast('Tweet Comentado!',{
        icon: '🚀 '
    })
    return json
  }

  const handleSubmit = (e:FormEvent<HTMLFormElement>)=> {
    e.preventDefault()
    commentTweet() 
    setCommentBoxVisible(false)
    setInput('')
    
  }


  return (
    <article className=" " >
        <div  className="flex px-4 pt-4  border-b border-gray-200" >
            <div  className="flex-shrink-0 mt-2 relative ">
                <img className="w-[48px] h-[48px] object-cover object-center rounded-full " src={profileImg} alt="" />
            </div>
            <div  className=" flex-grow ">
              <div  className="ml-3 ">
                <div className="text-sm flex items-center  ">
                  <span  className="font-semibold" >{username} </span>
                  <span  className="text-gray-500 mx-1" >@{username.replace(/\s+/g,'').toLowerCase()}  </span>
                  .  <TimeAgo  className="text-gray-500 ml-1"  date={_createdAt}   />

                   
                  <ul className="ml-auto text-gray-500 -mr-2 "><TweetOption Icon = {DotsHorizontalIcon}  color="text-blue-500"/></ul>  

                </div> 
                <p  className="text-sm" >{text}</p>
                <div className="rounded-2xl overflow-hidden mt-3" >
                    <img src={image}  alt="" />
                </div>
              </div> 
              <div >
                <ul className="grid grid-cols-4 gap-4 text-gray-600 py-[6px] ">
                  <TweetOption Icon = {ChatAlt2Icon} counter = {comments.length} color="text-blue-500" onClick={()=>session && setCommentBoxVisible(!commentBoxVisible)} /> 
                  <TweetOption Icon = {RefreshIcon} counter = {31}  color="text-green-500"/>  
                  <TweetOption Icon = {HeartIcon} counter = {59} color="text-pink-500"/> 
                  <TweetOption Icon = {UploadIcon}  color="text-blue-500"/> 
                 </ul> 
              </div> 
            </div> 
        </div>  
        <div>
       {commentBoxVisible && (
         <div  className="fixed top-0 bottom-0 right-0 left-0 w-full h-full z-30 flex items-start justify-center " >
              <div onClick={()=>session && setCommentBoxVisible(!commentBoxVisible)}  className="fixed top-0 bottom-0 right-0 left-0 w-full h-full z-40 bg-black opacity-25 " />
              <section className="bg-white rounded-2xl w-full max-w-[600px] relative z-50  top-16 " > 
                <form  className="w-full max-w-[600px] px-4 py-2 " onSubmit={handleSubmit} >
                  <div  className="flex  space-x-4 " >
                    <div  className="flex-shrink-0 mt-2 relative ">
                        <img className="w-[48px] h-[48px] object-cover object-center rounded-full " src={profileImg} alt="" />
                    </div>
                    <textarea onChange={(e)=>setInput(e.target.value)}   className="flex-1 mt-4 text-lg text-gray-800 font-normal placeholder:text-gray-500 placeholder:text-lg outline-none scrollbar-hide " placeholder="Twittea tu respuesta" />
                  </div>
                  <div  className="flex mt-4" >
                       <button disabled={!input.trim()} type="submit" className="bg-twitter px-4 py-2 rounded-full  leading-none text-sm text-white disabled:opacity-50 ml-auto" > Responder </button>
                  </div>
                </form>
                
            </section>
        </div>
       )}

          {/*    Comment Box logic */}
          {
            comments?.length > 0 && (
              comments.map((comment) => <ComponentComment key={comment._id} commentuser={comment} answerto={username}  /> )
            )
          }
          
        </div> 
    </article> 
  )
}

export default Tweet

 