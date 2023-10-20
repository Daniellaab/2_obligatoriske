import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const menuItems = [
    { title: 'Add Company', screen: 'AddCompany' },
    { title: 'All Companies', screen: 'AllCompanies' },
    { title: 'Camera', screen: 'Camera' },
    { title: 'Create Coupon', screen: 'CreateCoupon' },
    { title: 'Coupons', screen: 'Coupons' },
    { title: 'Map', screen: 'Map' },
  ];

  return (
    <View style={styles.container}>
      {menuItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.buttonContainer}
          onPress={() => navigation.navigate(item.screen)}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>{item.title}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '80%',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#fff',
    elevation: 5,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default HomeScreen;
