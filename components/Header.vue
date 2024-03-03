<script setup lang="ts">
import type { NavItem } from '@nuxt/content/dist/runtime/types'
const { t, locale } = $(useI18n())
const localePath = useLocalePath()

const navigation = inject<NavItem[]>('navigation', [])

const { header } = useAppConfig()

const route = useRoute()

const currentFolder = $computed(() => {
  const routePathArr = route.path.split('/')
  if (locale !== 'en') {
    return `/${locale}/${routePathArr[2]}`
  }
  return `/${routePathArr[1]}`
})

const links = computed(() => {
  return [{
    label: t('Welcome'),
    to: localePath('/welcome'),
    active: currentFolder === localePath('/welcome')
  }, {
    label: t('Tutorials'),
    to: localePath('/tutorials'),
    active: currentFolder === localePath('/tutorials')
  }, {
    label: t('Guides'),
    to: localePath('/guides'),
    active: currentFolder === localePath('/guides'),
    children: [
      { label: t('aos'), to: localePath('/guides/aos') },
      { label: t('aoconnect'), to: localePath('/guides/aoconnect') },
    ]
  }, {
    label: t('Concepts'),
    to: localePath('/concepts'),
    active: currentFolder === localePath('/concepts')
  }, {
    label: t('References'),
    to: localePath('/references'),
    active: currentFolder === localePath('/references'),
  }]
})

</script>

<template>
  <UHeader :to="localePath('/')">
    <template #logo>
      <UColorModeImage v-bind="{ class: 'h-6 w-auto', ...header?.logo }" />
      <UBadge :label="$t('Cookbook')" variant="subtle" class="mb-0.5" />
    </template>

    <template #center>
      <UHeaderLinks :links="links" />
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
