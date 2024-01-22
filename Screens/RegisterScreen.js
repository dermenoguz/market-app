// RegisterScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { Input, Button } from 'react-native-elements';
import axios from 'axios';

const RegisterScreen = ({ onRegister, onLoginPress }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const handleRegister = async () => {
    try {
      const data = JSON.stringify({
        "dataSource": "Cluster0",
        "database": "Market",
        "collection": "Login",
        "document": {
          "username": username,
          "password": password,
          "phone": phone
        }
      });

      const config = {
        method: 'post',
        url: 'https://eu-central-1.aws.data.mongodb-api.com/app/data-iotho/endpoint/data/v1/action/insertOne',
        headers: { 
          'Content-Type': 'application/json', 
          'Access-Control-Request-Headers': '*', 
          'api-key': 'DmDCSzlqkXaCjASVHBO77NCj678ggZnanhgj8oi2sTKEyn8F6qLrpdohJN60uWH2', 
          'Accept': 'application/json'
        },
        data: data
      };

      const response = await axios(config);
      console.log('Gelen Veri:', response.data);
      if (response.data.success) {
        alert('Malesef Kayıt Olamadınız!!');
        onRegister(true);
      } else {
        alert('Kayıt başarılı! Giriş yapabilirsiniz.');
      }
    } catch (error) {
      console.error('Kayıt hatası:', error);
      alert('Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  return (
    <ImageBackground
      source={require('../assets/don.jpg')} // Arka plan resmi
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Kayıt Ol</Text>
        <Input
          placeholder="Kullanıcı Adı"
          leftIcon={{ type: 'font-awesome', name: 'user' }}
          onChangeText={(text) => setUsername(text)}
          value={username}
        />
        <Input
          placeholder="Telefon"
          leftIcon={{ type: 'font-awesome', name: 'envelope' }}
          onChangeText={(text) => setPhone(text)}
          value={phone}
        />
        <Input
          placeholder="Şifre"
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <Button title="Kayıt Ol" onPress={handleRegister} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  innerContainer: {
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Saydam bir beyaz arka plan
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default RegisterScreen;
