import X2JS from "x2js";
import http from "../../../http";
import toast from "react-hot-toast";
import ToastComponent from "../components/ToastComponent";
import {authKey, identity} from "../../../config";
var x2js = new X2JS();



export const getClaims=()=>http.get('/MedicalAidClaimList').then(res=>{
    return res.data.value
})

export const getClaimTariffs=()=>http.get('/').then(res=>{
    return res.data.value
})

export const sendRealtimePresign=(data)=>{

    return new Promise(function (resolve, reject){


        console.log(data)


        const {claim,claims,cardHolder,auth}=data


       claims.map(c=>{
                c.Type="T"
                c.Number=100
                c.CodeSet="Other"
                c.Code=c.Tariff_Code //tarif Cod
                c.CodeDescription=c.Name //Descriptio
                c.ChargeableUnit="U"
                c.ChargeableQuantity=1
                c.SectionType="W"
                c.ServiceStartDateTime=20220906105359
                c.ServiceEndDateTime=20220906105359
                c.ExternalReferenceNumber="A1223422"
                c.BenefitCode="A223"
                c.BenefitDescription="Descr"
                c.NumberOfConsumables=0
                c.Identifier=0
                c.NumberOfLaboratoryRecords=0
                c.NumberOfToothRecords=0
                c.NumberOfDentalLaboratoryRecords=0
                c.NumberOfOptometryRecords=0
                c.WhomToPay="P"
                c.UpdateIndicator="N"


            // eslint-disable-next-line no-unused-expressions
                c.Authorisation = {
                    PreAuthorisationNumber: "REALTIME",
                    AuthorisationNumber: auth,
                    AuthorisationDate: 20211208
                    },
                c.Procedure= {
                    Stage: "P",
                        CodeSet: "CPT",
                        Code: 43235,
                        Description: "Gastroscopy"
                },
                c.Provider={
                    Role: "SP",
                    PracticeNumber: 50032, //affos number
                    PracticeName: "BAINES AVENUE CLINIC" // baines
                },
                c.Diagnosis= {
                    Stage: "P",
                    CodeSet: "ICD",
                    Code: claim?.ICD10_Code//iCD10 CODE
                },
                c.SubTotalValues= {
                    GrossAmount: 789,
                    NettAmount: 789,
                    ReceiptAmount: 0,
                    LevyAmount: 0,
                    DiscountAmount: 0,
                    GenericSurchargeAmount: 0,
                    PatientPayAmount: 0,
                    OverChargeAmount: 0,
                    ContainerFeeAmount: 0,
                    DispensingFeeAmount: 0,
                    ProfessionalFeeAmount: 0,
                    VarianceAmount: 0
                },
                c.Message= {
                    Type: "I",
                    Code: 10008,
                    Description: "Service request message"
                },
                c.TotalValues= {
                    GrossAmount: 789,
                    NettAmount: 789,
                    ReceiptAmount: 0,
                    LevyAmount: 0,
                    DiscountAmount: 0,
                    GenericSurchargeAmount: 0,
                    PatientPayAmount: 0,
                    OverChargeAmount: 0,
                    ContainerFeeAmount: 0,
                    DispensingFeeAmount: 0,
                    ProfessionalFeeAmount: 0,
                    VarianceAmount: 0
                }


                return c
        })



       claims.forEach(v=>{
            delete v['@odata.etag']
            delete v['Amount_Awarded']
            delete v['Claim_Line_No']
            delete v['Day1']
            delete v['Day2']
            delete v['Day3']
            delete v['Day4']
            delete v['Day5']
            delete v['Document_Claim_No']
            delete v['Fee_Amount']
            delete v['Line_No']
            delete v['Mod1']
            delete v['Mod2']
            delete v['Month']
            delete v['Name']
            delete v['Quantity']
            delete v['Shortfall']
            delete v['Tariff_Code']
            delete v['Tariff_Description']
            delete v['Year']
        })


        console.log(claims)

        const s=[{
            Type: "T",
            Number: 100,
            CodeSet: "Other",
            Code: 90050,//ICD10 Code
            CodeDescription: "Ward Fees",//Description
            ChargeableUnit: "U",
            ChargeableQuantity: 1,
            SectionType: "W",
            ServiceStartDateTime: 20220906105359,
            ServiceEndDateTime: 20220906105359,
            ExternalReferenceNumber: "A1223422",
            BenefitCode: "A223",
            BenefitDescription: "Descr",
            NumberOfConsumables: 0,
            Identifier: 0,
            NumberOfLaboratoryRecords: 0,
            NumberOfToothRecords: 0,
            NumberOfDentalLaboratoryRecords: 0,
            NumberOfOptometryRecords: 0,
            WhomToPay: "P",
            UpdateIndicator: "N",
            Authorisation: {
                PreAuthorisationNumber: "REALTIME",
                AuthorisationNumber: auth,
                AuthorisationDate: 20211208
            },
            Procedure: {
                Stage: "P",
                CodeSet: "CPT",
                Code: 43235,
                Description: "Gastroscopy"
            },
            Provider: {
                Role: "SP",
                PracticeNumber: 2291,
                PracticeName: "provider_number"
            },
            Diagnosis: {
                Stage: "P",
                CodeSet: "ICD",
                Code: "E98.1"
            },
            SubTotalValues: {
                GrossAmount: 789,
                NettAmount: 789,
                ReceiptAmount: 0,
                LevyAmount: 0,
                DiscountAmount: 0,
                GenericSurchargeAmount: 0,
                PatientPayAmount: 0,
                OverChargeAmount: 0,
                ContainerFeeAmount: 0,
                DispensingFeeAmount: 0,
                ProfessionalFeeAmount: 0,
                VarianceAmount: 0
            },
            Message: {
                Type: "I",
                Code: 10008,
                Description: "Service request message"
            },
            TotalValues: {
                GrossAmount: 789,
                NettAmount: 789,
                ReceiptAmount: 0,
                LevyAmount: 0,
                DiscountAmount: 0,
                GenericSurchargeAmount: 0,
                PatientPayAmount: 0,
                OverChargeAmount: 0,
                ContainerFeeAmount: 0,
                DispensingFeeAmount: 0,
                ProfessionalFeeAmount: 0,
                VarianceAmount: 0
            }
        }]
        console.log(s)



        const req={
            Request: {
                Transaction: {
                    VersionNumber: 2.1,
                    Type: "CL",
                    Number: 1418,
                    DestinationCode: cardHolder.bio_code+"A",
                    SoftwareIdentifier: "WCHMS",
                    OriginalSoftwareIdentifier: "CAREMEDSOL",
                    DateTime: 20220906105359,
                    TransactionLink: "NA",
                    TestClaimIndicator: "Y",
                    CountryISOCode: "ZW"
                },
                Provider: {
                    Role: "SP",
                    PracticeNumber: 50032, //affos number
                    PracticeName: "BAINES AVENUE CLINIC" // baines
                },
                Member: {
                    MedicalSchemeNumber: cardHolder.MemberShipNumber, // member number
                    MedicalSchemeName: cardHolder.bio_code //"Cellmed Premium USD" // medical aid name
                },
                Patient: {
                    DependantCode: 0,
                    NewBornIndicator: "N",
                    Personal: {
                        Title: cardHolder.Title, //ed title
                        Surname: cardHolder.Surname, //ed surname
                        FirstName: cardHolder.FirstName, //ed name
                        Initials: cardHolder.Initials, //ed initials
                        Gender: cardHolder.Gender, //ed g
                        IDNumber: cardHolder.NationalIDNumber, //ed number
                        IDType: "ID", // ed
                        DateOfBirth: cardHolder.DateOfBirth
                    }
                },
                ClaimHeader: {
                    ClaimNumber: claim.Episode_ID,
                    ClaimDateTime: 20220906105359,
                    TotalServices: 1,
                    TotalConsumables: 0,
                    WhomToPay: "P",
                    InHospitalIndicator: "N",
                    MVAIndicator: "N",
                    IODIndicator: "N",
                    AccidentIndicator: "N",
                    EmergencyIndicator: "N",
                    DateOfAccident: 20220906105359,
                    WCANo: "NA",
                    BatchNumber: "NA",
                    BatchDateTime: 20220906105359,
                    Authorisation: {
                        PreAuthorisationNumber: "REALTIME",
                        AuthorisationNumber: auth
                    },
                    TotalValues: {
                        GrossAmount: 780000,
                        NettAmount: 789,
                        ReceiptAmount: 0,
                        LevyAmount: 0,
                        DiscountAmount: 0,
                        GenericSurchargeAmount: 0,
                        PatientPayAmount: 0,
                        OverChargeAmount: 0,
                        ContainerFeeAmount: 0,
                        DispensingFeeAmount: 0,
                        ProfessionalFeeAmount: 0,
                        VarianceAmount: 0
                    }
                },
               // Service:claims
                Service:claims
            }
        }


        const Request=OBJtoXML(req)


        var xhr = new XMLHttpRequest();
        xhr.open(
            'POST',
            '/apacewebservices/ZMF?wsdl',
            true
        );


        var src=`
        <x:Envelope
        xmlns:x="http://schemas.xmlsoap.org/soap/envelope/"
        xmlns:apa="http://apace.systems/apacewebservices/"
        xmlns:zmf="http://zieto.co.za/claim/zmf"
>
    <x:Header>
        <apa:secureToken>${authKey}</apa:secureToken>
    </x:Header>
    <x:Body>
        <apa:processZMF>
            <apa:ZMF2_1Request>
                <zmf:Claim>
                    ${Request}
                </zmf:Claim>
            </apa:ZMF2_1Request>
        </apa:processZMF>
    </x:Body>
</x:Envelope>
        `;

        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');


        xhr.onreadystatechange = () => {// Call a function when the state changes.

            if(xhr.readyState === XMLHttpRequest.DONE){
                if(xhr.status === 200){


                    const json=x2js.xml2js(xhr.responseText.toString())


                    const x=json
                        .Envelope
                        .Body
                        .processZMFResponse
                        .ZMF2_1Response
                        .Claim
                        .Response


                        const ClaimHeader=x.ClaimHeaderResponse

                    const Message=ClaimHeader.Message[1].Description.toString()

                    console.log(x)
                    console.log(Message)

                    if(ClaimHeader?.ResponseCode?.toString()==='R'){
                        reject(Message)
                    }



                    // const key=x?.AuthorisationKey?.toString()
                    // const Status=x?.Status?.toString()
                    // const Message=x?.Message?.toString()






                    // if(Status?.toUpperCase()==='F'){
                    //     toast.custom(()=>{
                    //         return (
                    //             <ToastComponent
                    //                 description={Message}
                    //                 type={'warning'}
                    //             />
                    //         )
                    //     })
                    //     return reject(Error(Message))
                    // }
                    //
                    //
                    //
                    //
                    //
                    // if(Status?.toUpperCase()==='S'){
                    //     toast.custom(()=>{
                    //         return (
                    //             <ToastComponent
                    //                 description={Message}
                    //                 type={'success'}
                    //             />
                    //         )
                    //     })
                    //
                    //     return resolve(key)
                    // }




                }
                else{
                    return reject(Error('Something went wrong'))
                }
            }

        }
        xhr.send(src);

    })
}

