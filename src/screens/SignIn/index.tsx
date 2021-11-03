import React, { useState } from 'react';
import {
    StatusBar,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from 'react-native';

import * as Yup from 'yup';

import { useTheme } from 'styled-components';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';

import {
    Container,
    Header,
    Title,
    SubTitle,
    Footer,
    Form
} from './styles';
import { useNavigation } from '@react-navigation/core';

export function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const theme = useTheme();

    const navigation = useNavigation();

    async function handleSignIn() {
        try {
            const schema = Yup.object().shape({
                email: Yup.string()
                    .required('E-mail obrigatório')
                    .email('Digite um e-mail válido'),
                password: Yup.string()
                    .required('A senha é obrigatória')
            });

            await schema.validate({ email, password });
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                Alert.alert('Opa', error.message);
            } else {
                Alert.alert(
                    'Erro na autenticação',
                    'Ocorreu um erro ao fazer login, verifique as credenciais'
                );
            }
        }
    }

    function handleNewAccount() {
        navigation.navigate('SignUpFirstStep');
    }

    return (

        <KeyboardAvoidingView behavior="position" enabled>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <StatusBar
                        barStyle="dark-content"
                        backgroundColor="transparent"
                        translucent
                    />

                    <Header>
                        <Title>
                            Estamos {'\n'}quase lá.
                        </Title>
                        <SubTitle>
                            Faça seu login para começar {'\n'}
                            uma experiência incrível.
                        </SubTitle>
                    </Header>

                    <Form>
                        <Input
                            iconName="mail"
                            placeholder="E-mail"
                            keyboardType="email-address"
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={setEmail}
                            value={email}
                        />

                        <PasswordInput
                            iconName="lock"
                            placeholder="Senha"
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={setPassword}
                            value={password}
                        />


                    </Form>

                    <Footer>

                        <Button
                            title="Login"
                            onPress={handleSignIn}
                            enabled={false}
                            loading={false}
                        />
                        <Button
                            title="Criar conta gratuita"
                            color={theme.colors.background_secondary}
                            onPress={handleNewAccount}
                            enabled={true}
                            loading={false}
                            light={true}
                        />
                    </Footer>
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}