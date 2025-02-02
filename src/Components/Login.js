import Cookies from 'js-cookie';
import { useEffect } from 'react';

const checkLogin = () => {
    let isLoggedIn = false;
    const loginToken = Cookies.get('login_token');
    if (loginToken) {
        isLoggedIn= true
    }
    else 
    {
        isLoggedIn = false;
    }
      return isLoggedIn;
};

export const useLoginModal = () => {
    useEffect(() => {
      if (!checkLogin()) {
        const modalElement = document.getElementById("loginSignUpModal");
        if (modalElement) {
          const modal = new window.bootstrap.Modal(modalElement);
          modal.show();
        }
      }
    }, []);
  };