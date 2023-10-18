import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { getDatabase, ref, onValue } from "firebase/database";

const CouponsScreen = () => {
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    // Fetch coupons from Firebase when the component mounts
    const unsubscribe = getDatabase.collection('coupons').where('used', '==', false).onSnapshot(snapshot => {
      const couponsData = [];
      snapshot.forEach(doc => {
        couponsData.push({ id: doc.id, ...doc.data() });
      });
      setCoupons(couponsData);
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <View>
      {coupons.map(coupon => (
        <View key={coupon.id}>
          <Text>Coupon ID: {coupon.id}</Text>
        </View>
      ))}
    </View>
  );
};

export default CouponsScreen;
