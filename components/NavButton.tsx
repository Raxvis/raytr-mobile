import React, { ComponentType } from 'react';
import { View, Pressable, Text } from 'react-native';
import colors from 'tailwindcss/colors';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { SvgProps } from 'react-native-svg';

type NavButtonProps = {
  text?: string;
  isBack?: boolean;
  onPress(): void;
  color: string;
  Icon?: ComponentType<SvgProps & { size: number }>;
};

const NavButton = ({ text, onPress, isBack, Icon, color }: NavButtonProps) => (
  <Pressable onPress={onPress}>
    <View className="flex flex-row items-center">
      {isBack && <ChevronLeftIcon color={color} />}
      {text && (
        <Text className="text-[16px]" style={{ color }}>
          {text}
        </Text>
      )}
      {Icon && <Icon color={color} size={20} />}
    </View>
  </Pressable>
);

export default NavButton;
