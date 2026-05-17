import AntDesign from '@expo/vector-icons/AntDesign'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import type { ComponentProps } from 'react'

export type MaterialIconName = ComponentProps<typeof MaterialIcons>['name']
export type AntDesignIconName = ComponentProps<typeof AntDesign>['name']

type IconProps =
  | { library?: 'material'; name: MaterialIconName; size?: number; color?: string }
  | { library: 'antdesign'; name: AntDesignIconName; size?: number; color?: string }

export const Icon = ({ library = 'material', name, size = 22, color }: IconProps) => {
  if (library === 'antdesign') {
    return <AntDesign name={name as AntDesignIconName} size={size} color={color} />
  }
  return <MaterialIcons name={name as MaterialIconName} size={size} color={color} />
}
