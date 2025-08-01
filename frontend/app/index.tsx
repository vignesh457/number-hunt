import React from 'react'
import { Redirect } from 'expo-router';
import { useAppSelector } from '@/redux/hook';

const index = () => {
    const {isAuthenticated} = useAppSelector((state) => state.user);
    console.log(isAuthenticated ? "Authenticated" : "Not Authenticated");
    
    if (!isAuthenticated) {
        return <Redirect href="/signIn" />;
    }
    else {
        return <Redirect href="/home" />;
    }
}

export default index;