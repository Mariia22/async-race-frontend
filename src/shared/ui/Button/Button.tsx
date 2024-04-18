import React from 'react';

type Props = {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  name: string;
  isFormSubmit?: boolean;
};

function Button({
  onClick, disabled, isFormSubmit, name,
}: Props) {
  return (
    <button type={isFormSubmit ? 'submit' : 'button'} disabled={disabled} onClick={onClick}>
      {name}
    </button>
  );
}

Button.defaultProps = {
  isFormSubmit: false,
  disabled: false,
};

export default Button;
