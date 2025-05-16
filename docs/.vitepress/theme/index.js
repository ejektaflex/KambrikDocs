import DefaultTheme from 'vitepress/theme'
import './custom.scss'
import VersionSelector from '../components/VersionSelector.vue'
import { h } from 'vue'
import MyLayout from './MyLayout.vue'

export default {
    extends: DefaultTheme,
    // override the Layout with a wrapper component that
    // injects the slots
    Layout: MyLayout
  }

