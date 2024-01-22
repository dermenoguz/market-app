import React, { useEffect } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Button, Divider } from 'react-native-elements';

const HomeScreen = ({ navigation, route }) => {
  const navigateToQrCodeScreen = () => {
    navigation.navigate('QrCode');
  };

  useEffect(() => {
    
    const userId = route.params ? route.params.userId : null;

    if (userId === 'istenenId') {
      navigation.navigate('BaskaSayfa');
    }

    // Eğer istenenId değilse burada başka bir işlem yapabilirsiniz
  }, [route.params]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <TextInput
        placeholder="aramak istediğiniz ürünü giriniz. "
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
      />

      <Button
        title="ARA"
        onPress={navigateToQrCodeScreen}
        buttonStyle={{ backgroundColor: 'blue', marginBottom: 10 }}
        titleStyle={{ color: 'white' }}
      />

      <Divider style={{ marginBottom: 10 }} />

      <Button
        title={<Text style={{ fontWeight: 'bold', fontStyle: 'italic' }}>BARCODE ile ürün aramak için lütfen burayı deneyin.</Text>}
        onPress={navigateToQrCodeScreen}
        buttonStyle={{ backgroundColor: 'green', marginBottom: 10 }}
        titleStyle={{ color: 'white' }}
      />
    </View>
  );
};

export default HomeScreen;
