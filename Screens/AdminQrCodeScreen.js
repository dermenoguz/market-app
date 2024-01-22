import { BarCodeScanner } from 'expo-barcode-scanner';   
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

const App = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [responseid, setResponseid] = useState(null);
  const [Urun, setUrun] = useState('');
  const [fiyat, setFiyat] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [buttonClicks, setButtonClicks] = useState({});

  const urls = [
    'https://eu-central-1.aws.data.mongodb-api.com/app/data-iotho/endpoint/data/v1/action/findOne',
    'https://eu-central-1.aws.data.mongodb-api.com/app/data-iotho/endpoint/data/v1/action/insertOne',
    'https://eu-central-1.aws.data.mongodb-api.com/app/data-iotho/endpoint/data/v1/action/updateOne',
    'https://eu-central-1.aws.data.mongodb-api.com/app/data-iotho/endpoint/data/v1/action/deleteOne'
  ];

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setResponseid(data);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  const handleButtonClick = async (buttonNumber) => {
    try {
      let data;
      if (buttonNumber === 1) {
        data = JSON.stringify({
          "dataSource": "Cluster0",
          "database": "Market",
          "collection": "test",
          "filter": { "barcodid": responseid }
        });
      } else if (buttonNumber === 2) {
        data = JSON.stringify({
          "dataSource": "Cluster0",
          "database": "Market",
          "collection": "test",
          "document": {
            "barcodid": responseid,
            "Urun": Urun,
            "fiyat": fiyat
          }
        });
      } else if (buttonNumber === 3) {
        data = JSON.stringify({
          "dataSource": "Cluster0",
          "database": "Market",
          "collection": "test",
          "filter": { "barcodid": responseid },
          "update": { "$set": { "fiyat": fiyat, "Urun": Urun } }
        });
      } else if (buttonNumber === 4) {
        data = JSON.stringify({
          "dataSource": "Cluster0",
          "database": "Market",
          "collection": "test",
          "filter": { "barcodid": responseid }
        });
      }

      const selectedUrl = urls[buttonNumber - 1];

      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: selectedUrl,
        headers: { 
          'Content-Type': 'application/json', 
          'Access-Control-Request-Headers': '*', 
          'api-key': 'H3mD8JhtcNM7Gr2LbqKUUtHXSMSYMdbBJuqtFUrCBXSAL1VuueuvUDl2dQ415H5Y', 
          'Accept': 'application/json'
        },
        data: data
      };

      const response = await axios.request(config);
      setResponseData(response.data);
    } catch (error) {
      console.error(error);
    }

    setButtonClicks(prevState => ({
      ...prevState,
      [buttonNumber]: (prevState[buttonNumber] || 0) + 1,
    }));
  };

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Text style={styles.scanText}>QR Code tarama tamamlandı!</Text>
      )}
      <TextInput
        style={styles.input}
        placeholder="Barcode id"
        value={responseid}
        onChangeText={(text) => setResponseid(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Ürün Adı"
        value={Urun}
        onChangeText={(text) => setUrun(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Fiyat"
        value={fiyat}
        onChangeText={(text) => setFiyat(text)}
      />
      <TouchableOpacity style={styles.button} onPress={() => handleButtonClick(1)}>
        <Text>Listeleme</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleButtonClick(2)}>
        <Text>Ekleme</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleButtonClick(3)}>
        <Text>Güncelleme</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleButtonClick(4)}>
        <Text>Silme</Text>
      </TouchableOpacity>
      {responseData && (
        <View style={styles.responseContainer}>
          <Text style={styles.responseText}>Response Data:</Text>
          <Text>{JSON.stringify(responseData, null, 2)}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  scanText: {
    fontSize: 18,
    color: 'white',
    marginTop: 20,
  },
  responseContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#ecf0f1',
    borderRadius: 5,
  },
  responseText: {
    fontWeight: 'bold',
  },
});

export default App;
