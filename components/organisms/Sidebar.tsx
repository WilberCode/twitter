import React from 'react'
import { 
  BellIcon, 
  HashtagIcon,
  BookmarkIcon,
  CollectionIcon, 
  MailIcon,
  UserIcon,
  HomeIcon,
  DotsCircleHorizontalIcon
} from '@heroicons/react/outline'
import SidebarOption from '../molecules/SidebarRow'
import { signIn, signOut, useSession } from 'next-auth/react'

function Sidebar() {
  const {data:session}  = useSession()
 
  
  return (
    <aside  className="md:w-full  md:max-w-[275px]" >
      <ul className="mt-6  flex  flex-col items-center sm:items-stretch px-4" >
        <img className="w-10 h-10 m-3" src="https://links.papareact.com/drq" alt=""  />
        <SidebarOption Icon={HomeIcon} Title="Home" />
        <SidebarOption Icon={HashtagIcon} Title="Explore" />
        <SidebarOption Icon={BellIcon} Title="Notifications" />
        <SidebarOption Icon={MailIcon} Title="Messages" />
        <SidebarOption Icon={BookmarkIcon} Title="Bookmarks" />
        <SidebarOption Icon={CollectionIcon} Title="Lists" />
    {/*     <SidebarOption Icon={UserIcon} Title="Sign Out" /> */}
        <SidebarOption Icon={UserIcon} onClick={session? signOut: signIn} Title={`${session?'Cerrar Sessión':'Iniciar Sessión'}`} /> 
        <SidebarOption Icon={DotsCircleHorizontalIcon} Title="More" /> 
      </ul>
    </aside>
  )
}

export default Sidebar