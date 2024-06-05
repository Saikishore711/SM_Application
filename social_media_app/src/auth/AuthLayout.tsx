import { Outlet, Navigate } from "react-router-dom";
import side from '/assets/side.jpg';

function AuthLayout() {
    const isAuthenticated = false;
    return (
        <>
        {isAuthenticated ? (
            <Navigate to='/' />
        ): (
            <>
            <div className="flex min-h-screen">
                <section className="flex flex-1 justify-center items-center flex-col ">
                    <Outlet />
                </section>
                <img src={side} alt="logo" className="hidden md:block w-1/2 object-cover bg-no-repeat h-full" />
            </div>
            </>
        )}
        </>
    );
}

export default AuthLayout;
