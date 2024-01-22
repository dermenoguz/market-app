import React from 'react';
import { View, Text, Image, StyleSheet} from 'react-native';
import { Button } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CategoryDetailScreen = ({ route }) => {
  const { product_name, product_img_name, product_price, product_product_key} = route.params;
  const productName = product_name;
  const productImage = product_img_name;
  const productPrice = product_price;
  const productproductkey=product_product_key;

  const handleAddToCart = async () => {
    try {
      const existingData = await AsyncStorage.getItem('sepet');
      const veriler = existingData ? JSON.parse(existingData) : [];
      


      const yeni_veri = {
        productproductkey: product_product_key,
        title: productName,
        image: productImage,
        price: productPrice,
      };

      veriler.push(yeni_veri);
      console.log(yeni_veri);
      await AsyncStorage.setItem('sepet', JSON.stringify(veriler));

      console.log('Veriler başarıyla güncellendi!');
      

    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={productImage} style={styles.productImage} />
      <Text style={styles.productTitle}>{productName}</Text>
      <Text style={styles.productPrice}>{`Fiyat: ${productPrice} TL`}</Text>
      <Button
        style={styles.button}
        onPress={handleAddToCart}

      >
        Sepete Ekle

      </Button>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  productTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  productPrice: {
    fontSize: 18,
    color: 'green',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#FF9800',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
});

export default CategoryDetailScreen;
