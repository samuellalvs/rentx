import React from 'react';
import { ActivityIndicator } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';
import theme from '../../styles/theme';

import {
    Container,
    Title
} from './styles';

interface Props extends RectButtonProps {
    title: string;
    color?: string;
    loading?: boolean;
    light?: boolean;
}

export function Button({ title, color, onPress, enabled = true, loading = false, light = false, ...rest }: Props) {
    return (
        <Container
            color={color}
            onPress={onPress}
            enabled={enabled}
            style={{ opacity: (enabled === false || loading === true) ? .5 : 1 }}
            {...rest}
        >
            {
                loading ?
                    <ActivityIndicator color={theme.colors.shape} />
                    :
                    <Title light={light}>{title}</Title>
            }

        </Container>
    );
}