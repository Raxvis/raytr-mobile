import { Link } from 'expo-router';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Category, Item } from '../types';

const CategoryItem = ({ category, item }: { category: Category; item: Item }) => {
  return (
    <Link href={`/category/${category.categoryId}/item/${item.itemId}`} asChild>
      <TouchableOpacity>
        <View className="flex flex-grow flex-row justify-between border-b border-gray-400 py-2">
          <Text className="text-lg ">{item.itemName}</Text>
          <View className="items-center justify-center rounded bg-gray-800 px-4">
            <Text className="text text-white">{item.ratings.length}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default CategoryItem;
