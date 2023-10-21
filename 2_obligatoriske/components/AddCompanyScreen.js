import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { getDatabase, ref, push } from 'firebase/database';
import globalStyles from '../globalStyles/GlobalStyles';

const AddCompanyScreen = ({ navigation }) => {
  const db = getDatabase();
  const [companyName, setCompanyName] = useState('');
  const [companyDescription, setCompanyDescription] = useState('');
  const [companyCategory, setCompanyCategory] = useState('');

  const addCompany = async () => {
    if (companyName.trim() === '' || companyDescription.trim() === '' || companyCategory.trim() === '') {
      Alert.alert('All fields are required');
      return;
    }

    try {
      const companiesRef = ref(db, 'Companies');
      const newCompanyData = {
        name: companyName,
        description: companyDescription,
        category: companyCategory,
      };

      await push(companiesRef, newCompanyData);

      Alert.alert('Company added successfully');
      setCompanyName('');
      setCompanyDescription('');
      setCompanyCategory('');
    } catch (error) {
      console.error('Error adding company:', error);
      Alert.alert('Failed to add company');
    }
  };

  return (
    <View style={globalStyles.container}>
      <TextInput
        style={globalStyles.input}
        placeholder="Company Name"
        value={companyName}
        onChangeText={(text) => setCompanyName(text)}
      />
      <TextInput
        style={globalStyles.input}
        placeholder="Company Description"
        value={companyDescription}
        onChangeText={(text) => setCompanyDescription(text)}
      />
      <TextInput
        style={globalStyles.input}
        placeholder="Company Category"
        value={companyCategory}
        onChangeText={(text) => setCompanyCategory(text)}
      />
      <Button title="Save Company" onPress={addCompany} />
    </View>
  );
};


export default AddCompanyScreen;
