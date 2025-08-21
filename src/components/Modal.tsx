import React, {useEffect, useRef} from 'react';
import {Button} from './Button'
import type {databaseObject} from '../types';

type ModalProps = {
  teamMember: databaseObject;
  modalState:boolean;
  typeOfModal: string;
};

export const Modal: React.FC<ModalProps> = ({ modalState, teamMember, typeOfModal }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  function openModal(){
    dialogRef.current?.showModal();
  }
  function closeModal (){
    dialogRef.current?.close();
  };

  useEffect(() => {
    if (modalState) {
        openModal();
    }else{
        closeModal();
    }
  }, [modalState]);


  return (
    <dialog ref={dialogRef} className="team-modal">
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

      <div className="modal-actions">
        <Button label="Close" onClick={closeModal} selected={false} />
      </div>
    </dialog>
  );
};