import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Divider } from 'react-native-elements';
import CustomHeader from '../Component/Header';
import CustomFooter from '../Component/Footer';
import Spacer from '../Component/Spacer';
import axios from 'axios';

import Kıyma from '../assets/Kampanyalar/Kıyma.jpg';
import Peynir from '../assets/Kampanyalar/Peynir.jpg';
import Tereyag from '../assets/Kampanyalar/Tereyağ.jpg';
import Sut from '../assets/Categories/Süt.jpg';
import bonfile from '../assets/Et/Bonfile.jpg';
import tavuk_gögüs from '../assets/Et/Gögüs.jpg';
import sucuk from '../assets/Et/Sucuk.jpg';
import tum_tavuk from '../assets/Et/BütünTavuk.jpg';
import chedaar from '../assets/Süt/Chedar.jpg';
import eski_kasar from '../assets/Süt/EskiKasar.jpg';
import kaymak from '../assets/Süt/Kaymak.jpg';
import tulum from '../assets/Süt/Tulum.jpg';
import yesil from '../assets/Zeytin/YeşilZeytin.jpg';
import siyah from '../assets/Zeytin/SiyahZeytin.jpg';
import zeytin_yagi from '../assets/Zeytin/Zeytinyağı.jpg';
import sele from '../assets/Zeytin/sele.jpeg';
import a_fıstıklı from '../assets/Helva/antephelva.png';
import çekme from '../assets/Helva/ÇekmeHelva.jpg';
import cevizli from '../assets/Helva/CevizliHelva.jpg';
import kakaolu from '../assets/Helva/KakaoluHelva.jpg';
import patos from '../assets/Abur-Cubur/Patos.png';
import soda from '../assets/Abur-Cubur/Soda.jpg';
import t_ekmegi from '../assets/Abur-Cubur/trabzon.jpg';
import gofret from '../assets/Abur-Cubur/Ülker.jpg';

const importImage = (imageName) => {
  switch (imageName) {
    case 'Kıyma':
      return Kıyma;
    case 'Peynir':
      return Peynir;
    case 'Tereyağ':
      return Tereyag;
    case 'Süt':
      return Sut;
    case 'bonfile':
      return bonfile;
    case 'tavuk_gögüs':
      return tavuk_gögüs;
    case 'sucuk':
      return sucuk;
    case 'tum_tavuk':
      return tum_tavuk;
    case 'chedaar':
      return chedaar;
    case 'eski_kasar':
      return eski_kasar;
    case 'kaymak':
      return kaymak;
    case 'tulum':
      return tulum;
    case 'yesil':
      return yesil;
    case 'siyah':
      return siyah;
    case 'zeytin_yagi':
      return zeytin_yagi;
      case 'sele':
      return sele;
    case 'a_fıstıklı':
      return a_fıstıklı;
    case 'çekme':
      return çekme;
    case 'cevizli':
      return cevizli;
    case 'kakaolu':
      return kakaolu;
    case 'patos':
      return patos;
    case 'soda':
      return soda;
    case 't_ekmegi':
      return t_ekmegi;
    case 'gofret':
      return gofret;
    default:
      return null;
  }
};


const CategoriesScreen = ({ route }) => {
  const navigation = useNavigation();
  const productsKey  = route.params.productsKey;
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await axios.post(
          'https://eu-central-1.aws.data.mongodb-api.com/app/data-iotho/endpoint/data/v1/action/find',
          {
            dataSource: 'Cluster0',
            database: 'Market',
            collection: 'products'
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Request-Headers': '*',
              'api-key': 'DmDCSzlqkXaCjASVHBO77NCj678ggZnanhgj8oi2sTKEyn8F6qLrpdohJN60uWH2',
              'Accept': 'application/json'
            }
          }
        );
          
        const formattedCategories = categoriesResponse.data.documents
        .map(item => ({
          id: item._id,
          title: item.product_name,
          barcode: item.barcod_no,
          image: importImage(item.product_img_name),
          productsKey: `p_${item.category_id}`,
          price: item.price
        }))
        .filter(item => item.productsKey === productsKey);
            console.log(formattedCategories)
        setCategories(formattedCategories);
      } catch (error) {
        console.error('Kategoriler alınamadı:', error.message);
      }
    };

    fetchData();
  }, []); 

  const handleCategoryPress = (category) => {
    console.log(category)

    navigation.navigate('Productone', {
      product_name: category.title,
      product_img_name: category.image,
      product_price:category.price,
      product_product_key:category.productsKey
      
    });
  };
  
  

  return (
    <ScrollView style={styles.container}>
      <CustomHeader />
      <View style={styles.content}>
        <Text style={styles.title}>Ürünler</Text>
        <Divider style={styles.divider} />
        <Text>Ürünlerimiz Doğal ve Yerli Ürünlerdir.</Text>
        <Spacer height={0} />
        <View style={styles.categoriesContainer}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryItem}
              onPress={() => handleCategoryPress(category)}
            >
               <Spacer height={20} />
            <Image source={category.image} style={styles.categoryImage} />
            <Text style={styles.categoryTitle}>{category.title}</Text>
            <Text style={styles.price}>{category.price} TL</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <Spacer height={20} />
      <CustomFooter style={styles.footer} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'green', 
    textAlign: 'center', 
    },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryItem: {
    width: '48%',
    marginBottom: 15,
  },
  categoryImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  categoryTitle: {
    marginTop: 10,
    textAlign: 'center',
  },
  // Add styles for priceText if needed
  footer: {
    alignSelf: 'flex-end',
  },
  divider: {
    backgroundColor: 'black',
    height: 2,
    marginVertical: 10,
  },
});

export default CategoriesScreen;
