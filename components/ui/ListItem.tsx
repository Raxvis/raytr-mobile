import { Link } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

type ListItemProps = {
  href: string;
  title: string;
  subtitle: string;
  labelText?: string;
  labels?: string[];
};

const ListItem = ({ href, title, subtitle, labelText, labels }: ListItemProps) => (
  <Link href={href} asChild>
    <TouchableOpacity>
      <View className="flex items-center justify-between px-4 py-5">
        <View className="flex min-w-0 flex-row gap-x-4 ">
          <View className="min-w-0 flex-auto">
            <Text className="text-xl font-semibold leading-6 text-gray-900">{title}</Text>
            <Text className="mt-1 h-[20px] truncate text-lg leading-5 text-gray-500">{subtitle}</Text>
          </View>
          {labelText && (
            <View className="items-center justify-center rounded">
              <View className="rounded-full border-2 border-gray-400 px-4 py-1">
                <Text className="text font-bold text-gray-800">{labelText}</Text>
              </View>
            </View>
          )}
          {labels &&
            labels.length > 0 &&
            labels.map((label) => (
              <View className="items-center justify-center rounded" key={label}>
                <View className="rounded-full border-2 border-gray-400 px-4 py-1">
                  <Text className="text font-bold text-gray-800">{label}</Text>
                </View>
              </View>
            ))}
        </View>
      </View>
    </TouchableOpacity>
  </Link>
);

export default ListItem;
