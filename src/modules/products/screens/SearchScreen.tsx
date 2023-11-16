import { MaterialIcons } from '@expo/vector-icons'
import { Input, InputField, InputIcon, InputSlot } from '@gluestack-ui/themed'
import { useEffect, useState } from 'react'

import { AppContainer } from '@/modules/shared/components'
import { useDebounce } from '@/modules/shared/hooks'
import { useTheme } from '@/modules/shared/store'
import { colors } from '@/modules/shared/theme'
import { Products } from '../components'
import { useProducts } from '../hooks'

export default function SearchScreen() {
  const theme = useTheme((state) => state)
  const { searchedProducts, searchProducts } = useProducts()
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 400)

  useEffect(() => {
    theme.changeMainColor()
  }, [])

  useEffect(() => {
    searchProducts(debouncedSearch)
  }, [debouncedSearch])

  return (
    <AppContainer>
      <Input py='$2' px='$4' mb='$4'>
        <InputSlot>
          <InputIcon>
            <MaterialIcons
              name='search'
              size={18}
              color={colors.gray}
            />
          </InputIcon>
        </InputSlot>

        <InputField
          type='text'
          placeholder='Buscar...'
          size='lg'
          color={colors.gray}
          borderColor={colors.lightGray}
          onChangeText={(text) => {
            setSearch(text)
          }}
        />
      </Input>

      <Products products={searchedProducts} />
    </AppContainer>
  )
}
