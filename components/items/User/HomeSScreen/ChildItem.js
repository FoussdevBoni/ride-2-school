import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Checkbox, Divider, List } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { Text } from 'react-native';
import { colors } from '../../../../assets/styles/colors';

function ChildItem({ child, onSwitchChange  }) {
    const navigation = useNavigation();
    const schools = useSelector((state) => state.schools.schools);
    const school = schools.find(school => school._id === child?.ecole);
    const [checked, setChecked] = useState(child.isChecked);

    const handleCheckboxChange = () => {
        setChecked(!checked); 
        onSwitchChange(child.id, !checked); 
    };
const calculateSubscriptionLevel = () => {
    const startDate = new Date(child?.dateAbonnement);
    const endDate = new Date(child?.dateFinAbonnement);
    const today = new Date();

    const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    const daysPassed = Math.ceil((today - startDate) / (1000 * 60 * 60 * 24));
    const remainingDays = totalDays - daysPassed;

    return Math.max(0, remainingDays / totalDays); // Ensure the level is between 0 and 1
  };

  const subscriptionLevel = calculateSubscriptionLevel();
  console.log(subscriptionLevel)
 const getStatusColor = (status) => {
    if (status <= 0.3) {
      return 'red';
    } else if (status > 0.3 && status <= 0.5) {
      return 'orange';
    } else if (status>0.5 && status<=1) {
         
      return 'green';
    
    }else{
        return 'red'
    }
  };
  
    return (
        <TouchableOpacity onPress={() => navigation.navigate('child-profile', { child })} style={{ paddingHorizontal: 8 }}>
            <List.Item
                style={{ backgroundColor: 'white', marginVertical: 1 }}
                title={child?.nom}
                left={() => (
                    <View style={styles.profilContainer}>
                        <Image
                            source={{ uri: child.photo || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIdTCYywEuvhTcpaCBVppRUEWWWqd71grN-Q&s' }}
                            style={styles.driverProfil}
                        />
                    </View>
                )}
                description={
                    () => (
                    <TouchableOpacity style={[styles.followButton , {opacity: subscriptionLevel>=0 ? 1 : 0.4}]} onPress={() => {
                        if (subscriptionLevel>=0) {
                    
                           navigation.navigate('Suivre mes Enfants' , {selectedEnfants: [child]})
                        }else{

                        }
                    }}>
                        <Text style={styles.followButtonText}>
                            Suivre
                        </Text>
                    </TouchableOpacity>
                )
                }
                right={() => (
                    <View style={{width: 20 , height: 20 , backgroundColor: getStatusColor(subscriptionLevel) , borderRadius: 20 , marginTop: 20}}>

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
    
    followButton: {
        width: 80,
        height: 30,
        backgroundColor: colors.primary,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginRight: 10,
    },
    followButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
