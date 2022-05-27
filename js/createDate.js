export function createDate(apiDate){
    let date = apiDate;
    let formatedDate = new Date(date).toString();
    //shortening the date
    let shortenedDate = formatedDate.substring(3,15);
    return shortenedDate;
}
