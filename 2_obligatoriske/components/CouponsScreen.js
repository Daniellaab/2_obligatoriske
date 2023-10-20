import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database';


const CouponsScreen = ({ route }) => {
  const db = getDatabase();
  const company = route.params;
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    const couponsRef = ref(db, `Companies/${company}/coupons`);

    // Use the 'onValue' function to listen for changes in the 'coupons' node under the specific company
    onValue(couponsRef, (snapshot) => {
      const couponsData = snapshot.val();
      if (couponsData) {
        // If data exists, set it in the 'coupons' state
        setCoupons(Object.values(couponsData));
      } else {
        setCoupons([]);
      }
    });

    // Clean up the listener when the component unmounts
    return () => {
      // Unsubscribe the listener
      off(couponsRef);
    };
  }, [company]);

  return (
    <View>
      {coupons.length === 0 ? (
        <Text>No coupons available</Text>
      ) : (
        <FlatList
          data={coupons}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={{ marginVertical: 10 }}>
              <Text>{item.description}</Text>
              <Text>{item.used ? 'Used' : 'Not Used'}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default CouponsScreen;
