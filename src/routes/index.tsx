import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../hooks/auth';

import { AppTabRoutes } from './app.tab.routes';
import { AuthRoutes } from './auth.routes';
import { ActivityIndicator } from 'react-native';

export function Routes() {
    const { user, loading } = useAuth();

    return (
        loading ? <ActivityIndicator /> :
            <NavigationContainer>
                {user.id ? <AppTabRoutes /> : <AuthRoutes />}
            </NavigationContainer>
    );
}