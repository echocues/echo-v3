<script lang="ts">
    import GenericDropdown from "./GenericDropdown.svelte";

    export let options: string[] = [];
    export let selected = options[0];
    
    let buttons = {};
    let dropdown: GenericDropdown;
    
    function select(option: string) {
        buttons[selected].classList.remove("selected");
        selected = option;
        buttons[selected].classList.add("selected");
        dropdown.toggle();
    }
    
</script>

<GenericDropdown text={selected} bind:this={dropdown}>
    {#each options as option}
        <button on:click={() => select(option)} bind:this={buttons[option]}>{option}</button>
    {/each}
</GenericDropdown>

<style lang="scss">
    :global(.selected) {
      color: var(--accent-color);
    }
</style>