export const sendClaimByPass=(data)=>{
    console.log(data)
}

export const sendClaimBioLinking=(data)=>{
    console.log(data)
}

export const sendClaimPresignRequest=(data)=>{
    return new Promise(function (resolve, reject){
        var xhr = new XMLHttpRequest();
        xhr.open(
            'POST',
            '/apacewebservices/ABF1_1?wsdl',
            true
        );


        var src=`
        <x:Envelope
        xmlns:x="http://schemas.xmlsoap.org/soap/envelope/"
        xmlns:apa="http://apace.systems/apacewebservices/"
        xmlns:urn="urn:apace:biometric:format:1.1">
    <x:Header>
        <apa:secureToken>${authKey}</apa:secureToken>
    </x:Header>
    <x:Body>
        <apa:process>
            <apa:request>
                <urn:Biometric>
                    <urn:Request>
                        <urn:Transaction>
                            <urn:VersionNumber>1.1</urn:VersionNumber>
                            <urn:Type>REQ</urn:Type>
                            <urn:Number>24892348347</urn:Number>
                            <urn:SystemIdentifier>${identity}</urn:SystemIdentifier>
                            <urn:DestinationCode>${data.cardHolder.bio_code+'A'}</urn:DestinationCode>
                            <urn:CountryCode>ZW</urn:CountryCode>
                            <urn:Timestamp TimeZone="Africa/Harare">20211124153406</urn:Timestamp>
                            <urn:TestIndicator>Y</urn:TestIndicator>
                            <urn:User>50032/mziwani</urn:User>
                        </urn:Transaction>
                        <urn:Client NumberOfBioRecords="1">
                            <urn:Action>PRESIGN</urn:Action>
                            <urn:ClientCodeType>MED</urn:ClientCodeType>
                            <urn:ClientCode>${data.cardHolder.bio_code}^${data.cardHolder.MemberShipNumber}^${data.cardHolder.suffix}</urn:ClientCode>
                            <urn:ClientSubCode>00</urn:ClientSubCode>
                            <urn:OverrideIndicator>N</urn:OverrideIndicator>
                            <urn:OverrideReason>NA</urn:OverrideReason>
                            <urn:BiometricData SequenceNumber="1">
                                <urn:Type>FPI</urn:Type>
                                <urn:Indicator>RT</urn:Indicator>
                                <urn:Data>${data?.finger}</urn:Data>
                            </urn:BiometricData>
                        </urn:Client>
                    </urn:Request>
                </urn:Biometric>
            </apa:request>
        </apa:process>
    </x:Body>
</x:Envelope>
        `;

        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');


        xhr.onreadystatechange = () => {// Call a function when the state changes.

            if(xhr.readyState === XMLHttpRequest.DONE){
                if(xhr.status === 200){


                    const json=x2js.xml2js(xhr.responseText.toString())


                    const x=json.Envelope
                        .Body
                        .processResponse
                        .response
                        .Biometric
                        .Response
                        .ClientResponse


                    const key=x?.AuthorisationKey?.toString()
                    const Status=x?.Status?.toString()
                    const Message=x?.Message?.toString()


                    if(Status?.toUpperCase()==='F'){
                        toast.custom(()=>{
                            return (
                                <ToastComponent
                                    description={Message}
                                    type={'warning'}
                                />
                            )
                        })
                       return reject(Error(Message))
                    }





                    if(Status?.toUpperCase()==='S'){
                        toast.custom(()=>{
                            return (
                                <ToastComponent
                                    description={Message}
                                    type={'success'}
                                />
                            )
                        })

                        return resolve(key)
                    }




                }
                else{
                    return reject(Error('Something went wrong'))
                }
            }

        }
        xhr.send(src);

    })
}

