<script setup lang="ts">
import type { NavItem } from '@nuxt/content/dist/runtime/types'

const nav = inject<Ref<NavItem[]>>('navigation')
const { locale } = $(useI18n())

const route = useRoute()

// const navigation = computed(() => nav.value.filter(item => !item._path.startsWith('/pro')))

const navigation = computed(() => {
  const routePathArr = route.path.split('/')
  let currentRootFolder = `/${routePathArr[1]}`
  let currentLevel1Folder = `/${routePathArr[2]}`
  let navAll = nav.value
  let localePrefix = ''
  if (locale !== 'en') {
    localePrefix = `/${locale}`
    navAll = navAll.find(item => item._path === `/${locale}`).children
    currentRootFolder = `/${routePathArr[2]}`
    currentLevel1Folder = `/${routePathArr[3]}`
  }

  let navItem = navAll.find(item => {
    return item._path.startsWith(`${localePrefix}${currentRootFolder}`)
  })

  if (currentRootFolder === '/guides') {
    if (currentLevel1Folder === '/undefined') {
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
      return navItem.children.find(({ _path }) => _path === `${localePrefix}${currentRootFolder}${currentLevel1Folder}`)
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
          <UNavigationTree v-if="navigation" :links="mapContentNavigation(navigation.children, navigation)" :multiple="false" />
        </UAside>
      </template>

      <slot />
    </UPage>
  </UContainer>
</template>
