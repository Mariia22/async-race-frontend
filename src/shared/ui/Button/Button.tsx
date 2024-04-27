import React from 'react';
import styles from './style.module.scss';

type Props = {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  name: string | number;
  isFormSubmit?: boolean;
};

function Button({
  onClick, disabled, isFormSubmit, name,
}: Props) {
  return (
    <button
      type={isFormSubmit ? 'submit' : 'button'}
      disabled={disabled}
      onClick={onClick}
      className={styles.button}
    >
      {name}
    </button>
  );
}

Button.defaultProps = {
  isFormSubmit: false,
  disabled: false,
};

export default Button;