export const sendBiometricVerification=(data)=>{

    return new Promise(function (resolve,reject){

        var xhr = new XMLHttpRequest();
        xhr.open(
            'POST',
            'apacewebservices/ABF1_1?wsdl',
            true
        );


        var src=`
        <x:Envelope
        xmlns:x="http://schemas.xmlsoap.org/soap/envelope/"
        xmlns:apa="http://apace.systems/apacewebservices/"
        xmlns:urn="urn:apace:member:format:1.0">
    <x:Header>
        <apa:secureToken>${authKey}</apa:secureToken>
    </x:Header>


    <x:Body xmlns:x="http://schemas.xmlsoap.org/soap/envelope/">
        <apa:process xmlns:apa="http://apace.systems/apacewebservices/">
            <apa:request>
                <ns3:Biometric xmlns:ns3="urn:apace:biometric:format:1.1">
                    <ns3:Request>
                        <ns3:Transaction>
                            <ns3:VersionNumber xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="xs:string">1.1</ns3:VersionNumber>
                            <ns3:Type>REQ</ns3:Type>
                            <ns3:Number>DRMS-4543-1661426551910-50</ns3:Number>
                            <ns3:SystemIdentifier>${identity}</ns3:SystemIdentifier>
                            <ns3:DestinationCode>${data?.bio_code+'A'}</ns3:DestinationCode>
                            <ns3:CountryCode>ZW</ns3:CountryCode>
                            <ns3:Timestamp TimeZone="Africa/Harare">20220825132231</ns3:Timestamp>
                            <ns3:TestIndicator>Y</ns3:TestIndicator>
                            <ns3:User>18230/18230</ns3:User>
                        </ns3:Transaction>
                        <ns3:Client NumberOfBioRecords="10">
                            <ns3:Action>VERIFY</ns3:Action>
                            <ns3:ClientCodeType>MED</ns3:ClientCodeType>
                            <ns3:ClientCode>${data?.bio_code}^${data?.member_number}^${data?.suffix}</ns3:ClientCode>
                            <ns3:OverrideIndicator>N</ns3:OverrideIndicator>
                                                       
                            <ns3:BiometricData SequenceNumber="1">
                                <ns3:Type>FPI</ns3:Type>
                                <ns3:Indicator>RT</ns3:Indicator>
                                <ns3:Data>${data?.finger?.bio?.TemplateBase64}</ns3:Data>
                            </ns3:BiometricData>
                            
                            
                        </ns3:Client>
                    </ns3:Request>
                </ns3:Biometric>
            </apa:request>
        </apa:process>
    </x:Body>
</x:Envelope>
        `;

        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');


        xhr.onreadystatechange = () => {// Call a function when the state changes.

            if(xhr.readyState === XMLHttpRequest.DONE){
                if(xhr.status === 200){

                    const json=x2js.xml2js(xhr.responseText.toString())




                    const x=json.Envelope
                        .Body
                        .processResponse
                        .response
                        .Biometric
                        .Response
                        .ClientResponse



                    console.log(x)



                    console.log(x)
                    const bio=x?.BiometricDataResponse[0] ?? []
                    const Message=x?.Message?.toString() ?? ''

                    console.log(x.Status.toString())


                    if(x?.Status?.toString()?.toUpperCase()==='F'){
                        toast.custom(()=>{
                            return (
                                <ToastComponent
                                    description={Message}
                                    type={'warning'}
                                />
                            )
                        })
                        return reject(Error(Message))
                    }


                    if(x?.Status?.toString()?.toUpperCase()==='S'){
                        return resolve('Persons biometrics has been successfuly verified')
                    }

                }
                else{
                    reject(Error('Something went wrong'))
                }
            }

        }
        xhr.send(src);


    })
}

