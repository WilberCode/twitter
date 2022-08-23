import React, { SVGProps } from 'react'
interface Props{
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
  Title:string
  onClick?:()=> {}
}

const SidebarOption = ({Icon,Title, onClick}:Props) => {
  return (
    <li>
        <button onClick={()=>onClick?.()} className="flex items-center space-x-4 px-4 py-3 rounded-full max-w-fit transition-all  duration-200  hover:bg-gray-100  group " > 
        <Icon className="w-6 h-6" /> <p className="group-hover:text-twitter text-base lg:text-lg hidden md:inline-flex  ">{Title}</p> 
        </button>
    </li>
  )
}

export default SidebarOption