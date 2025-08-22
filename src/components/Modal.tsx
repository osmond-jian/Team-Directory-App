import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Button } from './Button';
import type { databaseObject } from '../types';
import { editTeamMembers, addTeamMember } from '../API/updateLocalStorageDatabase';
import "./Modal.scss"

type ModalProps = {
  teamMember: databaseObject;
  modalState: boolean;
  closeModalState: () => void;
  handleSearchRefresh: () => void;
};

//modal element is a form to allow easy input and submission of data 
export const Modal: React.FC<ModalProps> = ({ modalState, teamMember, closeModalState, handleSearchRefresh }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [editedTeamMember, setEditedTeamMember] = useState<databaseObject>(teamMember);

  const originalTeamMember = useMemo(() => ({ ...teamMember }), [teamMember]);
  const modalMode = teamMember.email.length > 0 ? "Edit" : "Add";

  // Reset the form fields when the modal opens to prevent previous fields from showing
  useEffect(() => {
    setEditedTeamMember(teamMember);
  }, [teamMember]);

  // Open/close dialog programmatically; not sure if this is the best way to do it with dialogs
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

  //form submission - easiest way to add validation for creating new teammember (forcing them to have name, email, role)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { name, email, role } = editedTeamMember;

    // Validation - some logic uses these terms to search so adding a member without these three will lead to bugs
    if (!name.trim() || !email.trim() || !role.trim()) {
      alert("Please fill in Name, Email, and Role.");
      return;
    }

    if (modalMode === "Edit") {
      editTeamMembers(originalTeamMember, editedTeamMember);
    } else {
      addTeamMember(editedTeamMember);
    }

    handleSearchRefresh();
    closeModal();
  };

  return (
    <dialog ref={dialogRef} className="team-modal" data-testid="modaltest">
      <form className="modal-content" onSubmit={handleSubmit} data-testid="modalform">
        <h2>{modalMode === "Edit" ? "Edit Team Member" : "Add New Member"}</h2>

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
            <label htmlFor="nameInput"><strong>Name:</strong></label>
            <input
              type="text"
              value={editedTeamMember.name}
              onChange={(e) => setEditedTeamMember({ ...editedTeamMember, name: e.target.value })}
              required
              autoFocus
              id="nameInput"
            />
          </div>

          {/* Role Field */}
          <div className="editable-field">
            <label htmlFor="roleInput"><strong>Role:</strong></label>
            <input
              id="roleInput"
              type="text"
              value={editedTeamMember.role}
              onChange={(e) => setEditedTeamMember({ ...editedTeamMember, role: e.target.value })}
            />
          </div>

          {/* Email Field */}
          <div className="editable-field">
            <label htmlFor="emailInput"><strong>Email:</strong></label>
            <input
              id="emailInput"
              type="email"
              value={editedTeamMember.email}
              onChange={(e) => setEditedTeamMember({ ...editedTeamMember, email: e.target.value })}
              required
            />
          </div>

          {/* Bio Field */}
          <div className="editable-field">
            <label htmlFor="bioInput"><strong>Bio:</strong></label>
            <textarea
              id="bioInput"
              value={editedTeamMember.bio}
              onChange={(e) => setEditedTeamMember({ ...editedTeamMember, bio: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="modal-actions">
          <Button label="Cancel" onClick={closeModal} selected={false} />
          {/* Used a regular button to preserve the form submit functionality */}
          <button type="submit">
            {modalMode === "Edit" ? "Save Changes" : "Add Member"}
          </button>
        </div>
      </form>
    </dialog>
  );
};