export const sendBiometricEnrollment=(data)=>{
    return new Promise(function (resolve,reject){


        var xhr = new XMLHttpRequest();
        xhr.open(
            'POST',
            'apacewebservices/ABF1_1?wsdl',
            true
        );


        var src=`
        <x:Envelope
        xmlns:x="http://schemas.xmlsoap.org/soap/envelope/"
        xmlns:apa="http://apace.systems/apacewebservices/"
        xmlns:urn="urn:apace:member:format:1.0">
    <x:Header>
        <apa:secureToken>${authKey}</apa:secureToken>
    </x:Header>


    <x:Body xmlns:x="http://schemas.xmlsoap.org/soap/envelope/">
        <apa:process xmlns:apa="http://apace.systems/apacewebservices/">
            <apa:request>
                <ns3:Biometric xmlns:ns3="urn:apace:biometric:format:1.1">
                    <ns3:Request>
                        <ns3:Transaction>
                            <ns3:VersionNumber xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="xs:string">1.1</ns3:VersionNumber>
                            <ns3:Type>REQ</ns3:Type>
                            <ns3:Number>DRMS-4543-1661426551910-50</ns3:Number>
                            <ns3:SystemIdentifier>${identity}</ns3:SystemIdentifier>
                            <ns3:DestinationCode>${data?.bio_code+'A'}</ns3:DestinationCode>
                            <ns3:CountryCode>ZW</ns3:CountryCode>
                            <ns3:Timestamp TimeZone="Africa/Harare">20220825132231</ns3:Timestamp>
                            <ns3:TestIndicator>Y</ns3:TestIndicator>
                            <ns3:User>18230/18230</ns3:User>
                        </ns3:Transaction>
                        <ns3:Client NumberOfBioRecords="10">
                            <ns3:Action>ENROL</ns3:Action>
                            <ns3:ClientCodeType>MED</ns3:ClientCodeType>
                            <ns3:ClientCode>${data?.bio_code}^${data?.member_number}^${data?.suffix}</ns3:ClientCode>
                            <ns3:OverrideIndicator>N</ns3:OverrideIndicator>
                            
                            <ns3:BiometricData SequenceNumber="1">
                                <ns3:Type>FPI</ns3:Type>
                                <ns3:Indicator>${data?.fingers[0]?.code}</ns3:Indicator>
                                <ns3:Data>${data?.fingers[0]?.bio?.TemplateBase64}</ns3:Data>
                            </ns3:BiometricData>
                            
                            <ns3:BiometricData SequenceNumber="1">
                                <ns3:Type>FPI</ns3:Type>
                                <ns3:Indicator>${data?.fingers[1]?.code}</ns3:Indicator>
                                <ns3:Data>${data?.fingers[1]?.bio?.TemplateBase64}</ns3:Data>
                            </ns3:BiometricData>
                            
                            
                            <ns3:BiometricData SequenceNumber="1">
                                <ns3:Type>FPI</ns3:Type>
                                <ns3:Indicator>${data?.fingers[2]?.code}</ns3:Indicator>
                                <ns3:Data>${data?.fingers[2]?.bio?.TemplateBase64}</ns3:Data>
                            </ns3:BiometricData>
                            
                            <ns3:BiometricData SequenceNumber="1">
                                <ns3:Type>FPI</ns3:Type>
                                <ns3:Indicator>${data?.fingers[3]?.code}</ns3:Indicator>
                                <ns3:Data>${data?.fingers[3]?.bio?.TemplateBase64}</ns3:Data>
                            </ns3:BiometricData>
                            
                             <ns3:BiometricData SequenceNumber="1">
                                <ns3:Type>FPI</ns3:Type>
                                <ns3:Indicator>${data?.fingers[4]?.code}</ns3:Indicator>
                                <ns3:Data>${data?.fingers[4]?.bio?.TemplateBase64}</ns3:Data>
                            </ns3:BiometricData>
                            
                             <ns3:BiometricData SequenceNumber="1">
                                <ns3:Type>FPI</ns3:Type>
                                <ns3:Indicator>${data?.fingers[5]?.code}</ns3:Indicator>
                                <ns3:Data>${data?.fingers[5]?.bio?.TemplateBase64}</ns3:Data>
                            </ns3:BiometricData>                          
                           
                            
                        </ns3:Client>
                    </ns3:Request>
                </ns3:Biometric>
            </apa:request>
        </apa:process>
    </x:Body>
</x:Envelope>
        `;

        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');


        xhr.onreadystatechange = () => {// Call a function when the state changes.

            if(xhr.readyState === XMLHttpRequest.DONE){
                if(xhr.status === 200){

                    const json=x2js.xml2js(xhr.responseText.toString())

                    const x=json.Envelope
                        .Body
                        .processResponse
                        .response
                        .Biometric
                        .Response
                        .ClientResponse


                    console.log(x)
                    const bio=x?.BiometricDataResponse[0] ?? []
                    const Message=x?.Message?.toString() ?? ''

                    console.log(x.Status.toString())


                    if(x?.Status?.toString()?.toUpperCase()==='F'){
                        toast.custom(()=>{
                            return (
                                <ToastComponent
                                    description={Message}
                                    type={'warning'}
                                />
                            )
                        })
                        return reject(Error(Message))
                    }


                    if(x?.Status?.toString()?.toUpperCase()==='S'){
                        return resolve('Person is successfully enrolled')
                    }

                }
                else{
                    reject(Error('Something went wrong'))
                }
            }

        }
        xhr.send(src);


    })
}

