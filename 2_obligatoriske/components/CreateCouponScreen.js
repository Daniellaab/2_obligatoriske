import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { getDatabase, ref, push } from 'firebase/database';
import globalStyles from '../globalStyles/GlobalStyles';

const CreateCouponScreen = ({ route }) => {
  const db = getDatabase();
  const company = route.params;
  const [couponDescription, setCouponDescription] = useState('');

  const createCoupon = async () => {
    if (couponDescription.trim() === '') {
      Alert.alert('Coupon description cannot be empty');
      return;
    }

    try {
      const couponsRef = ref(db, `Coupons/${company}`);
      const newCouponData = {
        description: couponDescription,
        used: false,
      };

      await push(couponsRef, newCouponData);

      Alert.alert('Coupon created successfully');
      setCouponDescription('');
    } catch (error) {
      console.error('Error creating coupon:', error);
      Alert.alert('Failed to create coupon');
    }
  };

  return (
    <View style={globalStyles.container}>
      <TextInput
        style={globalStyles.input}
        placeholder="Coupon Description"
        value={couponDescription}
        onChangeText={(text) => setCouponDescription(text)}
      />
      <Button title="Create Coupon" onPress={createCoupon} color="#007aff" />
    </View>
  );
};

export default CreateCouponScreen;
