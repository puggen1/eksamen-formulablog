export function sortNew(a, b){
    return Date.parse(b.date) - Date.parse(a.date);
 }
export function sortOld(a,b){
    return Date.parse(a.date) - Date.parse(b.date);
}
