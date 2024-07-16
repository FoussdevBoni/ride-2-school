import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Rating } from 'react-native-elements';
import FeatherIcon from 'react-native-vector-icons/Feather';

const ReviewForm = ({ onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    const reviewData = {
      rating,
      comment,
    };
    onSubmit(reviewData);
    setRating(0);
    setComment('');
  };

  return (
    <View style={styles.reviewForm}>
      <Text style={styles.label}>Votre évaluation :</Text>
      <Rating
        startingValue={rating}
        onFinishRating={setRating}
        imageSize={24}
        style={{ paddingVertical: 10 }}
      />
      <Text style={styles.label}>Commentaire :</Text>
      <TextInput
        multiline
        numberOfLines={4}
        style={styles.input}
        value={comment}
        onChangeText={setComment}
      />
      <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
        <Text style={styles.submitText}>Envoyer</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  reviewForm: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#90a0ca',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    fontSize: 16,
    minHeight: 100,
  },
  submitButton: {
    backgroundColor: '#266ef1',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  submitText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});

export default ReviewForm;
