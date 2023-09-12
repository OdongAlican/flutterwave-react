import { Dayjs } from "dayjs";
interface IContent {
    mimeType: string,
    mimeTypeName: string,
    sizeInBytes: number,
    encoding: string,
};
interface IPath {
    name: string,
    isComplete: boolean,
    elements: Array<{
        id: string,
        name: string,
        nodeType: string,
        aspectNames: Array<string>
    }>
};
interface IProperties {
    "cm:title": string,
    "ldc:court": string,
    "cm:versionType": string,
    "cm:versionLabel": string,
    "ldc:docTitle": string,
    "ldc:parties": string,
    "cm:author": string,
    "ldc:subjectMatter": Array<string>,
    "ldc:judge": Array<string>,
    "ldc:judgementDate": string,
    "cm:lastThumbnailModification": Array<string>
};
export interface IEntry {
    createdAt: string,
    isFolder: boolean,
    isFavorite: boolean,
    isFile: boolean,
    isLink: boolean,
    isLocked: boolean,
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
    content: IContent,
    parentId: string,
    aspectNames: Array<string>,
    path: IPath,
    properties: IProperties,
    allowableOperations: Array<string>
};
export interface IPagination {
    count: number,
    hasMoreItems: boolean,
    maxItems: number,
    skipCount: number,
    totalItems: number,
};

export interface IResponseData {
    status: number,
    statusText: string,
    data: {
        list: {
            pagination: IPagination;
            entries: Array<{ entry: IEntry }>
        }
    }
};
export interface ICustomGridToolBar {
    filteredEntries: IEntry[];
    onNameChange: (text: string) => void;
    onDateChange: (date: Dayjs | null) => void;
    refresh: () => void;
    filterState: string;
    onColumnNameChange: (text: string) => void
};