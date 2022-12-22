interface baseStoreObject {
    callbacks: emptyCallback,
    promise: Promise<string> | null,
}

interface DispatcherCallbackObject {
    callback: emptyCallback | oneParamCallback,
    isPending: boolean,
}

interface priceData {
    lowprice: number | undefined,
    discount?: number | undefined,
    price: number,
    count: number,
    strPrice?: string | undefined,
    strLowprice?: string | undefined,
}

interface PaymentCardObj {
    expiry: string,
    number: string,
    cvc?: string,
    expiryDate?: Date,
    expirydate?: Date,
    id: number,
    priority?: boolean,

    type?: string
}

interface formContextObj {
    fields: object,
    button: {
        buttonValue: string
    }
}

interface topCategoryElement {
    nameCategory: string,
    img: string,
    href: string,
}

interface productObj {
    id: number,
    category: string,
    name: string,
    rating: number,
    commentscount: number,
    lowprice: number,
    count?: number,
    favourite: boolean,
}

interface CardObj {
    name: string,
    email: string,
    phone: string,
    avatar: string | null,
    id: string,
    addCard?: boolean,
}

interface OrderDataObj {
    items: Array<number>,
    address?: number,
    deliveryDate?: string,
    card?: number,
    userid?: number
}

interface summaryPrice {
    sumPrice?: string,
    count?: string,
    noSalePrice?: string,
    priceDiff?: string,
}

interface renderCart {
    address?: addressCardObj,
    paymentCard?: PaymentCardObj,
    isAuth?: boolean,
    avatar?: string,
    username?: string,
    phone?: string,
    deliveryPrice?: string,
    deliveryDate?: string[],
    priority?: boolean
}

interface dispatcherPayload {
    actionName: string,
    data?: any
}

interface addressCardObj {
    id: number,
    city: string,
    street: string,
    house: string,
    priority?: boolean,
    address?: string
}

interface commentObj {
    userid: number,
    itemid: number,
    rating: number,
    pros: string,
    cons: string,
    comment: string

}

interface suggestionSearchObj {
    searchString: string,
    isCategory: boolean
}

interface itemOrderData {
    cont: number,
    items: Array<priceData>,
    totalPrice: string,
    deliveryDateString: string,
    deliveryTimeString: string,
    creationDateString: string,
    creationDate: Date,
    deliveryDate: Date,
    orderstatus: string,
    paymentstatus:string;
}

interface userInfoPopUp {
    newValue?: string,
    id: string,
    value: string
}
