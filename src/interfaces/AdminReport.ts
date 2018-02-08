export interface AdminReport {
    month: string,
    organisations: [[
        string, // Organisation Name
        number, // Consignment Count
        number, // Collection Count
        number  // Both Count
        ]]
}