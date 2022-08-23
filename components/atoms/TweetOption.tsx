import { SVGProps } from "react"

interface Props{
    Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
    counter?:number
    color:string,
    onClick?:()=>void
}

const TweetOption = ({Icon,counter,color,onClick}:Props) => {
  return (
    <li  className="ml-1 " onClick={()=>onClick?.()} > 
        <button className={` flex space-x-2 text-xs items-center group    justify-center hover:${color}`}>
            <span className=" w-8 h-8 inline-flex justify-center items-center rounded-full group-hover:bg-gray-100" > <Icon  className="w-5" /> </span> 
          
            {counter && (
                 <span  className="">{counter}</span> 
            )}
        </button> 
    </li>

  )
}

export default TweetOption