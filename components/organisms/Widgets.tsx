import { SearchIcon } from "@heroicons/react/outline"
import {TwitterTimelineEmbed} from 'react-twitter-embed'
 
const Widgets = () => {
  return (
    <div  className="px-2 mt-2 w-full  max-w-[350px] hidden lg:inline " >
        <div className="bg-gray-100  flex items-center space-x-2 rounded-full p-3  text-gray-400  " >
            <div>
                <SearchIcon className="w-5 h-5   " /> 
            </div>
            <input className="bg-transparent flex-1 text-md outline-none focus:text-gray-600   " type="text" placeholder="Bucar Twitter" /> 
        </div>
        <TwitterTimelineEmbed
        sourceType="profile"
        screenName="LeoMessiFanClub"
        options={{height: 400}}
        />
    </div>
  )
}

export default Widgets