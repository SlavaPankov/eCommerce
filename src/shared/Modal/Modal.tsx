import React, { ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styles from './modal.scss';

interface IModalProps {
  onClose?: () => void;
  children: ReactNode;
}

export function Modal({ children, onClose = () => {} }: IModalProps) {
  const ref = useRef<HTMLDivElement>(null);
  const backgoundRef = useRef<HTMLDivElement>(null);
  const node = document.getElementById('modal_root');

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (event.target instanceof Node && event.target === backgoundRef.current) {
        onClose();
      }
    }

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  if (!node) {
    return null;
  }

  return createPortal(
    <div className={styles.wrapper} ref={ref}>
      <div className={styles.wrapper_container} ref={backgoundRef}></div>
      <div className={styles.content}>{children}</div>
    </div>,
    node
  );
}
