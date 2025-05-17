<template>
    <div ref="root" style="display: none" id="vp-version-hider">
        <!-- Hidden mount point -->
        <div id="vp-version-selector">
            <VersionSelector />
        </div>
    </div>
</template>

<script setup>
/*
We use an injector to move the selector in the DOM after the DOM has been rendered, because
VitePress does not natively allow us to place custom Vue components halfway into the
sidebar stack
*/
import { onMounted, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vitepress';
import VersionSelector from './VersionSelector.vue'

const root = ref(null)

const router = useRouter();
const route = useRoute();

function reinsertSelector() {

    const targetSelector = '#VPSidebarNav' // Sidebar nav container
    const selector = document.getElementById('vp-version-selector')
    const hider = document.getElementById('vp-version-hider')
    const sidebar = document.querySelector(targetSelector)

    if (!route.path.startsWith('/mods/')) {
        selector.hidden = true;
        return
    } else {
        selector.hidden = false;
    }

    if (sidebar && selector) {

        const children = sidebar.children
        const targetIndex = children.length - 1;

        if (sidebar.contains(selector)) {
            const currIndex = [...selector.parentNode.children].indexOf(selector);

            // If selector already in sidebar but in wrong place, move it
            if (currIndex != targetIndex - 1) {
                const insertBefore = children[targetIndex] || null;
                sidebar.insertBefore(selector, insertBefore);
            }

        } else {
            // If not in sidebar, add to sidebar
            const insertBefore = children[targetIndex] || null;
            sidebar.insertBefore(selector, insertBefore);
        }
    }
}

onMounted(() => {

    const observer = new MutationObserver(() => {
        reinsertSelector()
    })

    observer.observe(document.body, {
        childList: true,
        subtree: true,
    })
})

watch(() => route.path, (newPath) => {

    const targetSelector = '#VPSidebarNav' // Sidebar nav container
    const selector = document.getElementById('vp-version-selector')
    const hider = document.getElementById('vp-version-hider')
    const sidebar = document.querySelector(targetSelector)

    //hider.appendChild(selector)

    reinsertSelector()
});
</script>