export const searchFromHealth263 = (state)=>{

    return new Promise(function (resolve,reject){



        var xhr = new XMLHttpRequest();
        xhr.open(
            'POST',
            '/apacewebservices/AMF1_0?wsdl',
            true
        );


        var src=`<x:Envelope 
    xmlns:x="http://schemas.xmlsoap.org/soap/envelope/"
    xmlns:apa="http://apace.systems/apacewebservices/"
    xmlns:urn="urn:apace:member:format:1.0">
    <x:Header>
        <apa:secureToken>eb4eeb1e9e03493e2d1db0e524c7da98f0bb2a11ad991335d0ee038560704906</apa:secureToken>
    </x:Header>
\t
\t
<x:Body xmlns:x="http://schemas.xmlsoap.org/soap/envelope/">
    <apa:process xmlns:apa="http://apace.systems/apacewebservices/">
        <apa:request>
            <urn:Member xmlns:urn="urn:apace:member:format:1.0">
                <urn:Request>
                    <urn:Transaction>
                        <urn:VersionNumber>1.0</urn:VersionNumber>
                        <urn:Number>24892348345</urn:Number>
                        <urn:SystemIdentifier>WCHMS</urn:SystemIdentifier>
                        <urn:DestinationCode>${state.bio_code+'A'}</urn:DestinationCode>
                        <urn:ClientCountryCode>ZW</urn:ClientCountryCode>
                        <urn:Timestamp TimeZone="Africa/Harare">20211124153406</urn:Timestamp>
                        <urn:TestIndicator>Y</urn:TestIndicator>
                        <urn:User>698437/mziwani</urn:User>
                    </urn:Transaction>
                    <urn:MembershipLookup>
                        <urn:IncludeDetail>Y</urn:IncludeDetail>
                        <urn:Funder>${state.bio_code}</urn:Funder>
                        <urn:WithMembershipNumber>
                            <urn:MembershipNumber>${state.member_number}</urn:MembershipNumber>
                            <urn:DependentCode>${state.suffix}</urn:DependentCode>
                        </urn:WithMembershipNumber>
                    </urn:MembershipLookup>
                </urn:Request>
            </urn:Member>
        </apa:request>
    </apa:process>
</x:Body>
</x:Envelope>`;

        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');




        xhr.onreadystatechange = () => {// Call a function when the state changes.

            if(xhr.readyState === XMLHttpRequest.DONE){
                console.log(xhr.status)
                if(xhr.status === 200){

                    const json=x2js.xml2js(xhr.responseText.toString())

                    const x=json.Envelope.Body.processResponse.response.Member.Response


                    const msg=x.Message


                    if(msg.length>=2){
                        return reject(Error('Member not found'))
                    }

                    const d=x?.Membership?.Beneficiary

                    const Status=d?.Status?.toString() ?? ''
                    const BiometricEnrolmentStatus=d?.BiometricEnrolmentStatus?.toString() ?? ''


                    const data=d?.BeneficiaryDetail
                    const FirstName=data?.FirstName?.toString() ?? ''
                    const BenefitDate=data?.BenefitDate?.toString() ?? ''
                    const DateOfBirth=data?.DateOfBirth?.toString() ?? ''
                    const EmployerGroup=data?.EmployerGroup?.toString() ?? ''
                    const Gender=data?.Gender?.toString() ?? ''
                    const Initials=data?.Initials?.toString() ?? ''
                    const JoinDate=data?.JoinDate?.toString() ?? ''
                    const Language=data?.Language?.toString() ?? ''
                    const MaritalStatus=data?.MaritalStatus?.toString() ?? ''
                    const NationalIDNumber=data?.NationalIDNumber?.toString() ?? ''
                    const Surname=data?.Surname?.toString() ?? ''
                    const Title=data?.Title?.toString() ?? ''

                    //contacts details
                    const contact=d?.ContactDetail;
                    const Work=contact.Work?.toString() ?? ''
                    const MobilePrimary=contact.MobilePrimary?.toString() ?? ''
                    const MemberShipNumber=x?.Membership?.MembershipNumber?.toString() ?? ''
                    const MemberNo=''
                    const Address=d?.Address ?? []


                    const result={
                        Status,
                        BiometricEnrolmentStatus,
                        FirstName,
                        BenefitDate,
                        DateOfBirth,
                        EmployerGroup,
                        Gender,
                        Initials,
                        JoinDate,
                        Language,
                        MaritalStatus,
                        NationalIDNumber,
                        Surname,
                        Title,
                        Work,
                        MobilePrimary,
                        MemberShipNumber,
                        MemberNo,
                        Address,
                    }
                    return resolve(result)

                }
            }

        }
        xhr.send(src);
    })
}

