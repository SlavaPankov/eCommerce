import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../../shared/LoginForm/LoginForm';
import { Content } from '../../shared/Content';

export function LoginPage() {
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
      <LoginForm />
    </Content>
  );
}
