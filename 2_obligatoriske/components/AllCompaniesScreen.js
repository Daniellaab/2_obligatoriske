import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { getDatabase, ref, onValue } from "firebase/database";

const AllCompaniesScreen = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    // Fetch companies from Firebase when the component mounts
    const unsubscribe = getDatabase.collection('companies').onSnapshot(snapshot => {
      const companiesData = [];
      snapshot.forEach(doc => {
        companiesData.push({ id: doc.id, ...doc.data() });
      });
      setCompanies(companiesData);
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <View>
      {companies.map(company => (
        <View key={company.id}>
          <Text>{company.name}</Text>
        </View>
      ))}
    </View>
  );
};

export default AllCompaniesScreen;
