import React, {useState} from 'react';
import type {databaseObject} from '../types';
import {Button} from './Button';
import {Modal} from './Modal'

//component displays table that shows search results; takes in a teamMembers prop (array) and a loading prop (controls visual loading state)

type TableProps = {
  teamMembers: Array<databaseObject>;
  loading:boolean;
//   onClick: () => void;
};

export const SearchResultTable: React.FC<TableProps> = ({teamMembers, loading}) => {
    const [modal, setModal] = useState(false);
    const [selectedTeamMember, setSelectedTeamMember] = useState({name:'', role:'', email:'', picture:'', bio:''});

    function showModal(modalType:string, selectedMember:databaseObject){
        setModal(true);
        setSelectedTeamMember(selectedMember);
    }
    return(
        <>
        {/* Table for display */}
        <section className="results-table">
            {/* If loading show this: */}
            {loading ? (
            <p>Loading...</p>
            ) : (
            // If Loaded show this:
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Email</th>
                </tr>
                </thead>
                <tbody>
                {teamMembers.length > 0 ? (
                    teamMembers.map((member) => (
                    <tr key={member.email}>
                        <td>{member.name}</td>
                        <td>{member.role}</td>
                        <td>{member.email}</td>
                        <td><Button label={"Edit"} onClick={()=>showModal("edit", member)} selected={false}/></td>
                        <td><Button label={"See More"} onClick={()=>showModal("profile", member)} selected={false}/></td>
                    </tr>
                    ))
                ) : (
                    // IF no results found show this:
                    <tr>
                    <td colSpan={3}>No results found</td>
                    </tr>
                )}
                </tbody>
            </table>
            )}
        </section>
        <Modal teamMember={selectedTeamMember} modalState={modal?true:false} typeOfModal={"edit"}/>
        </>
    )
}