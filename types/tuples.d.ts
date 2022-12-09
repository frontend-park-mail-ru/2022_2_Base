import PopUpAddPaymentCard from '../public/src/components/popUp/PopUpAddPaymentCard/PopUpAddPaymentCard';
import PopUpAddAddress from '../public/src/components/popUp/PopUpAddAddress/PopUpAddAddress';

type InfoCardBaseInfoObj =
    [HTMLElement, HTMLElement, string,
            PopUpAddPaymentCard | PopUpAddAddress, HandlebarsTemplateDelegate, string];

type RecordString = {[key: string]: string};

type itemPageTuple = [actionFunc, string, string];

type userStoreCollectDataFields = 'avatar' | 'paymentMethods' | 'address';
