import type { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Toaster } from 'react-hot-toast'
import Feed from '../components/organisms/Feed'
import Sidebar from '../components/organisms/Sidebar'
import Widgets from '../components/organisms/Widgets'
import { sanityClient } from '../sanity'
import { Tweet } from '../typings'
import fetchComments from '../utils/fetchComments'
import { fetchTweets } from '../utils/fetchTweets'


interface Props{
   tweets: Tweet[] 
}

const Home = ({tweets}:Props) =>  { 
  
  return (
    <div className=" lg:max-w-6xl mx-auto max-h-screen overflow-hidden ">
      <Head>
        <title>Twitter 2.0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
     <Toaster/> 

      <main className="flex ">  
        <Sidebar/> 
        <Feed tweets = {tweets}  /> 
        <Widgets/>  
      </main>
    </div>
  ) 
}

export default Home

export const  getServerSideProps:GetServerSideProps = async(context)=>{
    const tweets = await fetchTweets()     
    const comments = await fetchComments('1958170b-4bd2-474e-a72b-d762e08886eb')   
    
    return { 
        props: {tweets} 
    }
}
  