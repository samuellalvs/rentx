import React, { useState } from 'react';
import { Alert, StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import { getPlatformDate } from '../../utils/getPlatformDate';

import ArrowSvg from '../../assets/arrow.svg';

import { Button } from '../../components/Button';
import { BackButton } from '../../components/BackButton';
import { Calendar, DayProps, generateInterval, MarkedDateProps } from '../../components/Calendar';
import { CarDTO } from '../../dtos/CarDTO';

import {
    Container,
    Header,
    Title,
    RentalPeriod,
    DateInfo,
    DateTitle,
    DateValue,
    Content,
    Footer
} from './styles';


interface RentalPeriod {
    startFormatted: string;
    endFormatted: string;
}

interface Params {
    car: CarDTO;
}

export function Schedulling() {
    const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps);
    const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps);
    const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);

    const theme = useTheme();
    const route = useRoute();

    const { car } = route.params as Params;

    const navigation = useNavigation();

    function handleConfirmRental() {
        if (!rentalPeriod.startFormatted || !rentalPeriod.endFormatted) {
            Alert.alert('Selecione o intervalo para alugar');
        } else {

            navigation.navigate("SchedullingDetails", {
                car,
                dates: Object.keys(markedDates)
            });
        }
    }

    function handleBack() {
        navigation.goBack();
    }

    function handleChangeDate(date: DayProps) {
        let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
        let end = date;

        if (start.timestamp > end.timestamp) {
            start = end;
            end = start;
        }

        setLastSelectedDate(end);

        console.log(start, end);
        const interval = generateInterval(start, end);

        setMarkedDates(interval);

        const firstDate = Object.keys(interval)[0];
        const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

        setRentalPeriod({
            startFormatted: format(getPlatformDate(new Date(firstDate)), 'dd/MM/yyyy'),
            endFormatted: format(getPlatformDate(new Date(endDate)), 'dd/MM/yyyy'),
        })
    }

    return (
        <Container>
            <StatusBar
                barStyle="light-content"
                translucent
                backgroundColor="transparent"
            />

            <Header>
                <BackButton onPress={handleBack} color={theme.colors.shape} />
                <Title>
                    Escolha uma {'\n'}
                    data de início e{'\n'}
                    fim do aluguel
                </Title>
                <RentalPeriod>
                    <DateInfo>
                        <DateTitle>DE</DateTitle>
                        <DateValue selected={!!rentalPeriod.startFormatted}>
                            {rentalPeriod.startFormatted}

                        </DateValue>
                    </DateInfo>

                    <ArrowSvg />

                    <DateInfo>
                        <DateTitle>DE</DateTitle>
                        <DateValue selected={!!rentalPeriod.endFormatted}>
                            {rentalPeriod.endFormatted}

                        </DateValue>
                    </DateInfo>
                </RentalPeriod>
            </Header>

            <Content>
                <Calendar
                    markedDates={markedDates}
                    onDayPress={handleChangeDate}
                />
            </Content>
            <Footer>
                <Button
                    title="Confirmar"
                    onPress={handleConfirmRental}
                    enabled={!!rentalPeriod.startFormatted}
                />
            </Footer>
        </Container>
    );
}