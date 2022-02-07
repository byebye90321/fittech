<template>
  <li :class="dropdownClasses">
    <a class="c-header-nav-dropdown-toggle" @click="handleClick">
      <!-- <CIcon v-if="icon" v-bind="computedIcon"/>
      <i v-if="fontIcon" :class="['c-sidebar-nav-icon', fontIcon]"></i> -->
      <!-- <i :class="['c-sidebar-nav-icon', icon]"></i> -->
      {{name}}
    </a>
    <ul class="c-header-nav-dropdown-items" @click="itemClicked">
      <slot>
        <template v-for="(item, key) in items">
          <CHeaderNavItem :name="item.name" :icon="item.icon" :key="key" :to="item.url"/>
        </template>
      </slot>
    </ul>
  </li>
</template>

<script>
import CIcon from '@coreui/icons-vue/src/CIconRaw.vue'
import CHeaderNavItem from './CHeaderNavItem'

export default {
  name:'CHeaderNavDropdown',
  components: {
    CIcon,
    CHeaderNavItem
  },
  props: {
    name: String,
    route: {
      type: String,
      validator: val => val.length > 0
    },
    icon: [String, Object],
    fontIcon: String,
    show: Boolean,
    items: Array
  },

  data () {
    return {
      open: this.show
    }
  },
  inject: {
    dropdownMode: {
      default: 'openActive'
    }
  },
  watch: {
    show (val) {
      this.open = val
    },
    $route: {
      immediate: true,
      handler (route) {
        const mode = this.dropdownMode
        if (mode === 'close') {
          this.open = false
        } else if (mode === 'closeInactive' && this.route) {
          this.open = route.fullPath.includes(this.route)
        }  else if (mode === 'openActive' && !this.open && this.route) {
          this.open = route.fullPath.includes(this.route)
        }
        // else if (mode === 'noAction') {
        //   return
        // }
      }
    }
  },
  computed: {
    dropdownClasses () {
      return [
        'c-header-nav-dropdown',
        { 'c-show': this.open }
      ]
    },
    computedIcon () {
      if (typeof this.icon === 'object') {
        const key = this.icon.size ? 'class' : 'customClasses'
        return {
          ...this.icon,
          [`${key}`]: this.icon.customClasses || 
                      ['c-header-nav-icon', this.icon.className]
        }
      } else {
        return { customClasses: 'c-header-nav-icon', name: this.icon }
      }
    }
  },
  methods: {
    handleClick (e) {
      e.preventDefault()
      this.open = !this.open
      this.$emit('update:show', this.open)
    },
    itemClicked (e) {
      this.$emit('item-clicked', e)
    }
  }
}
</script>
