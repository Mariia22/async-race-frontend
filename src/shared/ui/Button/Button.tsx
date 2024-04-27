import React from 'react';
import styles from './style.module.scss';

type Props = {
  key?: string | number;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  name: string | number;
  isFormSubmit?: boolean;
};

function Button({
  onClick, disabled, isFormSubmit, name, key,
}: Props) {
  return (
    <button
      key={key}
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
  key: Button.name,
  isFormSubmit: false,
  disabled: false,
};

export default Button;
