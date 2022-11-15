import ClaimTariffList from "../../services/claimTariffList";
import ClaimOptions from "./ClaimOptions";

export default function ClaimTariffs({data,patient,medical,cardHolder}){

    const {isLoading,isError,getTotal,getDataFiltered,res,data:claims}=ClaimTariffList(data.Claim_No)




    if(isLoading){
        return (
            <div>
                <span className="block text-xs text-center uppercase tracking-[3px] font-light">Loading</span>
            </div>
        )
    }

    if(isError){
        return (
            <div>
                <span className="block text-xs text-center uppercase tracking-[3px] font-light">Something went wrong</span>
            </div>
        )
    }

    return res && (
        <div>
            {
                claims && (
                    <div>
                        <div className='overflow-x-auto'>
                            <table className="w-full">
                                <thead>
                                <tr>
                                    <th className={`text-xs uppercase tracking-[4px] whitespace-nowrap text-left py-5 px-3 font-semibold w-20`}>ID</th>
                                    <th className={`text-xs uppercase tracking-[4px] whitespace-nowrap text-left py-5 px-3 font-semibold`}>Description</th>
                                    <th className={`text-xs uppercase tracking-[4px] whitespace-nowrap text-left py-5 px-3 font-semibold w-32`}>Qty</th>
                                    <th className={`text-xs uppercase tracking-[4px] whitespace-nowrap text-left py-5 px-3 font-semibold w-32`}>Unit Price</th>
                                    <th className={`text-xs uppercase tracking-[4px] whitespace-nowrap text-left py-5 px-3 font-semibold w-32`}>Amount</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    getDataFiltered().map((d,i)=>(
                                        <tr key={i} className={`${i%2===0 ? 'bg-gray-50' : ''}`}>
                                            <td className={`text-xs divide-y py-3 px-3 font-light`}>{d.Claim_Line_No}</td>
                                            <td className={`text-xs divide-y py-3 px-3 font-light`}>{d?.Tariff_Code} - {d?.Name}</td>
                                            <td className={`text-xs divide-y py-3 px-3 font-light`}>{d.Quantity}</td>
                                            <td className={`text-xs divide-y py-3 px-3 font-light`}>${d.Fee_Amount}</td>
                                            <td className={`text-xs divide-y py-3 px-3 font-light`}>${d.Fee_Amount*d.Quantity}</td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                                <tfoot>
                                <tr>
                                    <td colSpan={3}></td>
                                    <td className='py-2 px-3 border-t border-zinc-100 text-left text-xs'>Total</td>
                                    <td className='py-2 px-3 border-t border-zinc-100 text-xs'>${getTotal()}</td>
                                </tr>
                                </tfoot>
                            </table>
                        </div>
                        <ClaimOptions
                            patient={patient}
                            medical={medical}
                            data={data}
                            claims={getDataFiltered()}
                            cardHolder={cardHolder}
                        />
                    </div>
                )
            }

        </div>
    )
}