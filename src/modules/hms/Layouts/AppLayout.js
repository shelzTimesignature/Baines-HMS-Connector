import {Link, Outlet} from "react-router-dom";

export default function AppLayout(){
    return (
        <div className={'min-h-screen font-ny bg-zinc-100'}>
            <div className="flex">
                <div className="flex-1 p-10 space-y-3">
                    <Link to={'/'}>
                        <span className="block text-gray-700 p-3 rounded cursor-pointer hover:bg-zinc-200 hover:text-purple-700">
                            Member Look Up
                        </span>
                    </Link>

                    <Link to={'/claim'}>
                        <span className="block text-gray-700 p-3 rounded cursor-pointer hover:bg-zinc-200 hover:text-purple-700">
                            Claims
                        </span>
                    </Link>
                </div>
                <div className="w-3/4 bg-white">
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}