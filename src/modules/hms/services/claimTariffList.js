import useTariffs from "../hooks/useTariffs";
import useResources from "../hooks/useResources";

const ClaimTariffList=(ClaimNo)=>{
    const {data,isLoading,isError}=useTariffs(ClaimNo)


    const {data:res}=useResources()


    const getCodeName=(code)=>{
        let f='Not Found';
        for(let i=0;i<res.length;i++){
            let r=res[i]
            if(r?.No?.toLowerCase()===code?.toLowerCase()){
                f=r.Name;
            }
        }
        return f
    }


    const getDataFiltered=()=>{
        let d=[]
        for(let i=0;i<data.length;i++){
            let p=data[i]
            if(p.Document_Claim_No===ClaimNo){
                d.push(p)
            }
        }


        return d.map(x=>{
            x.Name=getCodeName(x?.Tariff_Code)
            return x
        })
    }


    const getTotal=()=>{
        let total=0
        getDataFiltered().forEach(val=>{
            total+=val.Fee_Amount*val.Quantity
        })
        return total
    }



    return {
        getDataFiltered,
        getTotal,
        isLoading,
        isError,
        res,
        data
    }


}
export default ClaimTariffList