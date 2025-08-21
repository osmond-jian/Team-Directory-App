import React, {useEffect, useRef} from 'react';
import type {databaseObject} from '../types';

type ModalProps = {
  teamMember: databaseObject;
};

export const Modal: React.FC<ModalProps> = ({ teamMember }) => {
  return <dialog></dialog>;
};