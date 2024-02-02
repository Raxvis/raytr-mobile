import { Link } from 'expo-router';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Category } from '../types';

export default function CategoryListItem({ category }: { category: Category }) {
  return (
    <Link href={`/category/${category.categoryId}`} asChild>
      <TouchableOpacity>
        <View className="flex flex-grow flex-row justify-between border-b border-gray-400 py-2">
          <Text className="text-lg ">{category.categoryName}</Text>
          <View className="items-center justify-center rounded bg-gray-800 px-4">
            <Text className="text text-white">{category.items.length}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
}
