<template>
  <div class="container-fluid p-0">
    <div class="navbar navbar-light justify-content-center pt-5 pb-5">
      <div class="nav-item">
        <router-link
          :to="{ name: 'contacts' }"
          class="nav-link"
        >
          <i class="fa fa-phone" /> Kontakty
        </router-link>
      </div>
      <div class="nav-item">
        <router-link
          :to="{ name: 'quiz' }"
          class="nav-link"
        >
          <i class="fa fa-question" /> Kvíz
        </router-link>
      </div>
    </div>
    <div class="container">
      <div class="card-body">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted: function () {}
}
</script>

<style lang="stylus" scoped>

</style>
