import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Button } from './Button';
import type { databaseObject } from '../types';
import {editTeamMembers, addTeamMember, deleteTeamMember} from '../API/updateLocalStorageDatabase'

type ModalProps = {
  teamMember: databaseObject;
  modalState: boolean;
  closeModalState: () => void;
};

export const Modal: React.FC<ModalProps> = ({ modalState, teamMember, closeModalState }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [editedTeamMember, setEditedTeamMember] = useState<databaseObject>(teamMember);
  const [editingField, setEditingField] = useState<null | keyof databaseObject>(null);
  const originalTeamMember = useMemo(() => {
    return { ...teamMember };
  }, [teamMember]);
  //VARIABLE to keep track of whether modal is used to edit team member or add new
  const modalMode = teamMember.email.length>0? "Edit":"Add";
  //function to handle button and keyboard interaction with data editing
  function handleSubmitModal(inputMethod:string){
    if (modalMode === "Edit"){
      if (inputMethod === "Key"){
        setEditedTeamMember(teamMember);      
      }
        setEditingField(null);
        editTeamMembers(originalTeamMember, editedTeamMember);
        return;  
    }

    if (modalMode === "Add"){
      addTeamMember(editedTeamMember);
    }
  }

  //useEffect to keep track of edited state
  useEffect(() => {
    setEditedTeamMember(teamMember);
    setEditingField(null);
  }, [teamMember]);

  //useEffect to open/close dialogs
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (modalState && !dialog.open) {
      dialog.showModal();
    } else if (!modalState && dialog.open) {
      dialog.close();
      closeModalState();
    }
  }, [modalState]);

  const closeModal = () => {
    dialogRef.current?.close();
    closeModalState();
  };

  return (
    // practice using dialog elements with react
    <dialog ref={dialogRef} className="team-modal" data-testid="modaltest">
      <div className="modal-content">
        <h2>{teamMember.email.length >0 ? "Edit" : "Add New Member"}</h2>
        <div className="modal-image">
          {editedTeamMember.picture ? (
            <img src={editedTeamMember.picture} alt={`${editedTeamMember.name}'s profile`} />
          ) : (
            <div className="image-placeholder">No Image</div>
          )}
        </div>

        <div className="modal-info">
          {/* Name Field */}
          <div className="editable-field">
            <strong>Name:</strong>{' '}
            {editingField === 'name' ? (
              <input
                type="text"
                value={editedTeamMember.name}
                autoFocus
                onChange={(e) => setEditedTeamMember({ ...editedTeamMember, name: e.target.value })}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSubmitModal("Button");
                  if (e.key === 'Escape') {
                    handleSubmitModal("Key");
                  }
                }}
              />
            ) : (
              <span>{editedTeamMember.name || 'No info'}</span>
            )}
            <Button
              label={editingField === 'name' ? 'Finish' : 'Edit'}
              selected={editingField === 'name'}
              onClick={() => {
                setEditingField(editingField==='name'? null:'name');
                handleSubmitModal("Button");
              }}
            />
          </div>

          {/* Role Field */}
          <div className="editable-field">
            <strong>Role:</strong>{' '}
            {editingField === 'role' ? (
              <input
                type="text"
                value={editedTeamMember.role}
                autoFocus
                onChange={(e) => setEditedTeamMember({ ...editedTeamMember, role: e.target.value })}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSubmitModal("Button");
                  if (e.key === 'Escape') {
                    handleSubmitModal("Key")
                  }
                }}
              />
            ) : (
              <span>{editedTeamMember.role || 'No info'}</span>
            )}
            <Button
              label={editingField === 'role' ? 'Finish' : 'Edit'}
              selected={editingField === 'role'}
              onClick={() => {
                handleSubmitModal("Button")
              }}
            />
          </div>

          {/* Email Field */}
          <div className="editable-field">
            <strong>Email:</strong>{' '}
            {editingField === 'email' ? (
              <input
                type="text"
                value={editedTeamMember.email}
                autoFocus
                onChange={(e) => setEditedTeamMember({ ...editedTeamMember, email: e.target.value })}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSubmitModal("Button");
                  if (e.key === 'Escape') {
                    handleSubmitModal("Key")
                  }
                }}
              />
            ) : (
              <span>{editedTeamMember.email || 'No info'}</span>
            )}
            <Button
              label={editingField === 'email' ? 'Finish' : 'Edit'}
              selected={editingField === 'email'}
              onClick={() => {
                handleSubmitModal("Button")
              }}
            />
          </div>

          {/* Bio Field */}
          <div className="editable-field">
            <strong>Bio:</strong>{' '}
            {editingField === 'bio' ? (
              <textarea
                value={editedTeamMember.bio}
                autoFocus
                onChange={(e) => setEditedTeamMember({ ...editedTeamMember, bio: e.target.value })}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSubmitModal("Button");
                  if (e.key === 'Escape') {
                    handleSubmitModal("Key")
                  }
                }}
              />
            ) : (
              <span>{editedTeamMember.bio || 'No bio available.'}</span>
            )}
            <Button
              label={editingField === 'bio' ? 'Finish' : 'Edit'}
              selected={editingField === 'bio'}
              onClick={() => {
                handleSubmitModal("Button")
              }}
            />
          </div>
        </div>
      </div>

      <div className="modal-actions">
        <Button label="Close" onClick={closeModal} selected={false} />
      </div>
    </dialog>
  );
};
