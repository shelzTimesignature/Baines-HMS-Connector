import useMemberLookup from "../../hooks/useMemberLookup";
import ClaimTariffs from "./claimTariffs";

export default function PatientDetail({patient,medical,data}){


    const {data:card_holder,isLoading,isError}=useMemberLookup({
        suffix:patient.Patient_Suffix,
        member_number:patient.Medical_Aid_Member_No,
        bio_code:medical.Bio_Code
    })


    if(isLoading){
        return (
            <div>
                <span className="block text-xs uppercase tracking-[4px] text-center py-5">
                    Loading
                </span>
            </div>
        )
    }


    if(isError){
        return (
            <div>
                <span className="block text-xs uppercase tracking-[4px] text-center py-5">
                    Make sure the patient details are correct
                </span>
            </div>
        )
    }


    return  card_holder && (
        <div>
            <div className="mt-12">
                <div>
                    <ClaimTariffs
                        patient={patient}
                        medical={medical}
                        data={data}
                        cardHolder={card_holder}
                    />
                </div>
            </div>
        </div>
    )
}