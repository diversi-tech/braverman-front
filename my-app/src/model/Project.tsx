export interface Project {
    projectId: string
firstName: string
    lastName: string
    businessName: string
    email: string
    source: string
    //  Status :ProjectStatusDto
    endDate: Date
    //  BalanceStatus :ProjectBalanceStatusDto
    createdAt: Date
    updatedAt: Date
    totalPrice: number
    pricePaid: number
    _balance: number

    urlFigma: string
    urlDrive: string
    urlWordpress: string

    //   Tasks: List<TasksDto>?
    // Credentials: List<CredentialsDto>?    

}
