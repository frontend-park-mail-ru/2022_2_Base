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
    discount: number | undefined,
    price: number,
    strPrice: string | undefined,
    strLowprice: string | undefined,
}

interface PaymentCardObj {
    expiry: string,
    number: string,
    cvc?: string,
    expiryDate?: Date,
    expirydate?: Date,
    id: number,
    priority?: boolean
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
    avatar: string,
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
    address?: Array<addressCardObj>,
    paymentCard?: Array<PaymentCardObj>,
    isAuth?: boolean,
    avatar?: string,
    username?: string,
    phone?: string,
    deliveryPrice?: string,
    deliveryDate?: string[],
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
    priority?: boolean
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
