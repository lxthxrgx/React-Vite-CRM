
export interface IShort2D
{
    id:number;
    numberGroup:number;
    nameGroup:string;
}

export interface I2D 
{
    id: number;
    numberGroup:number;
    nameGroup:string;
    pibs:string;
    address:string;
    area:number;
    isAlert:boolean;
    dateCloseDepartment:Date;
}

export interface IGroupsDop
{
    id:number;
    num:string;
    date: Date;
    name:string;
    rnokpp:string;
    status:string;

    certificate_Series:string;
    certificate_Number:string;
    issued:string;

    registration_Date: Date;
    index_Number:string;

    status_Record: string;
}
