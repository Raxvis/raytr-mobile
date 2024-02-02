import { View, Text } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';

export default function Item() {
  const { categoryId, itemId } = useLocalSearchParams();

  console.log({ categoryId, itemId });
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>View Item + Ratings</Text>
    </View>
  );
}
