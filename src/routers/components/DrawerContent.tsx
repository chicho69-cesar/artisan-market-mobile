import { DrawerContentScrollView, DrawerItemList, DrawerItem, type DrawerContentComponentProps } from '@react-navigation/drawer'

export default function DrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView {...props}>
      {/* <DrawerItemList {...props} /> */}

      <DrawerItem
        label='Hello'
        onPress={() => {}}
      />
    </DrawerContentScrollView>
  )
}
