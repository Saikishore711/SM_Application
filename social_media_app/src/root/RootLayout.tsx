import Topbar from "@/components/shared/Topbar"
import LeftSideBar from "@/components/shared/LeftSideBar"
import { Outlet } from "react-router-dom"
import Bottombar from "@/components/shared/Bottombar"


const RootLayout = () =>  {
  return (
    <>
    <div className="w-full md:flex">
      <Topbar />
      <LeftSideBar />

      <section className="flex flex-1 h-screen">
        <Outlet />
      </section>

      <Bottombar />
    </div>
    </>
    
  )
}

export default RootLayout