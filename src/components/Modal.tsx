import React, { useEffect, useRef, useState } from 'react';
import { Button } from './Button';
import type { databaseObject } from '../types';

type ModalProps = {
  teamMember: databaseObject;
  modalState: boolean;
  closeModalState: () => void;
};

export const Modal: React.FC<ModalProps> = ({ modalState, teamMember, closeModalState }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [editedTeamMember, setEditedTeamMember] = useState<databaseObject>(teamMember);
  const [editingField, setEditingField] = useState<null | keyof databaseObject>(null);

  useEffect(() => {
    setEditedTeamMember(teamMember);
    setEditingField(null);
  }, [teamMember]);

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
    <dialog ref={dialogRef} className="team-modal">
      <div className="modal-content">
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
                onBlur={() => setTimeout(() => setEditingField(null), 0)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') setEditingField(null);
                  if (e.key === 'Escape') {
                    setEditedTeamMember(teamMember);
                    setEditingField(null);
                  }
                }}
              />
            ) : (
              <span>{editedTeamMember.name || 'No info'}</span>
            )}
            <Button
              label={editingField === 'name' ? 'Finish' : 'Edit'}
              selected={editingField === 'name'}
              onClick={() => setEditingField(editingField==='name'? null:'name')}
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
                onBlur={() => setTimeout(() => setEditingField(null), 0)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') setEditingField(null);
                  if (e.key === 'Escape') {
                    setEditedTeamMember(teamMember);
                    setEditingField(null);
                  }
                }}
              />
            ) : (
              <span>{editedTeamMember.role || 'No info'}</span>
            )}
            <Button
              label={editingField === 'role' ? 'Finish' : 'Edit'}
              selected={editingField === 'role'}
              onClick={() => setEditingField(editingField==='role'? null:'role')}
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
                onBlur={() => setTimeout(() => setEditingField(null), 0)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') setEditingField(null);
                  if (e.key === 'Escape') {
                    setEditedTeamMember(teamMember);
                    setEditingField(null);
                  }
                }}
              />
            ) : (
              <span>{editedTeamMember.email || 'No info'}</span>
            )}
            <Button
              label={editingField === 'email' ? 'Finish' : 'Edit'}
              selected={editingField === 'email'}
              onClick={() => setEditingField(editingField==='email'? null:'email')}
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
                onBlur={() => setTimeout(() => setEditingField(null), 0)}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') {
                    setEditedTeamMember(teamMember);
                    setEditingField(null);
                  }
                }}
              />
            ) : (
              <span>{editedTeamMember.bio || 'No bio available.'}</span>
            )}
            <Button
              label={editingField === 'bio' ? 'Finish' : 'Edit'}
              selected={editingField === 'bio'}
              onClick={() => setEditingField(editingField==='bio'? null:'bio')}
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
