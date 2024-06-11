import { useUserContext } from "@/context/AuthContext";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
import { Button } from "../ui/button";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";

const Topbar = () => {
    const navigate = useNavigate();
    const { user } = useUserContext();
    const { mutate: signOut, isSuccess } = useSignOutAccount();
  
    useEffect(() => {
      if (isSuccess) navigate(0);
    }, [isSuccess]);
  return (
   <section className="topbar">
    <div className="flex-between py-4 px-5">
        <Link to= '/'>
        <div className="flex justify-center items-center ">
          <img className="w-auto h-7" src="/assets/SM-logo.png" alt="logo" />
          <p className="ml-2 text-2xl font-bold">CloudIt</p>
        </div>
       </Link>

       <div className="flex gap-4">
          <Button
            variant="ghost"
            className="shad-button_ghost"
            onClick={() => signOut()}>
            <img src="/assets/logout.svg" alt="logout" />
          </Button>
          <Link to={`/profile/${user.id}`} className="flex-center gap-3">
            <img
              src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
              alt="profile"
              className="h-8 w-8 rounded-full"
            />
          </Link>
        </div>
    </div>
   </section>
  )
}

export default Topbar