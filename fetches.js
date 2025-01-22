import { url } from "./api.js";

export async function getData(){
    try{
        const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
    } catch(e){
        console.log('Error fetching data', e)
    }
}
