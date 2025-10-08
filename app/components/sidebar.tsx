import { BarChartBigIcon } from "lucide-react";

export default function Sidebar({currentPath ="/dashboard"}:{currentPath:string}){
return <div className="fixed left-0 top-0 bg-gray-900 w-64 text-white min-h-screen p-6 z-10">
<div className="mb-8">
    <div className="flex items-center space-x-2 mb-2">
        <BarChartBigIcon className="w-10 h-10"/>
    </div>
</div>
</div>
}