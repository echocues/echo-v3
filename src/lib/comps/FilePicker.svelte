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

<div class="FilePicker">
    <input type="file" bind:this={input} bind:files/>
    <button on:click={() => input.click()}>Choose File</button>
    {#if files && files[0]}
        <span>{files[0].name}</span>
    {:else if initialValue}
        <span>{initialValue}</span>
    {:else}
        <span>No file selected</span>
    {/if}
</div>

<style lang="scss">
    .FilePicker {
      display: flex;
      width: 100%;
      align-items: center;
      gap: 4px;
      
      input {
        display: none;
      }
      
      span {
      }
      
      button {
        height: 100%;
        width: 30%;
        background-color: var(--foreground-color);
        padding: 0;
        border-radius: 8px;
      }
    }
</style>

