import ClaimPresign from "./ClaimPresign";
import ClaimByPass from "./ClaimByPass";
import ClaimBioLink from "./ClaimBioLink";
import {useState} from "react";

export default function ClaimOptions({patient,medical,data,claims,cardHolder}){
    const [option,setOption]=useState('')

    return (
        <div>
            <div className="mt-12">
                <span className="block text-xl uppercase tracking-[4px]">Claim Submission Options</span>
            </div>

            <div className="mt-12 flex flex-col space-y-5">
                <label className='flex items-center space-x-4'>
                    <input
                        type={'radio'}
                        value={'Presign'}
                        name={'option'}
                        className={'h-6 w-6 focus:outline-none accent-zinc-700 cursor-pointer'}
                        onChange={val=>setOption(val?.target?.value)}
                    />
                    <span className="block text-xs uppercase tracking-[2px]">Presigned</span>
                </label>

                <label className='flex items-center space-x-4'>
                    <input
                        type={'radio'}
                        value={'ByPass'}
                        name={'option'}
                        className={'h-6 w-6 focus:outline-none accent-zinc-700 cursor-pointer'}
                        onChange={val=>setOption(val?.target?.value)}
                    />
                    <span className="block text-xs uppercase tracking-[2px]">By Pass</span>
                </label>

                <label className='flex items-center space-x-4'>
                    <input
                        type={'radio'}
                        value={'BioLink'}
                        name={'option'}
                        className={'h-6 w-6 focus:outline-none accent-zinc-700 cursor-pointer'}
                        onChange={val=>setOption(val?.target?.value)}
                    />
                    <span className="block text-xs uppercase tracking-[2px]">Bio Link</span>
                </label>

            </div>


            <div>
                {
                    (patient.Medical_Aid_Member_No===null || medical?.Bio_Code===null || patient?.Patient_Suffix ) ? (
                        <div>
                            {
                                option==='Presign' ? (
                                    <ClaimPresign
                                        cardHolder={cardHolder}
                                        claim={data}
                                        claims={claims}
                                    />
                                ) : option==='ByPass' ? (
                                    <ClaimByPass/>
                                ) : option==='BioLink' ? (
                                    <ClaimBioLink/>
                                ) : (
                                    <div className='w-full py-10 bg-zinc-50 bg-opacity-50 mt-12'>
                                        <span className="block text-xs text-center tracking-[4px] uppercase">
                                            Nothing Selected
                                        </span>
                                    </div>
                                )
                            }
                        </div>
                    ) : (
                        <span className="block text-xs uppercase tracking-[3px] text-center py-5">
                            Some crucial information about the patient is missing
                        </span>
                    )
                }
            </div>
        </div>
    )
}