import { View, Text } from 'react-native';

type HeaderProps = {
  subtitle?: string;
  title: string;
};

const Header = ({ title, subtitle }: HeaderProps) => (
  <View className="mb-4 flex border-b border-gray-300 pb-4">
    <Text className="text-2xl">{title}</Text>
    {subtitle ? <Text className="text-lg">{subtitle}</Text> : null}
  </View>
);

export default Header;
