<template>
  <div class="navbar-container d-flex content align-items-center">

    <!-- Nav Menu Toggler -->
    <ul class="nav navbar-nav d-xl-none">
      <li class="nav-item">
        <b-link
          class="nav-link"
          @click="toggleVerticalMenuActive"
        >
          <feather-icon
            icon="MenuIcon"
            size="21"
          />
        </b-link>
      </li>
    </ul>

    <!-- Left Col -->
    <div class="bookmark-wrapper align-items-center flex-grow-1 d-none d-lg-flex">
      <dark-Toggler class="d-none d-lg-block" />
    </div>
    <b-navbar-nav class="nav align-items-center ml-auto">
      <b-nav-item-dropdown
        right
        toggle-class="d-flex align-items-center dropdown-user-link"
        class="dropdown-user"
      >
        <template #button-content>
          <div class="d-sm-flex d-none user-nav">
            <p class="user-name font-weight-bolder mb-0">
              {{ user.nombre +' '+user.apellido }}
            </p>
            <span class="user-status">{{ user.email }}</span>
          </div>
          <b-avatar
            size="40"
            variant="light-primary"
            badge
            :src="user.foto"
            class="badge-minimal"
            badge-variant="success"
          />
        </template>

        <b-dropdown-item
          link-class="d-flex align-items-center"
          @click="perfil"
        >
          <feather-icon
            size="16"
            icon="UserIcon"
            class="mr-50"
          />
          <span>Profile</span>
        </b-dropdown-item>

        <b-dropdown-divider />

        <b-dropdown-item
          link-class="d-flex align-items-center"
          @click="logout"
        >
          <feather-icon
            size="16"
            icon="LogOutIcon"
            class="mr-50"
          />
          <span>Logout</span>
        </b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </div>
</template>

<script>
import {
  BLink, BNavbarNav, BNavItemDropdown, BDropdownItem, BDropdownDivider, BAvatar,
} from 'bootstrap-vue'
import DarkToggler from '@core/layouts/components/app-navbar/components/DarkToggler.vue'
import useJwt from '@/auth/jwt/useJwt'

export default {
  components: {
    BLink,
    BNavbarNav,
    BNavItemDropdown,
    BDropdownItem,
    BDropdownDivider,
    BAvatar,

    // Navbar Components
    DarkToggler,
  },
  props: {
    toggleVerticalMenuActive: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      selected: null,
      options: [
        { value: '01', text: '202101' },
        { value: '02', text: '202102' },
        { value: '03', text: '202103' },
        { value: '04', text: '202104' },
        { value: '05', text: '202105' },
        { value: '06', text: '202106' },
        { value: '07', text: '202107' },
        { value: '08', text: '202108' },
        { value: '09', text: '202109' },
        { value: '10', text: '202110' },
        { value: '11', text: '202111' },
        { value: '12', text: '202112' },
      ],
      user: JSON.parse(localStorage.getItem('userData')),
    }
  },
  created() {
    this.selected = this.currentDate()
  },
  methods: {
    logout() {
      // Remove userData from localStorage
      // ? You just removed token from localStorage. If you like, you can also make API call to backend to blacklist used token
      localStorage.removeItem(useJwt.jwtConfig.storageTokenKeyName)
      localStorage.removeItem(useJwt.jwtConfig.storageRefreshTokenKeyName)
      // Remove userData from localStorage
      localStorage.removeItem('userData')
      localStorage.removeItem('accessToken')
      this.$router.go({ name: 'login' })
    },
    perfil() {
      this.$router.push({ name: 'usuario-perfil' })
    },
    currentDate() {
      const current = new Date()
      const date = `${current.getMonth() + 1}`
      return date
    },
  },
}
</script>
