export type OrderTable = {
    Documento: string,
    RazaoSocial: string,
    CEP:string,
    Produto:string
    NumeroPedido: number,
    Date: Date,

}
export type Sales = {
    id:number,
    name:string,
    product:string,
    finalValue:number,
    deliveryDate:Date,
}