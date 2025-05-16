<script setup>
import VersionSelector from '../components/VersionSelector.vue'
import DefaultTheme from 'vitepress/theme'

const { Layout } = DefaultTheme
</script>

<template>
    <Layout>
        <template #sidebar-nav-after>
            <VersionSelector />
        </template>
    </Layout>
</template>