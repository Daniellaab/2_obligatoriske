import * as React from 'react';
import { Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {useEffect, useState} from "react";
import { getDatabase, ref, onValue } from "firebase/database";

function CompanyList({navigation}){

    const [company,setCompanies] = useState()
    useEffect(() => {
        const db = getDatabase();
        const companiesRef = ref(db, "Company");
    
        // Use the 'onValue' function to listen for changes in the 'Companies' node
        onValue(companiesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                // If data exists, set it in the 'companies' state
                setCompanies(data);
            }
        });
    
        // Clean up the listener when the component unmounts
        return () => {
            // Unsubscribe the listener
            off(companiesRef);
        };
    }, []); // The empty dependency array means this effect runs only once

    // Vi viser ingenting hvis der ikke er data
    if (!company) {
        return <Text>Loading...</Text>;
    }

    const handleSelectCompany = id => {
        /*Her søger vi direkte i vores array af biler og finder bil objektet som matcher idet vi har tilsendt*/
        const company = Object.entries(company).find( company => company[0] === id /*id*/)
        navigation.navigate('Company Details', { company });
    };
    
    // Flatlist forventer et array. Derfor tager vi alle values fra vores companies objekt, og bruger som array til listen
    const companyArray = Object.values(company);
    const companyKeys = Object.keys(company);

    return (
        <FlatList
            data={companyArray}
            // Vi bruger companyKeys til at finde ID på den aktuelle bil og returnerer dette som key, og giver det med som ID til CompanyListItem
            keyExtractor={(item, index) => companyKeys[index]}
            renderItem={({ item, index }) => {
                return(
                    <TouchableOpacity style={styles.container} onPress={() => handleSelectCompany(companyKeys[index])}>
                        <Text>
                            {item.name} {item.description}
                        </Text>
                    </TouchableOpacity>
                )
            }}
        />
    );
}

export default CompanyList;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 1,
        borderRadius:10,
        margin: 5,
        padding: 5,
        height: 50,
        justifyContent:'center'
    },
    label: { fontWeight: 'bold' },
});