<script setup lang="ts">
const { locale, locales } = $(useI18n())
const switchLocalePath = useSwitchLocalePath()

const availableLocales = $computed(() => {
  return [locales.filter(i => i.code !== locale).map(item => {
    return {
      label: item.name,
      click: () => {
        navigateTo(switchLocalePath(item.code))
      }
    }
  })]
})

</script>

<template>
  <UDropdown :items="availableLocales" mode="hover" :popper="{ placement: 'bottom-start' }">
    <UIcon name="i-heroicons-language-16-solid" class="group-hover:text-gray-800" />
    <UIcon name="i-heroicons-chevron-down" />
  </UDropdown>
</template>
