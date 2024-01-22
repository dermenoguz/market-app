import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Spacer from '../Component/Spacer';
const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <Spacer height={25}></Spacer>
      <Image
        source={require('../assets/Hakkımızda.jpg')}
        style={styles.image}
      />
      <Text style={styles.heading}>Hakkımızda</Text>
      <Text style={styles.paragraph}>
        Ben Hüseyin BEYHAN, Derya Peynircilik'in kurucusuyum. Sizlere kaliteli ve lezzetli peynir ürünleri sunmak için buradayım. Yıllardır peynir sektöründe edindiğim deneyim ve tutku, işletmemizin temelini oluşturuyor.
      </Text>
      <Text style={styles.paragraph}>
        Derya Peynircilik olarak, doğal ve sağlıklı beslenmeye olan inancımızı her ürünümüze yansıtıyoruz. Her bir peynirimiz, özenle seçilmiş malzemelerle üretilir ve geleneksel yöntemlerle olgunlaştırılır. Sizlere en taze ve en lezzetli peynirleri sunabilmek için sürekli olarak çalışıyoruz.
      </Text>
      <Text style={styles.paragraph}>
        Derya Peynircilik ailesi olarak, sizlere samimi bir alışveriş deneyimi sunmayı ve sofralarınızı lezzetlendirmeyi amaçlıyoruz. Her bir müşterimiz bizim için değerlidir ve güveninizle bize destek olduğunuz için teşekkür ederiz.
      </Text>
      <Text style={styles.paragraph}>
        Sağlıklı ve lezzetli günler dilerim.
      </Text>
      <Text style={styles.signature}>
        Saygılarımla,
        {'\n'}Hüseyin BEYHAN
        {'\n'}Derya Peynircilik Kurucusu
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    textAlign: 'justify',
    marginBottom: 15,
  },
  signature: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 15,
  },
});

export default AboutScreen;
