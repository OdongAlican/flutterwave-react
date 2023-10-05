import { IRegister } from "../authentication/interface";

export interface IDocument {
    id?: number,
    documentId: string;
    paymentStatus: boolean;
    documentName: string;
    amount: number;
    dateOfPurchase: string;
    user: IRegister
}