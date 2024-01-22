// auth.ts
import { loginUser, logoutUser } from '../slices/userSlice';
import { useAuthorizeQuery } from './usersApi';
import { Dispatch } from '@reduxjs/toolkit';
import { useEffect } from 'react';

export const useAuthorization = (dispatch: Dispatch) => {

    const { data, error } =  useAuthorizeQuery();

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        if (data) {
          dispatch(loginUser(data));
        } else if (error) {
          console.error('Authorization error:', error);
          dispatch(logoutUser());
        }
      } catch (error) {
        console.error('Unexpected error during authorization:', error);
        // Handle unexpected errors if needed
      }
    };

    fetchData();
  }, []);
};
