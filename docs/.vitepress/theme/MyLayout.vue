<script setup>
import VersionInjector from '../components/VersionInjector.vue'
import VersionSelector from '../components/VersionSelector.vue'
import DefaultTheme from 'vitepress/theme'

const { Layout } = DefaultTheme
</script>

<template>
    <Layout>
        <template #doc-before>
            <VersionInjector />
        </template>
    </Layout>
</template>