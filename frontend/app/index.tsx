import React, { useEffect } from 'react'
import { Redirect } from 'expo-router';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { resetGame } from '@/redux/gameSlice';

const index = () => {
    const {isAuthenticated} = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    console.log(isAuthenticated ? "Authenticated" : "Not Authenticated");

    useEffect(() => {
        dispatch(resetGame());
    }, []);
    
    if (!isAuthenticated) {
        return <Redirect href="/signIn" />;
    }
    else {
        return <Redirect href="/home" />;
    }
}

export default index;