import * as React from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert, ScrollView, SafeAreaView} from 'react-native';
import {useEffect, useState} from "react";
import { getDatabase, ref, push, update  } from "firebase/database";


function Add_edit_Company({navigation,route}){

    const db = getDatabase();

    const initialState = {
        name: '',
        description: '',
        category: ''
    }

    const [newCompany,setNewCompany] = useState(initialState);

    /*Returnere true, hvis vi er på edit company*/
    const isEditCompany = route.name === "Edit Company";

    useEffect(() => {
        if(isEditCompany){
            const company = route.params.company[1];
            setNewCompany(company)
        }
        /*Fjern data, når vi går væk fra screenen*/
        return () => {
            setNewCompany(initialState)
        };
    }, []);

    const changeTextInput = (name,event) => {
        setNewCompany({...newCompany, [name]: event});
    }

    const handleSave = async () => {

        const { name, description, category } = newCompany;

        if(name.length === 0 || description.length === 0 || category.length === 0 ){
            return Alert.alert('Et af felterne er tomme!');
        }

        if(isEditCompany){
            const id = route.params.company[0];
            // Define the path to the specific company node you want to update
            const companyRef = ref(db, `Companies/${id}`);

            // Define the fields you want to update
            const updatedFields = {
                name,
                description,
                category,
            };
            
            // Use the 'update' function to update the specified fields
            await update(companyRef, updatedFields)
                .then(() => {
                Alert.alert("Din info er nu opdateret");
                const company = newCompany
                navigation.navigate("CompanyDetails", { company });
                })
                .catch((error) => {
                console.error(`Error: ${error.message}`);
                });

        }else{
        // Define the path to the "Companies" node where you want to push the new data
        const companiesRef = ref(db, "/Companies/");
        
        // Data to push
        const newCompanyData = {
            name,
            description,
            category,
        };
        
        // Push the new data to the "Companies" node
        await push(companiesRef, newCompanyData)
            .then(() => {
            Alert.alert("Saved");
            setNewCompany(initialState);
            })
            .catch((error) => {
            console.error(`Error: ${error.message}`);
            });
    }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {
                    Object.keys(initialState).map((key,index) =>{
                        return(
                            <View style={styles.row} key={index}>
                                <Text style={styles.label}>{key}</Text>
                                <TextInput
                                    value={newCompany[key]}
                                    onChangeText={(event) => changeTextInput(key,event)}
                                    style={styles.input}
                                />
                            </View>
                        )
                    })
                }
                {/*Hvis vi er inde på edit company, vis save changes i stedet for add company*/}
                <Button title={ isEditCompany ? "Save changes" : "Add company"} onPress={() => handleSave()} />
            </ScrollView>
        </SafeAreaView>
    );
}

export default Add_edit_Company;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    row: {
        flexDirection: 'row',
        height: 30,
        margin: 10,
    },
    label: {
        fontWeight: 'bold',
        width: 100
    },
    input: {
        borderWidth: 1,
        padding:5,
        flex: 1
    },
});