import classnames from 'classnames';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

type ButtonProps = {
  classNames?: string;
  disabled?: boolean;
  onPress: () => void;
  text: string;
  color?: string;
};

const getColor = (color, disabled) => {
  if (disabled) {
    switch (color) {
      case 'red':
        return 'bg-red-400';
      default:
        return 'bg-gray-400';
    }
  }
  switch (color) {
    case 'red':
      return 'bg-red-900';
    default:
      return 'bg-gray-900';
  }
};

const Button = ({ classNames, color, disabled, onPress, text }: ButtonProps) => {
  return (
    <TouchableOpacity
      className={classnames(
        'mt-4 flex flex-row items-center justify-center rounded p-2',
        getColor(color, disabled),
        classNames,
      )}
      onPress={disabled ? () => {} : onPress}
    >
      <Text className="text-lg text-white">{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;
