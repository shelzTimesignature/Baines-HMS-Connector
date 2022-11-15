import {useParams} from "react-router-dom";
import useClaim from "../../hooks/useClaim";
import LoadingComponent from "../../components/LoadingComponent";
import ErrorComponent from "../../components/ErrorComponent";
import useMedicalAids from "../../hooks/useMedicalAids";
import usePatients from "../../hooks/usePatients";
import PatientDetail from "./PatientDetail";
import ClaiimPatientInformation from "./ClaiimPatientInformation";



export default function Details(){

    const {data:patients}=usePatients()
    const {id}=useParams()
    const {data,isLoading,isError}=useClaim(id)
    const {data:medicalAid}=useMedicalAids()


    const getMedicalAid=(id)=>{
        let m={}
        for(let i=0;i<medicalAid.length;i++){
            let k=medicalAid[i]
            if(id.toUpperCase()===k?.No?.toUpperCase()){
                m=k
            }
        }
        return m
    }
    const getPatient=(id)=>{
        let m={}
        for(let i=0;i<patients.length;i++){
            let k=patients[i]
            if(id.toUpperCase()===k?.No?.toUpperCase()){
                m=k
            }
        }
        return m
    }
    if(isLoading){
        return (
            <LoadingComponent/>
        )
    }
    if(isError){
        return (
            <ErrorComponent/>
        )
    }

    return patients && (
        <div>
            {
                medicalAid && (
                    <div>
                        {
                            data && (
                                <div className='min-h-screen bg-white'>
                                    <div className="container mx-auto py-20 px-5">

                                        <span className="block text-xl uppercase tracking-[4px]">{data?.Patient_Name}</span>
                                        <span className="block text-xs uppercase mt-2">Patient No : {data?.Patient_No} Medical Aid No : {getPatient(data?.Patient_No).Medical_Aid_Member_No}</span>

                                       <div className="mt-12">
                                           <ClaiimPatientInformation
                                               data={data}
                                               medical={getMedicalAid(data.Patient_No)}
                                           />
                                       </div>


                                        <div className="mt-12">
                                            <PatientDetail
                                                medical={getMedicalAid(data?.Medical_Aid_No)}
                                                patient={getPatient(data?.Patient_No)}
                                                data={data}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                )
            }
        </div>
    )
}