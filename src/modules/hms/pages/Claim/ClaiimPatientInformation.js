export default function ClaiimPatientInformation({data,medical}){


    return (
        <div>
            <div className="flex flex-col border-b border-gray-100">
                <div className="w-full p-5 bg-gray-50" >
                    <div className="flex items-center space-x-5">
                        <div className="w-[60px] h-[60px] bg-white"></div>
                        <div className="flex-1">
                            <span className="block text-sm tracking-wide">{data.Patient_Name}</span>
                            <span className="block text-xs tracking-wide mt-1">{data.Patient_DOB_DDMMYYYY}</span>
                            <span className="block text-xs tracking-wide mt-1">{medical.Name}</span>
                        </div>
                    </div>
                    <div className="mt-5">
                        <span className="block text-xs tracking-wide mt-1">
                            <span>Episode ID : </span>
                            <span>{data.Episode_ID}</span>
                        </span>
                        <span className="block text-xs tracking-wide mt-1">
                            <span>data No.</span>
                            <span>{data.data_No}</span>
                        </span>
                    </div>
                </div>
                <div className="p-3 flex items-center space-x-5">
                    <div className="flex items-center space-x-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 p-0">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                        </svg>
                        <span className="block text-xs">{data.Account_Date}</span>
                    </div>

                    <div className="flex items-center space-x-1">
                        <div className={`w-3 h-3 ${data.Status==='Released' ? 'bg-green-600' : data.Status==='Cancelled' ? 'bg-orange-600' : 'bg-yellow-600'} rounded-full`}></div>
                        <span className={`block text-xs ${data.Status==='Released' ? 'text-green-600' : data.Status==='Cancelled' ? 'text-orange-600' : 'text-yellow-600'}`}>{data.Status}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}