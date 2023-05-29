<script lang="ts">
    import Navbar from "./comps/Navbar.svelte";
    import SoundCuesTab from "./soundcues/SoundCuesTab.svelte";
    import {EchoBackend} from "./ts/api";

    let tab = 0;

    export let params = {};
</script>

<main id="project-details">
    <Navbar bind:selected={tab}/>
    <div id="content">
        {#await EchoBackend.getProject(params["id"])}
        {:then project}
            {#if tab === 0}
                <SoundCuesTab soundcues={project.sound_cues}/>
            {/if}
        {:catch error}
        {/await}
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
