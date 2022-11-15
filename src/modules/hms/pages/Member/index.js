import Search from "./Search";
import usePatients from "../../hooks/usePatients";
import Registration from "./Registration";
import {useStatusContext} from "../../providers/StatusProvider";
import LoadingComponent from "../../components/LoadingComponent";
import ErrorComponent from "../../components/ErrorComponent";

export default function Member(){





    const {patient,status}=useStatusContext()
    const {data:patients,isLoading,isError}=usePatients()

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


    const ConditionalRenderer=({patients})=>{
        if(status==='default'){
            return (<Search patients={patients} />)
        }

        if(status==='not_found' && patient!==null){
            return (<Registration/>)
        }

        if(status==='found' && patient!==null){
            return (<Registration/>)
        }
    }



    return patients &&  (
        <div className='min-h-screen bg-white font-ny'>
            <ConditionalRenderer patients={patients}/>
        </div>
    )
}