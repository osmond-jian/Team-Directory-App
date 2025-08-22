import React from 'react';
import { useNavigate } from 'react-router';
import type { databaseObject } from '../types';
import './MemberProfile.scss';

type ProfileProps = {
  teamMember: databaseObject;
};

//component that shows team member's page/extra details, wrapped in profile component to receive props from params
export const TeamMemberProfile: React.FC<ProfileProps> = ({ teamMember }) => {
  const navigate = useNavigate();

  return (
    <div className="profile-container">
      <button className="back-button" onClick={() => navigate('/')}>
        ← Back
      </button>

      <div className="profile-card">
        {/* Picture */}
        <div className="profile-image">
          {teamMember.picture ? (
            <img src={teamMember.picture} alt={`${teamMember.name}'s profile`} />
          ) : (
            <div className="image-placeholder">No Image</div>
          )}
        </div>

        {/* Info */}
        <div className="profile-info">
          <h2>{teamMember.name}</h2>
          <p><strong>Role:</strong> {teamMember.role}</p>
          <p><strong>Email:</strong> {teamMember.email}</p>

          <div className="profile-bio">
            <h3>Bio</h3>
            <p>{teamMember.bio || 'No bio available.'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
