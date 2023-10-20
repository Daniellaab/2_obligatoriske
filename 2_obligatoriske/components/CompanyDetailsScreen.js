import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { getDatabase, ref, remove } from "firebase/database";

function CompanyDetails({ route, navigation }) {
  const [company, setCompany] = useState(route.params.company[1]);

  const handleEdit = () => {
    const companyData = route.params.company;
    navigation.navigate('AddCompany', { companyData });
  };

  const confirmDelete = () => {
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      Alert.alert('Are you sure?', 'Do you want to delete the company?', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: handleDelete },
      ]);
    }
  };

  const handleDelete = async () => {
    const id = route.params.company[0];
    const db = getDatabase();
    const companyRef = ref(db, `Companies/${id}`);

    try {
      await remove(companyRef);
      navigation.goBack();
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  if (!company) {
    return <Text>No data</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.detailsContainer}>
        {
          Object.entries(company).map((item, index) => {
            return (
              <View style={styles.row} key={index}>
                <Text style={styles.label}>{item[0]}</Text>
                <Text style={styles.value}>{item[1]}</Text>
              </View>
            );
          })
        }
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={handleEdit}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={confirmDelete}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  detailsContainer: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    width: 100,
    fontWeight: 'bold',
  },
  value: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 8,
    width: '48%', // Adjust the width as needed
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CompanyDetails;
