import React from 'react';
// import { useNavigate } from 'react-router-dom';
import { UserProfileForm } from '../../shared/UserProfileForm/UserProfileForm';
import { Content } from '../../shared/Content';

export function UserProfile() {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const isAuth = localStorage.getItem('isAuth');

  //   if (!isAuth) {
  //     return;
  //   }

  //   navigate('/');
  // }, []);

  return (
    <Content>
      <UserProfileForm />
    </Content>
  );
}
