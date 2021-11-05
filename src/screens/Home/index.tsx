import React, { useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/core';
import { StatusBar, StyleSheet, BackHandler } from 'react-native';
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { Ionicons } from '@expo/vector-icons';
import { RectButton, PanGestureHandler } from 'react-native-gesture-handler';
import { useNetInfo } from '@react-native-community/netinfo';
import { synchronize } from '@nozbe/watermelondb/sync';
import { database } from '../../databases';

import Animated, {
    useSharedValue,
    useAnimatedStyle,
    useAnimatedGestureHandler,
    withSpring
} from 'react-native-reanimated';

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

import api from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';

import Logo from '../../assets/logo.svg';

import { Car } from '../../components/Car';
import { Load } from '../../components/Load';
import { Car as ModelCar } from '../../databases/models/Car';

import {
    Container,
    Header,
    TotalCars,
    HeaderContent,
    CarList,
    MyCarsButton
} from './styles';


export function Home() {
    const [cars, setCars] = useState<ModelCar[]>([]);
    const [loading, setLoading] = useState(true);

    const netInfo = useNetInfo();

    const positionY = useSharedValue(0);
    const positionX = useSharedValue(0);

    const myCarsButtonStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: positionX.value },
                { translateY: positionY.value }
            ]
        }
    });

    const onGestureEvent = useAnimatedGestureHandler({
        onStart(_, ctx: any) {
            ctx.positionX = positionX.value;
            ctx.positionY = positionY.value;
        },
        onActive(event, ctx: any) {
            positionX.value = ctx.positionX + event.translationX;
            positionY.value = ctx.positionY + event.translationY;
        },
        onEnd() {
            positionX.value = withSpring(0);
            positionY.value = withSpring(0);
        }
    });

    const navigation = useNavigation();

    const theme = useTheme();

    function handleCardDetails(car: ModelCar) {
        navigation.navigate("CarDetails", { car });
    }

    function handleOpenMyCars() {
        navigation.navigate("MyCars");
    }

    async function offlineSynchronize() {
        await synchronize({
            database,
            pullChanges: async ({ lastPulledAt }) => {
                const response = await api.get(`/cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`);
                const { changes, latestVersion } = response.data;

                return {
                    changes,
                    timestamp: latestVersion
                }
            },
            pushChanges: async ({ changes }) => {
                const user = changes.users;
                await api.post('/users/sync', user);
            }
        });
    }


    useEffect(() => {
        let isMounted = true;

        async function fetchCars() {
            try {
                /* const response = await api.get('/cars'); */
                const carCollection = database.get<ModelCar>('cars');
                const cars = await carCollection.query().fetch();
                if (isMounted) {

                    setCars(cars);
                }
            } catch (error) {

            } finally {
                if (isMounted) {
                    setLoading(false);
                }

            }


        }

        fetchCars();
        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => {
            return true;
        })
    }, []);

    useEffect(() => {
        if (netInfo.isConnected === true) {
            offlineSynchronize();
        }
    }, [netInfo.isConnected])

    return (
        <Container>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

            <Header>
                <HeaderContent>
                    <Logo
                        width={RFValue(108)}
                        height={RFValue(12)}
                    />

                    {
                        !loading &&
                        <TotalCars>
                            Total de {cars.length} carros
                        </TotalCars>
                    }


                </HeaderContent>
            </Header>

            {loading ? <Load /> :

                <CarList
                    data={cars}
                    keyExtractor={item => String(item.id)}
                    renderItem={({ item }) => <Car data={item} onPress={() => handleCardDetails(item)} />}
                />
            }


            <PanGestureHandler
                onGestureEvent={onGestureEvent}
            >
                <Animated.View
                    style={[
                        myCarsButtonStyle,
                        {
                            position: 'absolute',
                            bottom: 13,
                            right: 22
                        }
                    ]}
                >
                    <ButtonAnimated
                        style={[
                            styles.button,
                            {
                                backgroundColor: theme.colors.main
                            }
                        ]}
                        onPress={handleOpenMyCars}
                    >
                        <Ionicons name="ios-car-sport" size={32} color={theme.colors.shape} />
                    </ButtonAnimated>
                </Animated.View>
            </PanGestureHandler>
        </Container>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    }
});