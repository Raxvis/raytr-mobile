import { Link } from 'expo-router';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Category, Item } from '../types';

type ListItemProps = {
  href: string;
  title: string;
  subtitle: string;
  labelText: string;
};

const ListItem = ({ href, title, subtitle, labelText }: ListItemProps) => (
  <Link href={href} asChild>
    <TouchableOpacity>
      <View className="flex items-center justify-between px-4 py-5">
        <View className="flex min-w-0 flex-row gap-x-4 ">
          <View className="min-w-0 flex-auto">
            <Text className="text-xl font-semibold leading-6 text-gray-900">{title}</Text>
            <Text className="mt-1 h-[20px] truncate text-lg leading-5 text-gray-500">{subtitle}</Text>
          </View>
          <View className="items-center justify-center rounded">
            <View className="rounded-full border-2 border-gray-400 px-4 py-1">
              <Text className="text font-bold text-gray-800">{labelText}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  </Link>
);

export default ListItem;
