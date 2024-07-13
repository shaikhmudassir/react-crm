export type TEMPLATEOBJECTTYPE = {
    name: string;
    locale: string;
    messageBody: string;
    footerText: string;
    button: any
};

export type FormErrors = {
    name?: string[];
    locale?:  string[],
    button?: string[],
    footerText?:  string[],
    messageBody?:  string[]
};
