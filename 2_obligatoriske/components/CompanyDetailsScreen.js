import * as React from 'react';
import { View, Text, Platform, StyleSheet, Button, Alert } from 'react-native';
import {useEffect, useState} from "react";
import { getDatabase, ref, remove, onValue } from "firebase/database";

function CompanyDetails ({route,navigation}){
    const [company,setCompanies] = useState({})
    useEffect(() => {
        setCompanies(route.params.company[1]);
        return () => {
            setCompanies({})
        }
    });

    const handleEdit = () => {
        // Vi navigerer videre til EditCar skærmen og sender bilen videre med
        const company = route.params.company
        navigation.navigate('AddCompany', { company });
    };

    // Vi spørger brugeren om han er sikker
    const confirmDelete = () => {
        /*Er det mobile?*/
        if(Platform.OS ==='ios' || Platform.OS ==='android'){
            Alert.alert('Are you sure?', 'Do you want to delete the company?', [
                { text: 'Cancel', style: 'cancel' },
                // Vi bruger this.handleDelete som eventHandler til onPress
                { text: 'Delete', style: 'destructive', onPress: () => handleDelete() },
            ]);
        }
    };

    const handleDelete = async () => {
        const id = route.params.company[0];
        const db = getDatabase();
        // Define the path to the specific company node you want to remove
        const companyRef = ref(db, `Companies/${id}`);
        
        // Use the 'remove' function to delete the company node
       await remove(companyRef)
            .then(() => {
                navigation.goBack();
            })
            .catch((error) => {
                Alert.alert(error.message);
            });
    };

    if (!company) {
        return <Text>No data</Text>;
    }

    //all content
    return (
        <View style={styles.container}>
            <Button title="Edit" onPress={ () => handleEdit()} />
            <Button title="Delete" onPress={() => confirmDelete()} />
            {
                Object.entries(company).map((item,index)=>{
                    return(
                        <View style={styles.row} key={index}>
                            {/*Vores company keys navn*/}
                            <Text style={styles.label}>{item[0]} </Text>
                            {/*Vores company values navne */}
                            <Text style={styles.value}>{item[1]}</Text>
                        </View>
                    )
                })
            }
        </View>
    );
}

export default CompanyDetails;

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'flex-start' },
    row: {
        margin: 5,
        padding: 5,
        flexDirection: 'row',
    },
    label: { width: 100, fontWeight: 'bold' },
    value: { flex: 1 },
});