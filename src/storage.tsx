import { storage } from "@forge/api";


// Create a key composed from the acronym
function acronymKey(acronym) {
    return `acronym-${acronym}`;
  }

const randomnumber = (min = 1, max = 1000) => {
return Math.floor(Math.random() * (max - min + 1) + min);
};




export async function getSettings(key:string) {
    const value  = await storage.get(acronymKey(key))
    if(value) {
        return  value.value
    }else {
        return 'NOT FOUND'
    }
}

export async function saveSettings(pattern: string, value:string) {
    return await storage.set(acronymKey(pattern),  {value}  );
}