 
 import { CalendarIcon, EmojiHappyIcon, LocationMarkerIcon, PhotographIcon, SearchCircleIcon } from "@heroicons/react/outline"
 import { UserCircleIcon } from "@heroicons/react/solid"
import { useSession } from "next-auth/react"
import React, { Dispatch, MouseEvent, MouseEventHandler, SetStateAction, useRef, useState } from "react"
import toast from "react-hot-toast"
import { Tweet, TweetBody } from "../../typings"
import { fetchTweets } from "../../utils/fetchTweets"
import TweetBoxOption from "./TweetBoxOption"

interface Props{
    SetTweets:Dispatch<SetStateAction<Tweet[]>>
}

 
const TweetBox = ({SetTweets}:Props) => {
    
    const [Input, setInput] = useState<string>('')
    const {data:session} = useSession()
    const [imageUrlBoxIsOpen, setImageUrlBoxIsOpen] = useState<boolean>(false)
    const imageInputRef = useRef<HTMLInputElement>(null)

    const [image, setImage] = useState<string>('')
 
    const sendTweet =  (e:any)=>{
        e.preventDefault()
        alert(Input)
    }

    const addImageToTweet = (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (!imageInputRef.current?.value) return
        setImage(imageInputRef.current.value)
        imageInputRef.current.value = ''
        setImageUrlBoxIsOpen(false)
    }

    const postTweet = async()=>{
        const tweetInfo:TweetBody = {
            text: Input,
            username: session?.user?.name || 'Usuario desconocido',
            profileImg: session?.user?.image || 'https://links.papareact.com/gll',
            image: image

        }

        const result =  await fetch(`/api/addTweet`,{
            body: JSON.stringify(tweetInfo),
            method: 'POST'
        })
        const json = await  result.json()

        const newTweets = await fetchTweets()
        SetTweets(newTweets)
      
        toast('Tweet Publicado!',{
            icon: '🚀 '
        })
        return json
    }
    
    const handleSubmit = (e:MouseEvent<HTMLInputElement, globalThis.MouseEvent>) => {
        e.preventDefault()
        postTweet()
        setImage('')
        setInput('')
        setImageUrlBoxIsOpen(false)
     
    }




    return (
        <div> 
            <div  className="border-b pb-4 px-4 mt-6" >
            <div  className="flex space-x-3" >
                    {session?    
                    <img className="w-14 h-14 rounded-full " alt={session?.user?.name || 'Usuario' } title={session?.user?.name || 'Usuario'}  src={session?.user?.image || 'https://links.papareact.com/gll'} /> 
                    :  
                    <UserCircleIcon className="w-14 h-14 text-gray-400" />} 
                  
                    <div  className="flex-grow flex items-center pl-2 " >
                        <form  className=" flex flex-1 flex-col " onSubmit={sendTweet} >
                            <input value={Input} onChange={(e)=>setInput(e.target.value)} type="text"   className="flex-grow outline-none  text-xl placeholder:text-xl text-gray-500 h-14 w-full  " placeholder="What's Happening?" />
                            {imageUrlBoxIsOpen && ( 
                                    <form className="flex gap-2 px-5 py-5 my-4 rounded-lg bg-blue-500 items-center  ">
                                        <input ref={imageInputRef} type="text" placeholder="Agrega url de la imagen" className="bg-transparent placeholder-gray-300 flex-grow " />
                                        <button onClick={addImageToTweet} className="text-white " type="submit">Subir Imagen</button>
                                    </form>
                                ) }
                            {image&&(
                                <img src={image} alt="sws" className="rounded-2xl mb-4 w-full shadow-lg" />
                            )}
                            <div  className="flex items-center  " > 
                                <ul  className="flex-1 flex space-x-2 " >
                                    <TweetBoxOption Icon={PhotographIcon} onClick={()=>setImageUrlBoxIsOpen(!imageUrlBoxIsOpen)} /> 
                                    <TweetBoxOption Icon={SearchCircleIcon} /> 
                                    <TweetBoxOption Icon={EmojiHappyIcon} /> 
                                    <TweetBoxOption Icon={CalendarIcon} />  
                                    <TweetBoxOption Icon={LocationMarkerIcon} />  
                                </ul>
                              
                                {
                                    !!!Input.trim()?( 
                                        <input disabled={!Input || !session } type="button" className=" cursor-pointer disabled:opacity-40 px-5 py-2 text-base font-medium rounded-full bg-twitter text-white  " value="Tweet" />
                                    ):
                                    (
                                        <input   onClick={handleSubmit}  type="submit" disabled={!Input || !session }     className=" cursor-pointer  px-5 py-2 text-base font-medium rounded-full bg-twitter text-white  " value="Tweet" />

                                    )
                                    
                                }
                            </div>
                        </form>
                    </div>
                </div>
            </div> 
        </div>
  )
}

export default TweetBox