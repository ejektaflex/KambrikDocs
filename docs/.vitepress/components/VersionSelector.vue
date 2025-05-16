<template>
    <div class="version-selector">
        <h2 class="select-label">Version</h2>
        <select id="version-select" v-model="selected" @change="navigate">
            <option v-for="v in versions" :key="v.value" :value="v">
                {{ v.label }}
            </option>
        </select>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vitepress';
import { genSideBar, genVersionPickerItems } from '../versions';

const router = useRouter();
const route = useRoute();

const versions = genVersionPickerItems();

const selected = ref(versions[0]);

function refreshBoxState() {
    const current = versions.find(v => route.path.startsWith('/mods/bountiful/' + v.key));
    if (current) {
        selected.value = current;
    } else {
        selected.value = versions.find(v => v.key == 'latest');
    }
}

// Update selected based on current route
onMounted(() => {
    refreshBoxState()
});

watch(() => route.path, (newPath) => {
  refreshBoxState()
});


function navigate() {
    router.go(selected.value.path);
}
</script>

<style scoped>

.select-label {
    font-family: "Chinese Quotes", "Inter var", Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Helvetica, Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    font-size: 14px;
    line-height: 24px;
    font-weight: 700;
}

select {
      background-color: var(--vp-c-bg);
      color: var(--vp-c-brand-1);
      border: 1px solid var(--vp-button-alt-border);
      border-radius: 8px;
      padding: 10px 14px;
      font-size: 14px;
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      cursor: pointer;

      /* adding margin for consistency */
      margin-top: 10px;
    }

    select:focus {
      outline: none;
      border-color: #666;
    }

    option {
      background-color: var(--vp-c-bg);
      color: var(--vp-c-brand-1);
    }


</style>