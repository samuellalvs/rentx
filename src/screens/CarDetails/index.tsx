import React from 'react';

import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Button } from '../../components/Button';

import speedSvg from '../../assets/speed.svg';
import accelerationSvg from '../../assets/acceleration.svg';
import forceSvg from '../../assets/force.svg';
import gasolineSvg from '../../assets/gasoline.svg';
import exchangeSvg from '../../assets/exchange.svg';
import peopleSvg from '../../assets/people.svg';

import {
    Container,
    Header,
    CarImages,
    Content,
    Details,
    Description,
    Brand,
    Name,
    Rent,
    Period,
    Price,
    About,
    Acessories,
    Footer
} from './styles';

import { useNavigation } from '@react-navigation/core';


export function CarDetails() {
    const navigation = useNavigation();

    function handleConfirmRental() {
        navigation.navigate("Schedulling");
    }

    return (
        <Container>
            <Header>
                <BackButton onPress={() => { }} />
            </Header>

            <CarImages>

                <ImageSlider imagesUrl={['https://production.autoforce.com/uploads/version/profile_image/5051/comprar-tiptronic_23c24c9941.png']} />
            </CarImages>

            <Content>
                <Details>
                    <Description>
                        <Brand>Lamborghini</Brand>
                        <Name>Huracan</Name>
                    </Description>

                    <Rent>
                        <Period>Ao dia</Period>
                        <Price>R$ 590</Price>
                    </Rent>
                </Details>

                <Acessories>

                    <Accessory name="380Km/h" icon={speedSvg} />
                    <Accessory name="3.2s" icon={accelerationSvg} />
                    <Accessory name="800 HP" icon={forceSvg} />
                    <Accessory name="Gasolina" icon={gasolineSvg} />
                    <Accessory name="Auto" icon={exchangeSvg} />
                    <Accessory name="2 pessoas" icon={peopleSvg} />

                </Acessories>
                <About>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sed mollis risus. Phasellus venenatis auctor nibh non scelerisque. In accumsan mauris eu diam facilisis gravida. Phasellus sed nisl urna. Vestibulum malesuada, enim vitae condimentum vulputate, nulla ex tempus dui, eu pulvinar ex enim sit amet neque.
                </About>

            </Content>
            <Footer>
                <Button title="Escolher período do aluguel" onPress={handleConfirmRental} />
            </Footer>
        </Container>
    );
}