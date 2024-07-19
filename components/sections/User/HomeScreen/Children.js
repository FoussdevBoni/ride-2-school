import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { ActivityIndicator, List } from 'react-native-paper';
import ChildItem from '../../../items/User/HomeSScreen/ChildItem';
import axios from 'axios';
import { getChildren } from '../../../../utils/api';
import { colors } from '../../../../assets/styles/colors';
import { useNavigation } from '@react-navigation/native';

function Children({ user }) {
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    async function fetchChildren() {
      const userId = user?.id || user?._id;
      try {
        const response = await axios.get(`${getChildren}/${userId}`);
        setChildren(response.data);
      } catch (error) {
        setError('Aucun enfant trouvé');
      } finally {
        setLoading(false);
      }
    }
    fetchChildren();
  }, [user]);

  const handleSwitchChange = (id, newValue) => {
    setChildren((prevChildren) =>
      prevChildren.map((child) =>
        child.id === id ? { ...child, isChecked: newValue } : child
      )
    );
  };
  
  const [selectedChildren , setSelectedChildren] = useState([])
  useEffect(()=>{
     const selected = user ? children.filter((child) => child.isChecked) : [];
      setSelectedChildren(selected)
      console.log(selected)
  } , [children])
  console.log('selectedChildren' , selectedChildren)

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <List.Subheader>Enfants ajoutés</List.Subheader>
      <List.Section>
        {children.map((child, index) => (
          <ChildItem key={index} child={child} onSwitchChange={handleSwitchChange} />
        ))}
      </List.Section>
      {children.length > 0 && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Suivre mes Enfants', { selectedEnfants: children })}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Suivre mes enfants</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

export default Children;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 42,
  },
  errorText: {
    fontSize: 16,
    opacity: 0.5,
  },
  buttonContainer: {
    padding: 12,
  },
  button: {
    backgroundColor: colors.primary,
    height: 40,
    justifyContent: 'center',
    borderRadius: 20,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});
