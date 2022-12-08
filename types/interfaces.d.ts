import {truncatePrice} from '../public/src/modules/sharedFunctions';
import PopUpAddPaymentCard from '../public/src/components/popUp/PopUpAddPaymentCard/PopUpAddPaymentCard';
import PopUpAddAddress from '../public/src/components/popUp/PopUpAddAddress/PopUpAddAddress';

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

interface validatePaymentCardData {
    expiry: string,
    number: string,
    cvc: string,
}

interface validateAddressData {
    city: string,
    street: string,
    house: string,
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
    favourite: boolean,
}

interface PaymentCardObj {
    name: string,
    email: string,
    phone: string,
    avatar: string,
    id: string,
    addCard?: boolean,
}
