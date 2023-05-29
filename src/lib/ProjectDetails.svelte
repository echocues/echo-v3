<script lang="ts">
    import Navbar from "./comps/Navbar.svelte";
    import SoundCuesTab from "./soundcues/SoundCuesTab.svelte";
    let tab = 0;
</script>

<main id="project-details">
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
