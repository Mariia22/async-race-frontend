import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

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
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 3,
        display: 'flex',
      }}
    >
      {children}
    </dialog>,
    element,
  );
}
