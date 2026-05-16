import { View } from 'react-native'
import Svg, { Circle, Defs, RadialGradient, Stop } from 'react-native-svg'

import { Colors } from '@/constants/theme'

const RADIUS = 300

const RadialGlow = () => (
  <View pointerEvents="none" style={{ position: 'absolute', top: -RADIUS, alignSelf: 'center' }}>
    <Svg width={RADIUS * 2} height={RADIUS * 2}>
      <Defs>
        <RadialGradient id="glow" cx="50%" cy="50%" r="50%">
          <Stop offset="0%" stopColor={Colors.primary} stopOpacity="0.55" />
          <Stop offset="35%" stopColor={Colors.primary} stopOpacity="0.35" />
          <Stop offset="65%" stopColor={Colors.primary} stopOpacity="0.13" />
          <Stop offset="85%" stopColor={Colors.primary} stopOpacity="0.04" />
          <Stop offset="100%" stopColor={Colors.primary} stopOpacity="0" />
        </RadialGradient>
      </Defs>
      <Circle cx={RADIUS} cy={RADIUS} r={RADIUS} fill="url(#glow)" />
    </Svg>
  </View>
)

export default RadialGlow
