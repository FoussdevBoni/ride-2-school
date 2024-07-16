import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Rating } from 'react-native-elements';

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.reviewItem}>
      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: review.userAvatar }}
          style={styles.avatar}
        />
      </View>
      <View style={styles.reviewContent}>
        <Text style={styles.userName}>{review.userName}</Text>
        <Rating
          readonly
          startingValue={review.rating}
          imageSize={18}
          style={{ paddingVertical: 6 }}
        />
        <Text style={styles.comment}>{review.comment}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  reviewItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  avatarContainer: {
    marginRight: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  reviewContent: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  comment: {
    fontSize: 14,
    lineHeight: 20,
    color: '#666',
  },
});

export default ReviewItem;
