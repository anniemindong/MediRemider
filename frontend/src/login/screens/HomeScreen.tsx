import React, { memo } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import Paragraph from '../components/Paragraph';
import { Navigation } from '../types';

type Props = {
  navigation: Navigation;
};

const HomeScreen = ({ navigation }: Props) => (
  <Background>
    <Logo />
    <Header>Medi Reminder</Header>

    <Paragraph>
    Let us remind you!    </Paragraph>
    <Button title="Login" onPress={() => navigation.navigate('LoginScreen')} />
    <Button
      bordered
      title="Sign Up"
      onPress={() => navigation.navigate('RegisterScreen')}
    />
  </Background>
);

export default memo(HomeScreen);
