<script setup lang="ts">
import type { NavItem } from '@nuxt/content/dist/runtime/types'
const { t } = useI18n()

const navigation = inject<NavItem[]>('navigation', [])

const { header } = useAppConfig()

const route = useRoute()
const currentFolder = computed(() => `/${route.path.split('/')[1]}`)

const links = computed(() => {
  return [{
    label: t('Welcome'),
    to: '/welcome',
    active: currentFolder.value === '/welcome',
  }, {
    label: t('Tutorials'),
    to: '/tutorials',
    active: currentFolder.value === '/tutorials',
  }, {
    label: t('Guides'),
    to: '/guides',
    active: currentFolder.value === '/guides',
    children: [
      { label: t('aos'), to: '/guides/aos' },
      { label: t('aoconnect'), to: '/guides/aoconnect' },
    ]
  }, {
    label: t('Concepts'),
    to: '/concepts',
    active: currentFolder.value === '/concepts',
  }, {
    label: t('References'),
    to: '/references',
    active: currentFolder.value === '/references',
  }]
})

</script>

<template>
  <UHeader>
    <template #logo>
      <UColorModeImage v-bind="{ class: 'h-6 w-auto', ...header?.logo }" />
      <UBadge :label="$t('Cookbook')" variant="subtle" class="mb-0.5" />
    </template>

    <template #center>
      <UHeaderLinks :links="links" />
    </template>

    <template #right>
      <UContentSearchButton v-if="header?.search" class="max-w-60 hidden lg:flex" />
      <UContentSearchButton v-if="header?.search" :label="null" class="lg:hidden" />

      <UColorModeButton v-if="header?.colorMode" />

      <template v-if="header?.links">
        <UButton v-for="(link, index) of header.links" :key="index" v-bind="{ color: 'gray', variant: 'ghost', ...link }" />
      </template>
    </template>

    <template #panel>
      <UNavigationTree :links="mapContentNavigation(navigation)" />
    </template>
  </UHeader>
</template>
