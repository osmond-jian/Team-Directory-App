// Button.tsx - a reusable button component that takes in a label, selected (to change appearance and classname), and prop drill function for onclick
import React from 'react';

type ButtonProps = {
  label: string;
  selected:boolean;
  onClick: () => void;
};

export const Button: React.FC<ButtonProps> = ({ label, selected, onClick }) => {
  return <button className={selected? 'selected' : ''} onClick={onClick}>{label}</button>;
};

