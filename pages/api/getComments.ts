// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {sanityClient} from '../../sanity' 
import {groq} from 'next-sanity'
import { Comment } from '../../typings'

const  feedQuery  =  groq`
*[_type == "comment" &&  references(*[_type =='tweet' && _id == $tweetId ]._id)] {
    _id,
    ...
} | order(_createdAt desc)
`
/* 
const  feedQuery  =  groq`
*[_type == 'comment' && tweet._ref ==  $iduser]{
    ...
   }
` */

type Data = {
    comments:Comment[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const {tweetId} = req.query
     const comments: Comment[] =  await sanityClient.fetch(feedQuery,{
        tweetId
     }) 
     res.status(200).json({comments })
}
