import React from 'react';

const DeleteConfirmation = ({ onConfirm, onCancel }) => {
  return (
    <div className="delete-confirmation">
      <p>Êtes-vous sûr de vouloir supprimer cet élément ?</p>
      <button onClick={onConfirm}>Confirmer</button>
      <button onClick={onCancel}>Annuler</button>
    </div>
  );
};

export default DeleteConfirmation;
