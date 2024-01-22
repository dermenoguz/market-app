import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Icon, Divider } from 'react-native-elements';
import CustomHeader from '../Component/Header';
import Spacer from '../Component/Spacer';
import CustomFooter from '../Component/Footer';

const HomeScreen = ({ navigation }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    require('../assets/etkampanya.jpeg'),
    require('../assets/peynirkampanya.jpg'),
    require('../assets/Et/Gögüs.jpg'),
  ];

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0));
  };

  return (
    <View style={styles.container}>
      <CustomHeader />
      <View style={styles.content}>
        <View style={[styles.imageContainer, { alignItems: 'center' }]}>
          <TouchableOpacity onPress={handlePrevImage} style={styles.arrowButton}>
            <Icon name="arrow-back" />
          </TouchableOpacity>
          <Image source={images[currentImageIndex]} style={styles.image} />
          <TouchableOpacity onPress={handleNextImage} style={styles.arrowButton}>
            <Icon name="arrow-forward" />
          </TouchableOpacity>
        </View>
        <Spacer height={10}></Spacer>
        <Text style={styles.title}>Bu Haftanın en Popüler Ürünümüz </Text>
        <Divider style={styles.divider} />
        <Card>
          <Card.Title></Card.Title>
          <Card.Divider />
          <View style={{ position: 'relative', alignItems: 'center' }}>
            <Image
              style={{ width: '100%', height: 100 }}
              resizeMode="contain"
              source={require('../assets/Et/Sucuk.jpg')}
            />
            <Spacer height={20}></Spacer>
            <Text>Yöresel Sucuğumuz</Text>
          </View>
          <Divider style={styles.divider} />
          <View style={styles.cardFooter}>
            <Icon name="favorite" />
            <Icon name="save" />
          </View>
        </Card>
      </View>
      <CustomFooter/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  arrowButton: {
    padding: 0,
  },
  image: {
    width: 300,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    alignItems: 'center',
  },
  divider: {
    backgroundColor: 'black',
    height: 2,
    marginVertical: 10,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default HomeScreen;
