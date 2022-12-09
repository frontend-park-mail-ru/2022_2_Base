type emptyCallback = () => void;

type oneParamCallback = (param: any) => void;

type objectFunction = (param: object) => void;

type addListenerFunction = (this: HTMLElement, param: Event) => void;

type actionFunc = (param?: any, optionalParam?: any) => void;
