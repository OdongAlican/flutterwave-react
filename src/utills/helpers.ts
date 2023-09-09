export const searchTableData = (content: string) => console.log(content);

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