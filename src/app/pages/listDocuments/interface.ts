export interface IEntry {
    createdAt: string,
    isFolder: boolean,
    isFile: boolean,
    createdByUser: {
        id: string,
        displayName: string
    },
    modifiedAt: string,
    modifiedByUser: {
        id: string,
        displayName: string
    },
    name: string,
    id: string,
    nodeType: string,
    content: {
        mimeType: string,
        mimeTypeName: string,
        sizeInBytes: number,
        encoding: string
    },
    parentId: string
}

export interface IPagination {
    count: number
    hasMoreItems: boolean
    maxItems: number
    skipCount: number
    totalItems: number
}

export interface IResponseData {
    status: number,
    statusText: string,
    data: {
        list: {
            pagination: IPagination;
            entries: Array<IEntry>
        }
    }
}