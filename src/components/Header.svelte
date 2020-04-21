<script>
  import Nav from "./Nav.svelte";
  export let segment;
</script>

<header class="flex w-screen p-2 my-auto max-w-screen-lg ">
  <Nav {segment} />
</header>
