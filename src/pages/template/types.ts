export type TEMPLATEOBJECTTYPE = {
    templateId: string;
    name: string;
    locale: string;
    messageBody: string;
    footerText: string;
    button: any;
    status: string;
};

export type FormErrors = {
    name?: string[];
    locale?:  string[],
    button?: string[],
    footerText?:  string[],
    messageBody?:  string[]
};

export const sampleTemplateDetails: TEMPLATEOBJECTTYPE[] = [
	{
		templateId: 'i-24562',
		name: 'My Template',
		locale: 'English (US)',
		messageBody: 'Hello Shakib, I am here to assist you. How can I help you today?',
		footerText: 'You can send text or email us at aaacrm@yorcrm.com',
		button: '',
        status: 'approved'
	},
	{
		templateId: 'i-254562',
		name: 'Welcome Message',
		locale: 'English (US)',
		messageBody: 'Welcome to our service! We are glad to have you here.',
		footerText: 'Best regards, The Team',
		button: '',
        status: 'approved'
	},
	{
		templateId: 'i-112233',
		name: 'Hello Text',
		locale: 'English (US)',
		messageBody: 'This is sample template for testing',
		footerText: 'Best regards, The Team',
		button: '',
        status: 'approved'
	},
	{
		templateId: 'i-11224533',
		name: 'My First Template',
		locale: 'English (US)',
		messageBody: 'Greeting! How may I assist you',
		footerText: 'Best regards, The Team',
		button: '',
        status: 'approved'
	}
]

export const sampleTemplatesList = [
    {
        templateId: 'i-24562',
        name: 'My Template',
        status: 'approved',
        type: 'text',
        actions: 'add',
        updatedAt: '20-Mar-2023'
    },
    {
        templateId: 'i-254562',
        name: 'Welcome Message',
        status: 'approved',
        type: 'text',
        actions: 'add',
        updatedAt: '20-Mar-2023'
    },
    {
        templateId: 'i-112233',
        name: 'Hello Text',
        status: 'draft',
        type: 'text',
        actions: 'add',
        updatedAt: '21-Mar-2023'
    },
    {
        templateId: 'i-11224533',
        name: 'My First Template',
        status: 'submitted',
        type: 'text',
        actions: 'add',
        updatedAt: '21-Mar-2023'
    }
]
