import useShared from "../../hooks/useShared";
export default function LookupComponent({suffix,member_number,bio_code}){

    const {mutation,patients,searchPatient}=useShared({
        suffix,member_number,bio_code
    })

    return (
        <div>
            {
                patients && (
                    <button onClick={()=>mutation.isLoading ? null : searchPatient()} className='focus:outline-none text-xs px-7 py-4 rounded bg-blue-600 text-white'>
                        {
                            mutation.isLoading ? '...Member Looking up' : 'Member Lookup'
                        }
                    </button>
                )
            }
        </div>
    )
}