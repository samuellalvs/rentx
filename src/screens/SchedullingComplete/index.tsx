import React from 'react';
import { StatusBar, useWindowDimensions } from 'react-native';


import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';

import {
    Container,
    Content,
    Title,
    Message,
    Footer
} from './styles';

import { ConfirmButton } from '../../components/ConfirmButton';
import { useNavigation } from '@react-navigation/core';

export function SchedullingComplete() {
    const { width } = useWindowDimensions();

    const navigation = useNavigation();

    function handleComplete() {
        navigation.navigate("Home");
    }

    return (
        <Container>
            <StatusBar
                barStyle="light-content"
                translucent
                backgroundColor="transparent"
            />
            <LogoSvg width={width} />

            <Content>
                <DoneSvg width={80} height={80} />
                <Title>Carro alugado!</Title>

                <Message>
                    Agora você so precisa ir {'\n'}até a concessionária da RENTX {'\n'}e pegar seu automóvel
                </Message>

            </Content>
            <Footer>
                <ConfirmButton title="OK" onPress={handleComplete} />
            </Footer>
        </Container>
    );
}