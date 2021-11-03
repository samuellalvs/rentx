import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '../screens/Home';
import { CarDetails } from '../screens/CarDetails';
import { Schedulling } from '../screens/Schedulling';
import { Confirmation } from '../screens/Confirmation';
import { SchedullingDetails } from '../screens/SchedullingDetails';
import { MyCars } from '../screens/MyCars';
import { Splash } from '../screens/Splash';
import { SignIn } from '../screens/SignIn';
import { SignUpFirstStep } from '../screens/SignUp/SignUpFirstStep';
import { SignUpSecondStep } from '../screens/SignUp/SignUpSecondStep';


const { Navigator, Screen } = createNativeStackNavigator();

export function StackRoutes() {
    return (
        <Navigator
            initialRouteName="SignIn"
            screenOptions={{
                headerShown: false
            }}
        >
            <Screen
                name="Home"
                component={Home}
                options={{
                    gestureEnabled: false
                }}
            />
            <Screen
                name="CarDetails"
                component={CarDetails}
            />
            <Screen
                name="Schedulling"
                component={Schedulling}
            />
            <Screen
                name="Confirmation"
                component={Confirmation}
            />
            <Screen
                name="SchedullingDetails"
                component={SchedullingDetails}
            />

            <Screen
                name="MyCars"
                component={MyCars}
            />

            <Screen
                name="Splash"
                component={Splash}
            />

            <Screen
                name="SignIn"
                component={SignIn}
            />

            <Screen
                name="SignUpFirstStep"
                component={SignUpFirstStep}
            />

            <Screen
                name="SignUpSecondStep"
                component={SignUpSecondStep}
            />
        </Navigator>
    )
}