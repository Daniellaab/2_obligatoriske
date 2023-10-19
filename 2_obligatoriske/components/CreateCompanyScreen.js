import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
//import { getDatabase, ref, onValue } from "firebase/database";
import { db } from '../App';

const CreateCompanyScreen = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const addCompany = () => {
    // Add a new company to Firebase
    db.collection('companies').add({
      name,
      description,
    });
    // Reset input fields after creating the company
    setName('');
    setDescription('');
  };

  return (
    <View>
      <TextInput placeholder="Company Name" value={name} onChangeText={setName} />
      <TextInput placeholder="Description" value={description} onChangeText={setDescription} />
      <Button title="Create Company" onPress={addCompany} />
    </View>
  );
};

export default CreateCompanyScreen;
