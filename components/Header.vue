<script setup lang="ts">
import type { NavItem } from '@nuxt/content/dist/runtime/types'
const { t } = $(useI18n())
const localePath = useLocalePath()

const navigation = inject<NavItem[]>('navigation', [])
const { header } = useAppConfig()

const route = useRoute()

const links = computed(() => {
  return [{
    label: t('Welcome'),
    to: localePath('/docs/welcome'),
    active: route.path.includes(localePath('/docs/welcome'))
  }, {
    label: t('Tutorials'),
    to: localePath('/docs/tutorials'),
    active: route.path.includes(localePath('/docs/tutorials'))
  }, {
    label: t('Guides'),
    to: localePath('/docs/guides'),
    children: [
      { label: t('aos'), to: localePath('/docs/guides/aos') },
      { label: t('aoconnect'), to: localePath('/docs/guides/aoconnect') },
    ],
    active: route.path.includes(localePath('/docs/guides'))
  }, {
    label: t('Concepts'),
    to: localePath('/docs/concepts'),
    active: route.path.includes(localePath('/docs/concepts'))
  }, {
    label: t('References'),
    to: localePath('/docs/references'),
    active: route.path.includes(localePath('/docs/references'))
  }]
})

</script>

<template>
  <UHeader :to="localePath('/')" :links="links">
    <template #logo>
      <UColorModeImage v-bind="{ class: 'h-6 w-auto', ...header?.logo }" />
      <UBadge :label="$t('Cookbook')" variant="subtle" class="mb-0.5" />
    </template>

    <template #right>
      <UContentSearchButton v-if="header?.search" class="max-w-40 hidden lg:flex" :label="$t('Search...')" />
      <UContentSearchButton v-if="header?.search" class="lg:hidden" :label="$t('Search...')" />

      <LanguageSwitcher class="ml-2" />
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
