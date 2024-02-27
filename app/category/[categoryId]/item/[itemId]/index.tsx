import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const Item = () => {
  const { categoryId, itemId } = useLocalSearchParams();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>categoryId: {categoryId}</Text>
      <Text>itemId: {itemId}</Text>
    </View>
  );
};

export default Item;
