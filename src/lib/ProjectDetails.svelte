<script lang="ts">
    import Navbar from "./comps/Navbar.svelte";
    import SoundCuesTab from "./soundcues/SoundCuesTab.svelte";
    import {EchoBackend} from "./ts/api";
    import {onMount} from "svelte";
    import {EchoStores} from "./ts/stores.js";
    import ScriptsTab from "./scripts/ScriptsTab.svelte";

    let tab = 0;

    export let params = {};

    onMount(() => {
        EchoStores.openedProject.set(params['id']);
    });
</script>

<main class="ProjectDetails">
    <Navbar bind:selected={tab}/>
    <div id="content">
        {#await EchoBackend.getProject(params["id"])}
        {:then project}
            {#if tab === 0}
                <SoundCuesTab soundcues={project.sound_cues}/>
            {:else if tab === 1}
                <ScriptsTab/>
            {/if}
        {:catch error}
            <p>Error: {error}</p>
        {/await}
    </div>
</main>

<style lang="scss">
  .ProjectDetails {
    display: flex;
    flex-direction: row;
    gap: var(--gap-size);
  }

  #content {
    width: 100%;
    min-height: 100%;
  }
</style>
