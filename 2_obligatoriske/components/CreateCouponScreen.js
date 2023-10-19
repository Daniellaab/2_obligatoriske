import React, { useState } from 'react';
import { View, Button } from 'react-native';
import { getDatabase, ref, onValue } from "firebase/database";

//virker ikke
const CreateCouponScreen = ({ route }) => {
  const { companyId } = route.params;
  const [stamps, setStamps] = useState(0);

  const createCoupon = () => {
    if (stamps >= 8) {
      // Create a coupon for a specific company
      getDatabase.collection('coupons').add({
        companyId,
        used: false,
      });
      // Reset stamp card after creating the coupon
      setStamps(0);
    } else {
      // Handle case when user does not have enough stamps
    }
  };

  return (
    <View>
      {/* ... (UI components) */}
      <Button title="Create Coupon" onPress={createCoupon} />
    </View>
  );
};

export default CreateCouponScreen;
