export async function getData(apiurl){
    try{
        let apiResponse = await fetch(apiurl);
        return await apiResponse.json();
    }
    catch (e){
        console.log(e);
    }
}