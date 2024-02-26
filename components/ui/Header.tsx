import { View, Text } from 'react-native';

type HeaderProps = {
  subtitle?: string;
  title: string;
};

const Header = ({ title, subtitle }: HeaderProps) => (
  <View className="mb-4 flex border-b border-gray-300 bg-gray-200 p-4">
    <Text className="text-2xl font-semibold text-gray-900">{title}</Text>
    {subtitle ? <Text className="text-lg text-gray-800">{subtitle}</Text> : null}
  </View>
);

export default Header;
