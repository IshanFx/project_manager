
export class StorageHandler{

    getLocalStorageValue(key:string){
       return localStorage.getItem(key);
    }

    setLocalStorage(key:string,value:any){
        localStorage.setItem(key,JSON.stringify(value)
        )
    }
}