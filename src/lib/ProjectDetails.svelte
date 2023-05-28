<script lang="ts">
    import Navbar from "./Navbar.svelte";
    import SoundCuesTab from "./SoundCuesTab.svelte";
    let tab = 0;
</script>

<main>
    <Navbar bind:selected={tab}/>
    <div id="content">
        {#if tab === 0}
            <SoundCuesTab/>
        {/if}
    </div>
</main>

<style lang="scss">
  main {
    display: flex;
    flex-direction: row;
    gap: var(--gap-size);
  }

  #content {
    width: 100%;
    height: 100vh;
    gap: var(--gap-size);
    
    display: flex;
    flex-direction: column;
  }
</style>
