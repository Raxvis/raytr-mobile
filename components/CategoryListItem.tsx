import { Link } from 'expo-router';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Category } from '../types';

const CategoryListItem = ({ category }: { category: Category }) => {
  return (
    <Link href={`/category/${category.categoryId}`} asChild>
      <TouchableOpacity>
        <View className="flex items-center justify-between px-4 py-5">
          <View className="flex min-w-0 flex-row gap-x-4 ">
            <View className="min-w-0 flex-auto">
              <Text className="text-xl font-semibold leading-6 text-gray-900">{category.categoryName}</Text>
              <Text className="mt-1 h-[20px] truncate text-lg leading-5 text-gray-500">
                {category.categoryDescription}
              </Text>
            </View>
            <View className="items-center justify-center rounded">
              <View className="rounded-full border-2 border-gray-400 px-4 py-1">
                <Text className="text font-bold text-gray-800">View</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default CategoryListItem;
