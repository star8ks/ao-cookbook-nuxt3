<script setup lang="ts">
import type { NavItem } from '@nuxt/content/dist/runtime/types'

const nav = inject<Ref<NavItem[]>>('navigation')

const route = useRoute()
const currentRootFolder = computed(() => `/${route.path.split('/')[1]}`)
const currentLevel1Folder = computed(() => `/${route.path.split('/')[2]}`)

const navigation = computed(() => {
  const navItem = nav.value.filter(item => {
    return item._path.startsWith(currentRootFolder.value)
  })[0]

  if (currentRootFolder.value === '/guides') {
    if (currentLevel1Folder.value === '/undefined') {
      return {
        title: navItem.title,
        _path: navItem._path,
        children: navItem.children.map(({ title, _path }) => {
          return {
            title,
            _path
          }
        })
      }
    } else {
      console.log(`====> navItem :`, navItem)
      return navItem.children.find(({ _path }) => _path === `${currentRootFolder.value}${currentLevel1Folder.value}`)
    }
  }

  return navItem
})

</script>

<template>
  <UContainer>
    <UPage>
      <template #left>
        <UAside>
          <UNavigationTree :links="mapContentNavigation(navigation.children, navigation)" :multiple="false" />
        </UAside>
      </template>

      <slot />
    </UPage>
  </UContainer>
</template>
