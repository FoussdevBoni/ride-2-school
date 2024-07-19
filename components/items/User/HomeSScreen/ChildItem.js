import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Checkbox, Divider, List } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

function ChildItem({ child, onSwitchChange  }) {
    const navigation = useNavigation();
    const schools = useSelector((state) => state.schools.schools);
    const school = schools.find(school => school._id === child?.ecole);
    const [checked, setChecked] = useState(child.isChecked);

    const handleCheckboxChange = () => {
        setChecked(!checked); 
        onSwitchChange(child.id, !checked); 
    };

    return (
        <TouchableOpacity onPress={() => navigation.navigate('child-profile', { child })} style={{ paddingHorizontal: 8 }}>
            <List.Item
                style={{ backgroundColor: 'white', marginVertical: 1 }}
                title={child?.nom}
                left={() => (
                    <View style={styles.profilContainer}>
                        <Image
                            source={{ uri: child.photoo || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIdTCYywEuvhTcpaCBVppRUEWWWqd71grN-Q&s' }}
                            style={styles.driverProfil}
                        />
                    </View>
                )}
                description={school?.nomEcole || ''}
                right={() => (
                    <View style={{width: 20 , height: 20 , backgroundColor: 'green' , borderRadius: 10 , marginTop: 20}}>

                    </View>
                )}
            />
            <Divider />
        </TouchableOpacity>
    );
}

export default ChildItem;

const styles = StyleSheet.create({
    driverProfil: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    profilContainer: {
        padding: 5,
    },
});
