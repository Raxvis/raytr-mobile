import classnames from 'classnames';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

type ButtonProps = {
  classNames?: string;
  onPress: () => void;
  text: string;
  color?: string;
};

const getColor = (color) => {
  switch (color) {
    case 'red':
      return 'bg-red-900';
    default:
      return 'bg-gray-900';
  }
};

const Button = ({ classNames, color, onPress, text }: ButtonProps) => {
  return (
    <TouchableOpacity
      className={classnames('mt-4 flex flex-row items-center justify-center rounded p-2', getColor(color), classNames)}
      onPress={onPress}
    >
      <Text className="text-white">{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;
