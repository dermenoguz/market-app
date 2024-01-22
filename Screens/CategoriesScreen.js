import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomHeader from '../Component/Header';
import CustomFooter from '../Component/Footer';
import axios from 'axios';

import kampanya from '../assets/Categories/kampanya.jpg';
import Et from '../assets/Categories/Et.png';
import Peynir from '../assets/Categories/Süt.jpg';
import Zeytin from '../assets/Categories/Zeytin.jpg';
import Helva from '../assets/Categories/HELVA.jpg';
import Aburcubur from '../assets/Categories/AburCubur.jpg';

const importImage = (imageName) => {
  switch (imageName) {
    case 'kampanya':
      return kampanya;
    case 'Et':
      return Et;
    case 'Peynir':
      return Peynir;
    case 'Zeytin':
      return Zeytin;
    case 'Helva':
      return Helva;
    case 'Abur_Cubur':
      return Aburcubur;
    default:
      return null; // Bilinmeyen bir isim varsa null döndür
  }
};

const CategoriesScreen = () => {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('https://eu-central-1.aws.data.mongodb-api.com/app/data-iotho/endpoint/data/v1/action/find', {
          dataSource: 'Cluster0',
          database: 'Market',
          collection: 'categories'
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*',
            'api-key': 'DmDCSzlqkXaCjASVHBO77NCj678ggZnanhgj8oi2sTKEyn8F6qLrpdohJN60uWH2',
            'Accept': 'application/json'
          }
        });

        const formattedCategories = response.data.documents.map(item => ({
          id: item._id,
          title: item.cat_title,
          image: importImage(item.cat_img_name),
          productsKey: `p_${item._id}`
        }));

        setCategories(formattedCategories);
      } catch (error) {
        console.error('Veri alınamadı:', error.message);
      }
    };

    fetchData();
  }, []);

  

  const handleCategoryPress = (category) => {
    console.log(category)
    navigation.navigate('CategoryDetail', { productsKey: category.productsKey });
  };
  return (
    <ScrollView style={styles.container}>
      <CustomHeader />
      <View style={styles.content}>
        <Text style={styles.title}>Kategoriler</Text>
        <View style={styles.categoriesContainer}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryItem}
              onPress={() => handleCategoryPress(category)}
            >
              <Image source={category.image} style={styles.categoryImage} />
              <Text style={styles.categoryTitle}>{category.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <CustomFooter />
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
});

export default CategoriesScreen;
