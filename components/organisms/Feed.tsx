import { RefreshIcon } from "@heroicons/react/outline"
import { useState } from "react"
import toast from "react-hot-toast"
import { Tweet } from "../../typings"
import { fetchTweets } from "../../utils/fetchTweets"
import TweetComponent from "../molecules/Tweet" 
import TweetBox from "../molecules/TweetBox"

interface Props{
  tweets: Tweet[]
}
 
const Feed = ({tweets: tweetsProps}:Props) => {

  const [tweets, SetTweets] = useState<Tweet[]>(tweetsProps)
  const handleRefresh = async() => {
    const refreshToast =  toast.loading('Actualizando...')
    const tweets = await fetchTweets()
    SetTweets(tweets)
    toast.success('Actualizado!',{
      id: refreshToast
    })
  }

  return ( 
    
    <div  className="w-full max-w-[600px] flex-auto border-x max-h-screen overflow-y-scroll scrollbar-hide " > 
        <div className="flex justify-between items-center " >
            <h1 className="p-5 pb-0 text-xl font-bold" >Home</h1>
            <RefreshIcon onClick={handleRefresh} className="w-8 h-8 mr-5 mt-5 cursor-pointer  text-twitter active:rotate-180 transition-all duration-500  ease-out hover:scale-125 " /> 
        </div>
        <div>
            <TweetBox SetTweets={SetTweets}/>
        </div>
        <div>
           {
            tweets.map((tweet)=> <TweetComponent key={tweet._id}   tweet={tweet}/> )
           }
        </div>
    </div>
  )
}

export default Feed