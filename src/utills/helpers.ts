import { IEntry } from "../app/pages/listDocuments/interface";

export const searchTableData = (
    text: string,
    list: IEntry[]
): Array<IEntry> => {
    const fileredArray: Array<IEntry> = [];
    list.forEach(entry => {
        if (parseInt(text.split('-')[0], 10)) {
            if (entry.createdAt.indexOf(text) !== -1) {
                fileredArray.push(entry);
            }
        }
        else if (entry.name.toLowerCase().indexOf(text.toLowerCase()) !== -1) {
            fileredArray.push(entry);
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