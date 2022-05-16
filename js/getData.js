export async function getData(apiUrl){
    try{
        let apiResponse = await fetch(apiUrl);
        return await apiResponse.json();
    }
    catch (e){
        console.log(e);
    }
}