export const accessTokenKey: string = "@access-token";
export const isAuthenticated: string = "@is-authenticated";
export const entriesColumns: Array<{
    value: string;
    label: string
}> = [
        {
            value: 'cm:title',
            label: 'Document Title'
        },
        {
            value: 'ldc:court',
            label: 'Court'
        },
        {
            value: 'ldc:parties',
            label: 'Parties'
        },
        {
            value: 'ldc:judgementDate',
            label: 'Judgment Date'
        },
        {
            value: 'ldc:judge',
            label: 'Judge Name'
        },
        {
            value: 'ldc:subjectMatter',
            label: 'Subject Matter'
        },
    ];

export const crudState: {
    [key: string]: {
        value: string,
        key: string
    }
} = {
    create: {
        value: 'create',
        key: 'Create'
    },
    update: {
        value: 'update',
        key: 'Update'
    },
    read: {
        value: 'read',
        key: 'Read'
    },
    delete: {
        value: 'delete',
        key: 'Delete'
    }
};

export const authComponents: {
    register: string;
    login: string
} = {
    register: 'resgister',
    login: 'login'
};

export const documentTypes: {
    [key: string]: string
} = {
    'legal document': 'legal document',
    'high court bulletings': 'high court bulletings',
    'online law report': 'online law report',
    'journal': 'journal'
}

export const documentTypesArray: Array<{
    value: string;
    label: string
}> = [
        {
            value: 'high court bulletings',
            label: 'High Court Bulletings'
        },
        {
            value: 'online law report',
            label: 'Online Law Report'
        }
    ];

export const courtTypes: Array<{
    value: string;
    label: string
}> = [
        {
            value: 'supreme court of uganda',
            label: 'Supreme Court of Uganda'
        },
        {
            value: 'court of appeal of uganda',
            label: 'Court of Appeal of Uganda'
        },
        {
            value: 'constitutional court of uganda',
            label: 'Constitutional Court of Uganda'
        },
        {
            value: 'high court',
            label: 'High Court'
        },
        {
            value: 'industrial court of uganda',
            label: 'Industrial Court of Uganda'
        },
        {
            value: 'tax appeals tribunal of uganda',
            label: 'Tax Appeals Tribunal of Uganda'
        },
        {
            value: 'center for arbitration and dispute resolution of uganda',
            label: 'Center for Arbitration and Dispute Resolution of Uganda'
        },
        {
            value: 'east african court of justice',
            label: 'East African Court of Justice'
        },
        {
            value: 'african court on human and peoples rights',
            label: 'African Court on Human and Peoples Rights'
        }
    ]

export const pages: Array<
    { key: string, id: number }
> = [
        { key: 'Bookmarks', id: 1 },
        { key: 'My Douments', id: 2 },
        { key: 'Logout', id: 3 },
    ]