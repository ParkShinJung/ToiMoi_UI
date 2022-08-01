<template>
  <div>
    <div><main-side-bar></main-side-bar></div>
    <div><main-header></main-header></div>
    <div><router-view></router-view></div>
  </div>
</template>

<script>
import MainHeader from '@/views/components/MainHeader'
import MainSideBar from '@/views/components/MainSideBar'
export default {
  name: 'App',
  components: {
    MainSideBar,
    MainHeader
  }
}
</script>

<style>
</style>
