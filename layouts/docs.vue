<script setup lang="ts">
import type { NavItem } from '@nuxt/content/dist/runtime/types'
import { get } from 'lodash'

const navAll = inject<Ref<NavItem[]>>('navigation')
const { locale } = $(useI18n())
const route = useRoute()

const nav = $computed(() => {
  let items = navAll.value.find(item => item._path === `/${locale}`).children
  // /docs
  items = items.find(item => route.path.startsWith(item._path))?.children || []
  // /docs/xxx
  const level1Nav = items.find(item => route.path.startsWith(item._path))
  return level1Nav
})

</script>

<template>
  <UContainer>
    <UPage>
      <template #left>
        <UAside>
          <UNavigationTree v-if="nav && nav.children" :links="mapContentNavigation(nav.children, nav)" :multiple="false" />
        </UAside>
      </template>

      <slot />
    </UPage>
  </UContainer>
</template>
