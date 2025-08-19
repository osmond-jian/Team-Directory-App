import * as database from "../../database/team_database.json"

interface databaseObject {
    name:string;
    role:string;
    email:string;
}

export async function getTeamMembers(searchTerm:string, property:string){
    let data = database;
    if (property === "name"){
        // pick the property in the array to filter through
    }
    await setTimeout(applySearchTerm(data, property, searchTerm), 1000)
    return database;
}

function applySearchTerm (data:Array<databaseObject>, property:string, searchTerm:string) {
    let names = data.map(element => element.name)
    let roles = data.map(element => element.role)
    let emails = data.map(element => element.email)

    if (property === "name") {
        return names.filter(searchTerm);
    }
    if (property === "name") {
        return names.filter(searchTerm);
    }
    if (property === "name") {
        return names.filter(searchTerm);
    }

}