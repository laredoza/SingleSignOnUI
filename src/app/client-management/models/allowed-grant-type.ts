export class AllowedGrantTypes {
    id: number;
    grantType: string;

    constructor(id:number, grantType: string)
    {
        this.id = id;
        this.grantType=grantType;
    }
}
