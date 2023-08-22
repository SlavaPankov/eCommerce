import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegistrationForm } from '../../shared/RegistrationForm/RegistrationForm';
import { Content } from '../../shared/Content';

export function RegistrationPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuth = localStorage.getItem('isAuth');

    if (!isAuth) {
      return;
    }

    navigate('/');
  }, []);

  return (
    <Content>
      <RegistrationForm />
    </Content>
  );
}
