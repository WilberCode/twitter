import { SVGProps } from "react"

interface Props{ 
    Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element,
    onClick?:()=> void
}
 

const TweetBoxOption = ({Icon,onClick}:Props) => {
  return (
    <li onClick={()=>onClick?.()}>
         <Icon className="w-5 h-5 text-twitter cursor-pointer transition-transform  duration-150 ease-out hover:scale-150   "/> 
    </li>
  )
}

export default TweetBoxOption