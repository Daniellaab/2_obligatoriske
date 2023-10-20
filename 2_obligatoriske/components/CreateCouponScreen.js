import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { getDatabase, ref, push } from 'firebase/database';

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
      // Define the path to the "coupons" node under the specific company
      const couponsRef = ref(db, `Companies/${company}/coupons`);

      // Data to push
      const newCouponData = {
        description: couponDescription,
        used: false,
      };

      // Push the new coupon data to the "coupons" node under the specific company
      await push(couponsRef, newCouponData);

      Alert.alert('Coupon created successfully');
      setCouponDescription('');
    } catch (error) {
      console.error('Error creating coupon:', error);
      Alert.alert('Failed to create coupon');
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Coupon Description"
        value={couponDescription}
        onChangeText={(text) => setCouponDescription(text)}
      />
      <Button title="Create Coupon" onPress={createCoupon} />
    </View>
  );
};

export default CreateCouponScreen;
