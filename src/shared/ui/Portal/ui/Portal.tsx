import { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import styles from './style.module.scss';

type Props = {
  children: ReactNode;
  closePortal: () => void;
};

export default function Portal({ children, closePortal }: Props) {
  const element = document.getElementById('modal') as Element;

  return createPortal(
    <dialog
      role="presentation"
      onClick={closePortal}
      onKeyDown={closePortal}
      className={styles.portal}
    >
      {children}
    </dialog>,
    element,
  );
}
