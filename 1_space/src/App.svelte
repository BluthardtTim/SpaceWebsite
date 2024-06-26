<script>
  import Header from "./components/Header.svelte";
  import Router from "svelte-spa-router";
  import StartWrapper from "./pages/StartWrapper.svelte";
  import GameWrapper from "./pages/GameWrapper.svelte";


  const routes = {
    "/": StartWrapper,
    "/game": GameWrapper,
  };
</script>

<main>
  <Router {routes} />
</main>

<style>
  main {
    font-family: Arial, sans-serif;
  }
</style>
