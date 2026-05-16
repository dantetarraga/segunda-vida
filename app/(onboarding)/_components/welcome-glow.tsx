import { View } from 'react-native'

import { Colors } from '@/constants/theme'

const WelcomeGlow = () => (
  <View
    pointerEvents="none"
    style={{
      position: 'absolute',
      top: -150,
      alignSelf: 'center',
      width: 320,
      height: 320,
      borderRadius: 160,
      backgroundColor: Colors.primary,
      opacity: 0.18,
      shadowColor: Colors.primary,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.8,
      shadowRadius: 80,
    }}
  />
)

export default WelcomeGlow
