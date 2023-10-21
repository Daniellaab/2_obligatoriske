import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getDatabase, ref, onValue, off } from 'firebase/database';
import globalStyles from '../globalStyles/GlobalStyles';

const CouponsScreen = ({ route }) => {
  const db = getDatabase();
  const company = route.params;
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    const couponsRef = ref(db, `Coupons/${company}`);

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
    <View style={styles.container}>
      {coupons.length === 0 ? (
        <Text style={styles.emptyText}>No coupons available</Text>
      ) : (
        <FlatList
          style={styles.flatList}
          data={coupons}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.couponContainer}>
              <Text style={styles.couponDescription}>{item.description}</Text>
              <Text style={item.used ? styles.usedText : styles.notUsedText}>
                {item.used ? 'Used' : 'Not Used'}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  emptyText: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    marginTop: 20,
  },
  flatList: {
    marginTop: 20,
  },
  couponContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  couponDescription: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  usedText: {
    color: '#f00',
    fontSize: 14,
  },
  notUsedText: {
    color: '#4caf50',
    fontSize: 14,
  },
});

export default CouponsScreen;
