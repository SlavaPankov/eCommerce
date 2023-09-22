import React, { useRef, useState } from 'react';
import { RegistrationAddress } from '../RagistrationAddress';
import { IFormData } from '../../../types/interfaces/IFormData';
import styles from './registrationAddressForm.scss';
import { CrossIcon } from '../../Icons';

interface IRegistrationAddressFormProps {
  addressCount: number;
  setAddressCount: (data: number) => void;
  isRemove?: boolean;
}

export function RegistrationAddressForm({
  addressCount,
  setAddressCount,
  isRemove
}: IRegistrationAddressFormProps) {
  const ref = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<IFormData>({});
  const [formError, setFormError] = useState<IFormData>({});

  const handleClickCross = () => {
    setAddressCount(addressCount - 1);
    ref.current?.remove();
  };

  return (
    <form className={styles.form} ref={ref}>
      {isRemove && (
        <span className={styles.cross} onClick={handleClickCross}>
          <CrossIcon />
        </span>
      )}
      <RegistrationAddress
        formData={formData}
        formError={formError}
        setFormData={setFormData}
        setFormError={setFormError}
        addressCount={addressCount}
        setAddressCount={setAddressCount}
      />
    </form>
  );
}
