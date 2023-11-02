import { colors } from '@/modules/shared/theme'
import { MaterialIcons } from '@expo/vector-icons'
import { Pressable } from '@gluestack-ui/themed'
import { useActiveProduct } from '../store/active-product'

export default function ShareProduct() {
  const productState = useActiveProduct((state) => state)

  return (
    <Pressable
      onPress={() => {
        console.log(productState.product)
      }}
    >
      <MaterialIcons
        name='share'
        size={24}
        color={colors.white}
        style={{ marginRight: 20 }}
      />
    </Pressable>
  )
}
