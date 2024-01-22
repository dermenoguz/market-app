import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image } from 'react-native';
import { Button, Input } from 'react-native-elements';
import Spacer from '../Component/Spacer';
import axios from 'axios';
import { UserContext } from './UserContext';
const Login = ({ navigation }) => {
  const { setUserDataContext } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleRegisterLink = () => {
    navigation.navigate('Register');
  };
  const HomeScreenEnter = async () => {
    try {
      const data = JSON.stringify({
        "dataSource": "Cluster0",
        "database": "Market",
        "collection": "Login",
        "filter": { "username": username, "password": password }
      });
      console.log('Login Data:', data);
      const config = {
        method: 'post',
        url: 'https://eu-central-1.aws.data.mongodb-api.com/app/data-iotho/endpoint/data/v1/action/findOne',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Request-Headers': '*',
          'api-key': 'DmDCSzlqkXaCjASVHBO77NCj678ggZnanhgj8oi2sTKEyn8F6qLrpdohJN60uWH2',
          'Accept': 'application/json'
        },
        data: data
      };
      const response = await axios(config);
      if (response.data.document) {
        const { _id, username, password, telefon, type } = response.data.document;
        console.log('MongoDB ID:', _id);
        console.log('Username:', username);
        console.log('Password:', password);
        console.log('Telefon:', telefon);
        console.log('Type:', type);
        setUserDataContext({ type });
        navigation.navigate('Home');
      } else {
        alert('Kullanıcı adı veya şifre hatalı!');
      }
    } catch (error) {
      console.error('Giriş hatası:', error);
      alert('Giriş sırasında bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/don.jpg')}
        style={styles.backgroundImage}
      />
      <Image
        source={require('../assets/logo.jpg')}
        style={styles.logo}
      />
      <Text style={styles.title}></Text>
      <Input
        placeholder="Kullanıcı Adı"
        leftIcon={{ type: 'font-awesome', name: 'user', marginTop: 0 }}
        onChangeText={(text) => setUsername(text)}
        value={username}
      />

      <Input
        placeholder="Şifre"
        leftIcon={{ type: 'font-awesome', name: 'lock' }}
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        value={password}
      />

      <Button title="Giriş Yap" onPress={HomeScreenEnter} />

      <TouchableOpacity onPress={handleRegisterLink}>
        <Spacer height={10}></Spacer>
        <Text style={styles.registerText}>Kayıt Olmak için</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  logo: {
    width: 150,
    height: 150,  
    marginBottom: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  registerText: {
    marginTop: 10,
    color: 'blue',
  },
});

export default Login;
