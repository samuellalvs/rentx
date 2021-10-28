import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { Car } from '../../components/Car';

import { CarDTO } from '../../dtos/CarDTO';
import { useTheme } from 'styled-components';
import api from '../../services/api';

import { BackButton } from '../../components/BackButton';

import {
    Container,
    Header,
    Title,
    SubTitle,
    Content,
    Appointments,
    ApointmentsTitle,
    ApointmentsQuantity,
    CarWrapper,
    CarFooter,
    CarFooterTitle,
    CarFooterPeriod,
    CarFooterDate
} from './styles';
import { Load } from '../../components/Load';

interface CarProps {
    id: string;
    user_id: string;
    car: CarDTO;
    startDate: string;
    endDate: string;
}

export function MyCars() {
    const [cars, setCars] = useState<CarProps[]>([]);
    const [loading, setLoading] = useState(true);

    const navigation = useNavigation();

    const theme = useTheme();

    function handleBack() {
        navigation.goBack();
    }

    useEffect(() => {
        async function fetchCars() {
            try {
                const response = await api.get('/schedules_byuser?users_id=1');
                console.log(response.data)
                setCars(response.data);
            } catch (error) {

            } finally {
                setLoading(false);
            }
        }

        fetchCars();
    }, [])

    return (
        <Container>
            <Header>
                <BackButton onPress={handleBack} color={theme.colors.shape} />
                <Title>
                    Escolha uma {'\n'}
                    data de início e{'\n'}
                    fim do aluguel
                </Title>
                <SubTitle>
                    Conforto, segurança e praticidade.
                </SubTitle>
            </Header>

            {
                loading ?
                    <Load />
                    :
                    <Content>
                        <Appointments>
                            <ApointmentsTitle>
                                Agendamentos feitos
                            </ApointmentsTitle>
                            <ApointmentsQuantity>
                                {cars.length}
                            </ApointmentsQuantity>
                        </Appointments>

                        <FlatList
                            data={cars}
                            keyExtractor={item => item.id}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <CarWrapper>
                                    <Car data={item.car} />
                                    <CarFooter>
                                        <CarFooterTitle>Período</CarFooterTitle>
                                        <CarFooterPeriod>
                                            <CarFooterDate>{item.startDate}</CarFooterDate>
                                            <AntDesign
                                                name="arrowright"
                                                size={20}
                                                color={theme.colors.title}
                                                style={{ marginHorizontal: 10 }}
                                            />
                                            <CarFooterDate>{item.endDate}</CarFooterDate>
                                        </CarFooterPeriod>
                                    </CarFooter>
                                </CarWrapper>
                            )}
                        />
                    </Content>
            }

        </Container>
    );
}