export const sendClaims=(values)=>{
    return new Promise(function (resolve,reject){

        var xhr = new XMLHttpRequest();
        xhr.open(
            'POST',
            '/apacewebservices/ZMF?wsdl',
            true
        );


        var src=`
        <x:Envelope
  xmlns:x="http://schemas.xmlsoap.org/soap/envelope/"
  xmlns:apa="http://apace.systems/apacewebservices/"
  xmlns:zmf="http://zieto.co.za/claim/zmf"
>
  <x:Header>
    <apa:secureToken>eb4eeb1e9e03493e2d1db0e524c7da98f0bb2a11ad991335d0ee038560704906</apa:secureToken>
  </x:Header>
  <x:Body>
    <apa:processZMF>
      <apa:ZMF2_1Request>
        <zmf:Claim>
          <zmf:Request>
            <zmf:Transaction>
              <zmf:VersionNumber>2.1</zmf:VersionNumber>
              <zmf:Type>CL</zmf:Type>
              <zmf:Number>1418</zmf:Number>
              <zmf:DestinationCode>CMPUZWA</zmf:DestinationCode>
              <zmf:SoftwareIdentifier>WCHMS</zmf:SoftwareIdentifier>
              <zmf:OriginalSoftwareIdentifier>CAREMEDSOL</zmf:OriginalSoftwareIdentifier>
              <zmf:DateTime>20220906105359</zmf:DateTime>
              <zmf:TransactionLink>NA</zmf:TransactionLink>
              <zmf:TestClaimIndicator>Y</zmf:TestClaimIndicator>
              <zmf:CountryISOCode>ZW</zmf:CountryISOCode>
            </zmf:Transaction>
            <zmf:Provider>
              <zmf:Role>SP</zmf:Role>
              <zmf:PracticeNumber>02291</zmf:PracticeNumber>
              <zmf:PracticeName>provider_number</zmf:PracticeName>
            </zmf:Provider>
            <zmf:Member>
              <zmf:MedicalSchemeNumber>201000594</zmf:MedicalSchemeNumber>
              <zmf:MedicalSchemeName>Cellmed Premium USD</zmf:MedicalSchemeName>
            </zmf:Member>
            <zmf:Patient>
              <zmf:DependantCode>00</zmf:DependantCode>
              <zmf:NewBornIndicator>N</zmf:NewBornIndicator>
              <zmf:Personal>
                <zmf:Title>MS</zmf:Title>
                <zmf:Surname>NYAHUNDA</zmf:Surname>
                <zmf:FirstName>MEGINA</zmf:FirstName>
                <zmf:Initials>M</zmf:Initials>
                <zmf:Gender>F</zmf:Gender>
                <zmf:IDNumber>22143325F04</zmf:IDNumber>
                <zmf:IDType>ID</zmf:IDType>
                <zmf:DateOfBirth>19740201</zmf:DateOfBirth>
              </zmf:Personal>
            </zmf:Patient>
            <zmf:ClaimHeader>
              <zmf:ClaimNumber>1ru4mde158kwsxjv8b</zmf:ClaimNumber>
              <zmf:ClaimDateTime>20220906105359</zmf:ClaimDateTime>
              <zmf:TotalServices>1</zmf:TotalServices>
              <zmf:TotalConsumables>0</zmf:TotalConsumables>
              <zmf:WhomToPay>P</zmf:WhomToPay>
              <zmf:InHospitalIndicator>N</zmf:InHospitalIndicator>
              <zmf:MVAIndicator>N</zmf:MVAIndicator>
              <zmf:IODIndicator>N</zmf:IODIndicator>
              <zmf:AccidentIndicator>N</zmf:AccidentIndicator>
              <zmf:EmergencyIndicator>N</zmf:EmergencyIndicator>
              <zmf:DateOfAccident>20220906105359</zmf:DateOfAccident>
              <zmf:WCANo>NA</zmf:WCANo>
              <zmf:BatchNumber>NA</zmf:BatchNumber>
              <zmf:BatchDateTime>20220906105359</zmf:BatchDateTime>
              <zmf:Authorisation>
                <zmf:PreAuthorisationNumber>BIOBYPASS</zmf:PreAuthorisationNumber>
                <zmf:AuthorisationNumber>WRKFW</zmf:AuthorisationNumber>
              </zmf:Authorisation>
              <zmf:TotalValues>
                <zmf:GrossAmount>789</zmf:GrossAmount>
                <zmf:NettAmount>789</zmf:NettAmount>
                <zmf:ReceiptAmount>0</zmf:ReceiptAmount>
                <zmf:LevyAmount>0</zmf:LevyAmount>
                <zmf:DiscountAmount>0</zmf:DiscountAmount>
                <zmf:GenericSurchargeAmount>0</zmf:GenericSurchargeAmount>
                <zmf:PatientPayAmount>0</zmf:PatientPayAmount>
                <zmf:OverChargeAmount>0</zmf:OverChargeAmount>
                <zmf:ContainerFeeAmount>0</zmf:ContainerFeeAmount>
                <zmf:DispensingFeeAmount>0</zmf:DispensingFeeAmount>
                <zmf:ProfessionalFeeAmount>0</zmf:ProfessionalFeeAmount>
                <zmf:VarianceAmount>0</zmf:VarianceAmount>
              </zmf:TotalValues>
            </zmf:ClaimHeader>
            <zmf:Service>
              <zmf:Type>T</zmf:Type>
              <zmf:Number>1</zmf:Number>
              <zmf:CodeSet>NHRPL</zmf:CodeSet>
              <zmf:Code>57248</zmf:Code>
              <zmf:CodeDescription>Ward Fees</zmf:CodeDescription>
              <zmf:ChargeableUnit>U</zmf:ChargeableUnit>
              <zmf:ChargeableQuantity>1</zmf:ChargeableQuantity>
              <zmf:SectionType>W</zmf:SectionType>
              <zmf:ServiceStartDateTime>20220906105359</zmf:ServiceStartDateTime>
              <zmf:ServiceEndDateTime>20220906105359</zmf:ServiceEndDateTime>
              <zmf:ExternalReferenceNumber>A1223422</zmf:ExternalReferenceNumber>
              <zmf:BenefitCode>A223</zmf:BenefitCode>
              <zmf:BenefitDescription>Descr</zmf:BenefitDescription>
              <zmf:NumberOfConsumables>0</zmf:NumberOfConsumables>
              <zmf:Identifier>0</zmf:Identifier>
              <zmf:NumberOfLaboratoryRecords>0</zmf:NumberOfLaboratoryRecords>
              <zmf:NumberOfToothRecords>0</zmf:NumberOfToothRecords>
              <zmf:NumberOfDentalLaboratoryRecords>0</zmf:NumberOfDentalLaboratoryRecords>
              <zmf:NumberOfOptometryRecords>0</zmf:NumberOfOptometryRecords>
              <zmf:WhomToPay>P</zmf:WhomToPay>
              <zmf:UpdateIndicator>N</zmf:UpdateIndicator>
              <zmf:Authorisation>
                <zmf:PreAuthorisationNumber>BIOBYPASS</zmf:PreAuthorisationNumber>
                <zmf:AuthorisationNumber>WRKFW</zmf:AuthorisationNumber>
                <zmf:AuthorisationDate>20211208</zmf:AuthorisationDate>
              </zmf:Authorisation>
              <zmf:Procedure>
                <zmf:Stage>P</zmf:Stage>
                <zmf:CodeSet>CPT</zmf:CodeSet>
                <zmf:Code>43235</zmf:Code>
                <zmf:Description>Gastroscopy</zmf:Description>
              </zmf:Procedure>
              <zmf:Provider>
                <zmf:Role>SP</zmf:Role>
                <zmf:PracticeNumber>02291</zmf:PracticeNumber>
                <zmf:PracticeName>provider_number</zmf:PracticeName>
              </zmf:Provider>
              <zmf:Diagnosis>
                <zmf:Stage>P</zmf:Stage>
                <zmf:CodeSet>ICD</zmf:CodeSet>
                <zmf:Code>E98.1</zmf:Code>
              </zmf:Diagnosis>
              <zmf:SubTotalValues>
                <zmf:GrossAmount>789</zmf:GrossAmount>
                <zmf:NettAmount>789</zmf:NettAmount>
                <zmf:ReceiptAmount>0</zmf:ReceiptAmount>
                <zmf:LevyAmount>0</zmf:LevyAmount>
                <zmf:DiscountAmount>0</zmf:DiscountAmount>
                <zmf:GenericSurchargeAmount>0</zmf:GenericSurchargeAmount>
                <zmf:PatientPayAmount>0</zmf:PatientPayAmount>
                <zmf:OverChargeAmount>0</zmf:OverChargeAmount>
                <zmf:ContainerFeeAmount>0</zmf:ContainerFeeAmount>
                <zmf:DispensingFeeAmount>0</zmf:DispensingFeeAmount>
                <zmf:ProfessionalFeeAmount>0</zmf:ProfessionalFeeAmount>
                <zmf:VarianceAmount>0</zmf:VarianceAmount>
              </zmf:SubTotalValues>
              <zmf:Message>
                <zmf:Type>I</zmf:Type>
                <zmf:Code>10008</zmf:Code>
                <zmf:Description>Service request message</zmf:Description>
              </zmf:Message>
              <zmf:TotalValues>
                <zmf:GrossAmount>789</zmf:GrossAmount>
                <zmf:NettAmount>789</zmf:NettAmount>
                <zmf:ReceiptAmount>0</zmf:ReceiptAmount>
                <zmf:LevyAmount>0</zmf:LevyAmount>
                <zmf:DiscountAmount>0</zmf:DiscountAmount>
                <zmf:GenericSurchargeAmount>0</zmf:GenericSurchargeAmount>
                <zmf:PatientPayAmount>0</zmf:PatientPayAmount>
                <zmf:OverChargeAmount>0</zmf:OverChargeAmount>
                <zmf:ContainerFeeAmount>0</zmf:ContainerFeeAmount>
                <zmf:DispensingFeeAmount>0</zmf:DispensingFeeAmount>
                <zmf:ProfessionalFeeAmount>0</zmf:ProfessionalFeeAmount>
                <zmf:VarianceAmount>0</zmf:VarianceAmount>
              </zmf:TotalValues>
            </zmf:Service>
          </zmf:Request>
        </zmf:Claim>
      </apa:ZMF2_1Request>
    </apa:processZMF>
  </x:Body>
</x:Envelope>
        `;

        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');




        xhr.onreadystatechange = () => {// Call a function when the state changes.

            if(xhr.readyState === XMLHttpRequest.DONE){
                console.log(xhr.status)
                if(xhr.status === 200){

                    const json=x2js.xml2js(xhr.responseText.toString())

                    const x=json
                    console.log(x)


                    const result={
                        message:'this is the message of success'
                    }
                    return resolve(result)

                }
            }

        }
        xhr.send(src);
    })
}

export const _saveToHealth263=(data)=>{
    console.log(data)
}

export function OBJtoXML(obj) {
    var xml = '';
    for (var prop in obj) {
        xml += obj[prop] instanceof Array ? '' : "<zmf:" + prop.charAt(0).toUpperCase()+prop.slice(1) + ">";
        if (obj[prop] instanceof Array) {
            for (var array in obj[prop]) {
                xml += "<zmf:" + prop.charAt(0).toUpperCase()+prop.slice(1) + ">";
                xml += OBJtoXML(new Object(obj[prop][array]));
                xml += "</zmf:" + prop.charAt(0).toUpperCase()+prop.slice(1) + ">";
            }
        } else if (typeof obj[prop] == "object") {
            xml += OBJtoXML(new Object(obj[prop]));
        } else {
            xml += obj[prop];
        }
        xml += obj[prop] instanceof Array ? '' : "</zmf:" + prop.charAt(0).toUpperCase()+prop.slice(1) + ">";
    }
    var xml = xml.replace(/<\/?[0-9]{1,}>/g, '');
    return xml
}