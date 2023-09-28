import { IEntry } from "../app/pages/listDocuments/interface";
import { entriesColumns } from "./constants";

export const searchTableData = (
    text: string,
    columnName: string,
    list: IEntry[]
): Array<IEntry> => {
    const fileredArray: Array<IEntry> = [];
    list.forEach(entry => {
        if (
            columnName === entriesColumns[0].value ||
            columnName === entriesColumns[1].value ||
            columnName === entriesColumns[2].value ||
            columnName === entriesColumns[3].value
        ) {
            if (entry.properties[columnName]
                && entry.properties[columnName]?.toLowerCase().indexOf(text.toLowerCase()) !== -1) {
                fileredArray.push(entry);
            }
        }
        else {
            if (entry.properties[columnName] &&
                entry.properties[columnName]?.[0]?.toLowerCase().indexOf(text.toLowerCase()) !== -1) {
                fileredArray.push(entry);
            }
        }
    })
    return fileredArray;
}

export const convertStringToUpperCase = (str: string) => {

    const arr = str.toLowerCase().split(" ");

    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    };

    const str2 = arr.join(" ");
    return str2;
}

export const formatDate = (date: string): string => {
    const result = date.split('T');
    const timeFormat = result[1].split(':');
    return `${result[0]}  ${timeFormat[0]}:${timeFormat[1]}`;
};

interface IAdvancedSearch {
    docType: string;
    court: string;
    judge: string;
    parties: string;
    year: string;
}

export const determineSearchKey = ({
    docType,
    court,
    judge,
    parties,
    year
}: IAdvancedSearch): string => {
    return docType?.length > 0 ? docType
        : court?.length > 0 ? court
            : judge?.length > 0 ? judge
                : parties?.length > 0 ? parties
                    : year
};

export const filterDataTableAdvanced = (data: IAdvancedSearch, filteredEntries: Array<IEntry>) => {

    const test: Array<IEntry> = filteredEntries.filter(entry => {
        console.log(data.court?.length, "court data!!")
        if (
            (data.court?.length > 0 &&
                entry.properties['ldc:court']?.length > 0 &&
                entry.properties['ldc:court']?.toLowerCase().indexOf(data.court?.toLowerCase()) !== -1)
        ) {
            console.log(entry.properties, 'response')
            return entry
        }
    });

    console.log(test, "test response")
    return test
};