import database from "../../database/team_database.json";
import type {databaseObject} from "../types";

// function that returns the database query to the front end - takes in a search term
export async function getTeamMembers(searchTerm:string, property?:string){
    const localStorageData = localStorage.getItem('database')
    const data = localStorageData? JSON.parse(localStorageData) : database;
    console.log(data);

    // simulates the delay for a database call
    await new Promise<void> (resolve => setTimeout(resolve, 1000));

    // switch case for very specific filtering
    if (property){
        // pick the property in the array to filter through
        return(data.filter((item:databaseObject) => {
            if (item[property as keyof databaseObject].toLowerCase().includes(searchTerm.toLowerCase())) {
                return item;
            }
        }))
    }

    // filter function for the database.filter() to return objects that match search term
    function filterDatabase (item:databaseObject) {
        if (
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.email.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
            return item;
        }
    }

    //filter database; no specific key selected so all 3 user properties are searched for a text match
    const searchResult = data.filter(filterDatabase);


    return searchResult;
}
