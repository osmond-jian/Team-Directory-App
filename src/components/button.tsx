// Button.tsx
import React from 'react';

type ButtonProps = {
  label: string;
  selected:boolean;
  onClick: () => void;
};

export const Button: React.FC<ButtonProps> = ({ label, selected, onClick }) => {
  return <button className={selected? 'selected' : ''} onClick={onClick}>{label}</button>;
};

