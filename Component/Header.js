import React, { useContext } from 'react';
import { Header, Image } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../Screens/UserContext';

const CustomHeader = () => {
  const navigation = useNavigation();
  const { userData } = useContext(UserContext);

  const navigateToHome = () => {
    navigation.navigate('Home');
  };

  const navigateToSepet = () => {
    navigation.navigate('Sepet');
  };

  const navigateTohakkımda = () => {
    navigation.navigate('hakkımda');
  };

  const renderRightComponent = () => {
    if (userData && userData.type === 'admin') {
      return null; // veya başka bir şey
    } else {
      return {
        icon: 'shopping-cart',
        style: { color: 'black', fontSize: 23, marginRight: 25, marginTop: 11 },
        size: '25',
        onPress: navigateToSepet,
      };
    }
  };

  return (
    <Header
      backgroundColor="#a2d3f6"
      leftComponent={
        <Image
          containerStyle={{ height: 50 }}
          centerContainerStyle={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
          source={require('../assets/logo.jpg')}
          style={{ width: 60, height: 38, resizeMode: 'contain', marginLeft: 10, marginTop: 8 }}
          onPress={navigateToHome}
        />
      }
      centerComponent={{
        text: '   Derya Peynircilik',
        style: { color: 'black', fontSize: 18, marginTop: 15 },
        onPress: navigateTohakkımda,
      }}
      rightComponent={renderRightComponent()}
    />
  );
};

export default CustomHeader;
