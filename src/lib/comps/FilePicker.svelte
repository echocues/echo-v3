<script lang="ts">
    import {createEventDispatcher} from "svelte";

    export let initialValue: string = undefined;
    let input: HTMLElement;
    let files;
    
    const dispatch = createEventDispatcher();
    
    $: if (files) {
        dispatch("fileChanged", {
            files: files,
        });
    }
</script>

<button class="FilePicker" on:click={() => input.click()}>
    <input type="file" bind:this={input} bind:files/>
    {#if files && files[0]}
        <span>{files[0].name}</span>
    {:else if initialValue}
        <span>{initialValue}</span>
    {:else}
        <span>No file selected</span>
    {/if}
</button>

<style lang="scss">
    .FilePicker {
      width: 100%;
      height: 16vh;
      border: dashed var(--foreground-color) 2px;
      border-radius: 8px;
      
      align-items: center;
      justify-content: center;
      
      input {
        display: none;
      }
    }
</style>

