import type {databaseObject} from "../types";
import database from "../../database/team_database.json";

// function that updates the local storage database with the edit function in the modal
export async function editTeamMembers(databaseObject:databaseObject, newDatabaseObject:databaseObject){
    //find the item in array to edit
    const rawData = localStorage.getItem('database') || database.toString();
    const data:databaseObject[] = rawData ? JSON.parse(rawData) : database;
    const editIndex = data.findIndex((targetObject) => targetObject === databaseObject);

    //make the edit
    const editedDatabase = data.splice(editIndex, 1, newDatabaseObject)
    //save the new database into local storage
    localStorage.setItem('database', JSON.stringify(data));
        console.log(editedDatabase);
}

// function that updates the local storage database with the edit function in the modal
export async function addTeamMember(newDatabaseObject:databaseObject){
    //get database
    const rawData = localStorage.getItem('database') || JSON.stringify(database);
    const data = rawData ? JSON.parse(rawData) : database;

    //add the team member
    const editedDatabase = data.push(newDatabaseObject)
    console.log(editedDatabase);
    //save the new database into local storage
    localStorage.setItem('database', JSON.stringify(data));
}

// function that updates the local storage database with the edit function in the modal
export async function deleteTeamMember(databaseObject:databaseObject){
    //find the item in array to edit
    const rawData = localStorage.getItem('database') || JSON.stringify(database);
    const data:databaseObject[] = rawData ? JSON.parse(rawData) : database;
    const editIndex = data.findIndex(targetObject => targetObject === databaseObject);

    //make the edit
    const editedDatabase = data.splice(editIndex, 1)
    //save the new database into local storage
    localStorage.setItem('database', JSON.stringify(data));
        console.log(editedDatabase);
}