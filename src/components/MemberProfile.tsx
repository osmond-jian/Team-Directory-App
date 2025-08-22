import React, {useState} from 'react';
import type {databaseObject} from '../types';


//component displays team member profile, navigate here via react-router

type ProfileProps = {
  teamMember: databaseObject;
//   loading:boolean;
};

export const TeamMemberProfile: React.FC<ProfileProps> = ({teamMember}) => {
    const [modal, setModal] = useState(false);
    const [selectedTeamMember, setSelectedTeamMember] = useState({name:'', role:'', email:'', picture:'', bio:''});

    function showModal(selectedMember:databaseObject){
        setModal(true);
        setSelectedTeamMember(selectedMember);
    }

    return(
        <>
            <div className="modal-content">
            {/* Picture (if present) */}
            <div className="modal-image">
            {teamMember.picture ? (
                <img src={teamMember.picture} alt={`${teamMember.name}'s profile`} />
            ) : (
                <div className="image-placeholder">No Image</div>
            )}
            </div>

            {/* Text Information */}
            <div className="modal-info">
            <h2>{teamMember.name}</h2>
            <p><strong>Role:</strong> {teamMember.role}</p>
            <p><strong>Email:</strong> {teamMember.email}</p>

            {/* Bio section (optional) */}
            <div className="modal-bio">
                <h3>Bio</h3>
                <p>{teamMember.bio || 'No bio available.'}</p>
            </div>
            </div>
        </div>
        </>
    )
}