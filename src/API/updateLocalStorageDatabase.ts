import type {databaseObject} from "../types";
import { getDatabaseFromLocalStorage } from '../helpers/storageHelper';

// function that updates the local storage database with the edit function in the modal
export async function editTeamMembers(databaseObject:databaseObject, newDatabaseObject:databaseObject){
    //find the item in array to edit
    const data = getDatabaseFromLocalStorage();
    const editIndex = data.findIndex((targetObject) => targetObject.email === databaseObject.email);

    //make the edit
    const editedDatabase = data.splice(editIndex, 1, newDatabaseObject)
    //save the new database into local storage
    localStorage.setItem('database', JSON.stringify(data));
        console.log(editedDatabase);
}

// function that updates the local storage database with the edit function in the modal
export async function addTeamMember(newDatabaseObject:databaseObject){
    //get database
    const data = getDatabaseFromLocalStorage();

    //add the team member
    const editedDatabase = data.push(newDatabaseObject)
    console.log(editedDatabase);
    //save the new database into local storage
    localStorage.setItem('database', JSON.stringify(data));
}

// function that updates the local storage database with the edit function in the modal
export async function deleteTeamMember(databaseObject:databaseObject){
    //find the item in array to edit
    const data = getDatabaseFromLocalStorage();
    const editIndex = data.findIndex(targetObject => targetObject.email === databaseObject.email);

    //make the edit
    const editedDatabase = data.splice(editIndex, 1)
    //save the new database into local storage
    localStorage.setItem('database', JSON.stringify(data));
        console.log(editedDatabase);
}