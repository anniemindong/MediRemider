import React from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";
import { Avatar } from "../avatar";
import { Theme } from "../../theme";

type TProps = {
  item: any;
  style?: ViewStyle;
};

export const DoctorReviewItemRow: React.FC<TProps> = props => {
  return (
    <View style={[props.style]}>
      <View style={{ flexDirection: "row" }}>
        <Avatar
          source={{
            uri: props.item.user.imageUrl
          }}
          imageStyle={styles.imageStyle}
        />
        <View style={styles.ratingContent}>
          <Text style={styles.fullNameText}>{props.item.user.fullName}</Text>
          <Text style={styles.commentText}>{props.item.user.about}</Text>
        </View>
      </View>
      <Text style={styles.commentText}>{props.item.comment}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    width: 40,
    height: 40,
    borderRadius: 12
  },
  fullNameText: { fontSize: 12, fontWeight: "600", marginStart: 2 },
  ratingContent: {
    paddingHorizontal: 12,
    justifyContent: "space-around",
    alignItems: "flex-start"
  },
  commentText: {
    fontSize: 13,
    color: Theme.colors.gray,
    marginTop: 8
  }
});
