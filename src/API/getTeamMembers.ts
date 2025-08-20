import database from "../../database/team_database.json"

interface databaseObject {
    name:string;
    role:string;
    email:string;
}

// function that returns the database query to the front end - takes in a search term
export async function getTeamMembers(searchTerm:string, property?:string){
    let data = database;
    if (property === "name"){
        // pick the property in the array to filter through
    }
    // simulates the delay for a database call
    await new Promise<void> (resolve => setTimeout(resolve, 1000));

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
    console.log(data);
    const searchResult = data.filter(filterDatabase);
    console.log(searchResult);

    return searchResult;
}
