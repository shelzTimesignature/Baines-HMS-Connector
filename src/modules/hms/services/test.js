const Service= {
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
}