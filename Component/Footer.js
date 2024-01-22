// CustomFooter.js

import React, { useContext } from 'react';
import { View } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../Screens/UserContext';

const CustomFooter = ({ selectedIndex, onPress }) => {
  const buttons = ['Kategori', 'Anasayfa', 'Ürünler'];
  const navigation = useNavigation();
  const { userData } = useContext(UserContext);

  const handleCategoryPress = () => {
    navigation.navigate('Categories');
  };

  const handleHomePress = () => {
    navigation.navigate('Home');
  };

  const handleQRPress = () => {
    if (userData && userData.type === 'admin') {
      navigation.navigate('adminQr');
    }
  };

  
  if (userData && userData.type !== 'admin') {
    buttons.pop(); // "Ürünler" butonunu kaldır
  }

  return (
    <View style={{ marginTop: 10, height: 80 }}>
      <ButtonGroup
        buttons={buttons}
        selectedIndex={selectedIndex}
        onPress={(index) => {
          switch (index) {
            case 0:
              handleCategoryPress();
              break;
            case 1:
              handleHomePress();
              break;
            case 2:
              handleQRPress();
              break;
            default:
              onPress(index);
              break;
          }
        }}
      />
    </View>
  );
};

export default CustomFooter;
