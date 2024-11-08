/* eslint-disable @typescript-eslint/no-explicit-any */

import { ParamsType } from "@types";

export type DataItem = any

export interface ProductType {
    price: string;
    color: string;
    date_of_creation: string;
    id: number,
    image_url: string,
    made_in: string,
    model: string,
    name: string,
    storage_id: string
}

export interface ModalPropType {
    open: boolean
    handleClose: ()=> void
    update?: any;
    params:ParamsType
    
}