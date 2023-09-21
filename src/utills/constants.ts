export const accessTokenKey: string = "@access-token";
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