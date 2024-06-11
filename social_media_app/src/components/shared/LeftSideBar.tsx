import { sidebarLinks } from "@/constants";
import { useUserContext } from "@/context/AuthContext";
import { INavLink } from "@/types";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { useEffect } from "react";

const LeftSideBar = () => {
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();
  const { user } = useUserContext();
  const {pathname} = useLocation();
  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);
  return (
    <nav className="leftsidebar h-screen">
      <div className="flex flex-col gap-11">
        <Link to="/" className="flex gap-3 items-center">
          <div className="flex justify-center items-center ">
            <img className="w-auto h-10" src="/assets/SM-logo.png" alt="logo" />
            <p className="ml-2 text-4xl font-bold">CloudIt</p>
          </div>
        </Link>
        <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
          <img
            src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
            alt="profile"
            className="h-10 w-10 rounded-full"
          />
          <div className="flex flex-col">
            <p className="body-bold">{user.name}</p>
            <p className="small-regular text-light-3">@{user.username}</p>
            </div>
            </Link>
            <ul className="flex flex-col gap-6">
              {sidebarLinks.map((link: INavLink) => {
                const isActive = pathname === link.route;
                return (
                  <li key={link.label} className={`leftsidebar-link group ${isActive && 'bg-primary-500'}`}>
                    <NavLink to={link.route} className='flex gap-4 items-center p-4'>
                    <img className={`group-hover:invert-white ${isActive && ' invert-white'}`} src={link.imgURL} alt={link.label} />
                    {link.label}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
      </div>
      <Button
            variant="ghost"
            className="shad-button_ghost"
            onClick={() => signOut()}>
            <img src="/assets/logout.svg" alt="logout" />
            <p>Logout</p>
          </Button>
    </nav>
  );
};

export default LeftSideBar;
