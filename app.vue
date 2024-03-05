<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content/dist/runtime/types'

const { seo } = useAppConfig()
const { locale } = $(useI18n())
const navigation = ref([])
watchEffect(async () => {
  const { data } = await useAsyncData(`navigation-${locale}`, () => fetchContentNavigation(`/${locale}`))
  navigation.value = data.value
})

const searchFileList = $computed(() => {
  return navigation.value[0].children
})

const { data: files } = useLazyFetch<ParsedContent[]>('/api/search.json', {
  default: () => [],
  server: false
})

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

useSeoMeta({
  titleTemplate: `%s - ${seo?.siteName}`,
  ogSiteName: seo?.siteName,
  ogImage: 'https://ao.arweave.dev/images/ao_meta.png',
  twitterImage: '/ao-cookbook.png',
  twitterCard: 'summary_large_image'
})

provide('navigation', navigation)
</script>

<template>
  <div>
    <Header />

    <UMain>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UMain>

    <Footer />

    <ClientOnly>
      <LazyUContentSearch :files="files" :navigation="searchFileList" />
    </ClientOnly>

    <UNotifications />
  </div>
</template>
