import {useState} from "react";
import InputComponent from "../../components/InputComponent";
import useShared from "../../hooks/useShared";
import useMedicalAids from "../../hooks/useMedicalAids";

export default function Search({patients=[]}){



    const {data:medicals}=useMedicalAids()
    const [state,setState]=useState({
        member_number:'',
        bio_code:'',
        suffix:''
    })

    const handleChange=(e)=>{
        setState({...state,[e.target.name]:e.target.value})
    }

    const {mutation,searchPatient}=useShared(state)

    return (
        <div className="min-h-screen flex items-center justify-center bg-white relative">
            {
                mutation.isLoading && (
                    <div className="absolute top-0 right-0 p-10">
                       <span className="block text-xs uppercase tracking-[3px]">Loading</span>
                    </div>
                )
            }
           <div className="p-20">
               <div>
                   <span className="block text-xl uppercase tracking-[4px]">Member Lookup</span>
               </div>
               <div className="w-full lg:w-3/4 xl:1/2 mt-14">
                   <div className="grid grid-cols-5 gap-4">
                       <div className='col-span-2'>
                           <InputComponent
                               name={'bio_code'}
                               onChange={handleChange}
                               type={'select'}
                               title={'Medical Aid'}
                               defaultValue={state.bio_code}
                           >
                               <option value="">Select Medical Aid</option>
                               {
                                   medicals && medicals.map((d,i)=>(
                                       <option key={i} value={d?.Bio_Code}>{d?.Name}</option>
                                   ))
                               }
                           </InputComponent>
                       </div>

                       <div className='col-span-2'>
                           <InputComponent
                               name={'member_number'}
                               onChange={handleChange}
                               title={'Member No.'}
                               // defaultValue={state.member_number}
                           />

                       </div>

                       <div>

                           <InputComponent
                               name={'suffix'}
                               onChange={handleChange}
                               title={'Suffix'}
                               // value={state.suffix}
                           />

                       </div>

                   </div>
               </div>

               <div className='mt-10'>
                   <button onClick={()=>searchPatient()} className="rounded px-4 py-4 bg-indigo-600 text-white text-xs">
                       {
                           mutation.isLoading ? '...Looking up' : 'Member Lookup'
                       }
                   </button>
               </div>
           </div>
        </div>
    )
}