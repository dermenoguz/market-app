import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomHeader from '../Component/Header';
import CustomFooter from '../Component/Footer';
import Spacer from '../Component/Spacer';

const Sepet = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const loadCartData = async () => {
      try {
        const storedCartData = await AsyncStorage.getItem('sepet');
        if (storedCartData) {
          const parsedCartData = JSON.parse(storedCartData);
          setCart(parsedCartData);
          console.log('Sepet Verileri:', parsedCartData);
        }
      } catch (error) {
        console.error('Sepet verilerini yüklerken hata oluştu:', error);
      }
    };
    loadCartData();
  }, []);

  const urunSil = async (itemId) => {
    try {
      const existingData = await AsyncStorage.getItem('sepet');
      let veriler = existingData ? JSON.parse(existingData) : [];
      const yeniVeriler = veriler.filter((item) => item.id !== itemId);
      await AsyncStorage.setItem('sepet', JSON.stringify(yeniVeriler));
      setCart(yeniVeriler);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <ScrollView>
      <CustomHeader />
      <Spacer height={15} />
      {cart.map((urun) => (
        <ListItem key={urun.id} bottomDivider>
          <Icon name="shopping-basket" type="font-awesome" />
          <ListItem.Content>
            <ListItem.Title>{urun.title}</ListItem.Title>
            <ListItem.Subtitle>{`Fiyat: ${urun.price} TL`}</ListItem.Subtitle>
          </ListItem.Content>
          <TouchableOpacity onPress={() => urunSil(urun.id)}>
            <Text style={styles.silButton}>Sil</Text>
          </TouchableOpacity>
        </ListItem>
      ))}
      <CustomFooter />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  silButton: {
    color: 'red',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  totalContainer: {
    borderTopWidth: 1,
    borderTopColor: 'black',
    paddingVertical: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default Sepet;
