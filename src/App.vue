<template>
  <div id="app">
    <div id="nav">
      <router-link class="title" to="/">HSIAO LI CHI</router-link>
      <router-link class="sub-nav" to="/works">WORKS</router-link>
      <router-link class="sub-nav" to="/projects">PROJECTS</router-link>
      <router-link class="sub-nav" to="/contact">CONTACT</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  display: flex;
  align-items: flex-start;
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.title {
  flex-grow: 20;
  text-align: left;
}
.sub-nav {
  flex-grow: 1;
  text-align: right;
}
</style>
