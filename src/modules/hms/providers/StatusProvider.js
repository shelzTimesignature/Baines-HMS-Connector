import {createContext, useContext, useState} from "react";

const StatusContext=createContext()
export const useStatusContext=()=>useContext(StatusContext)

export default function StatusProvider({children}){


    const fingers=[
        {
            id:2,
            name:'L-Middle',
            code:'LM',
            bio:null,
        },

        {
            id:3,
            name:'L-Index',
            code:'LI',
            bio:null,
        },

        {
            id:4,
            name:'L-Thumb',
            code:'LT',
            bio:null,
        },

        {
            id:7,
            name:'R-Middle',
            code:'RM',
            bio:null,
        },

        {
            id:8,
            name:'R-Index',
            code:'RI',
            bio:null,
        },

        {
            id:9,
            name:'R-Thumb',
            code:'RT',
            bio:null,
        },
    ]

    const [state,setState]=useState({
        member_number:'',
        bio_code:'',
        suffix:''
    })

    const [status,setStatus]=useState('default')
    const [patient,setPatient]=useState(null)

    return (
        <StatusContext.Provider value={{status,setStatus,patient,setPatient,state,setState,fingers}}>
            {children}
        </StatusContext.Provider>
    )

}