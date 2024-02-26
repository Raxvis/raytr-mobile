import classnames from 'classnames';
import React, { ComponentType } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { SvgProps } from 'react-native-svg';

type IconButtonProps = {
  classNames?: string;
  onPress(): void;
  color?: string;
  Icon?: ComponentType<SvgProps & { size: number }>;
};

const getColor = (color) => {
  switch (color) {
    case 'red':
      return 'bg-red-900';
    default:
      return 'bg-gray-900';
  }
};

const IconButton = ({ classNames, onPress, Icon, color }: IconButtonProps) => (
  <TouchableOpacity
    className={classnames('flex items-center justify-center rounded p-2', getColor(color), classNames)}
    onPress={onPress}
  >
    <Icon color="white" size={30} />
  </TouchableOpacity>
);

export default IconButton;
