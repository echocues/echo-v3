<script lang="ts">
    import GenericDropdown from "./GenericDropdown.svelte";
    import {createEventDispatcher} from "svelte";

    export let options: string[] = [];
    export let selected = options[0];
    
    let buttons = {};
    let dropdown: GenericDropdown;
    let dispatcher = createEventDispatcher();
    
    function select(option: string) {
        selected = option;
        dropdown.toggle();
        dispatcher("selectedoption", {
            option: selected
        })
    }
    
</script>

<GenericDropdown text={selected} bind:this={dropdown}>
    {#each options as option}
        {#if selected === option}
            <button on:click={() => select(option)} bind:this={buttons[option]} style="color: var(--accent-color)">{option}</button>
        {:else}
            <button on:click={() => select(option)} bind:this={buttons[option]}>{option}</button>
        {/if}
    {/each}
</GenericDropdown>