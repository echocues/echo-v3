<script lang="ts">
    import {fade} from "svelte/transition";
    import anime from "animejs/lib/anime.es.js";
    import {onMount} from "svelte";

    export let text: string;
    let expanded = false;
    let icon: HTMLImageElement;
    let dropdown: HTMLDivElement;

    export function toggle() {
        expanded = !expanded;
        anime({
            targets: icon,
            rotate: expanded ? '-90' : '0',
            easing: 'easeOutCubic',
            duration: 200
        });
    }

    function handleClick(event: MouseEvent) {
        if (expanded && !dropdown.contains(event.target as Node)) {
            toggle();
        }
    }

    onMount(() => {
        window.addEventListener('click', handleClick);

        return () => {
            window.removeEventListener('click', handleClick);
        }
    });
</script>

<div class="GenericDropdown {$$props.class}" id="{$$props.id}" bind:this={dropdown}>
    <button on:click={toggle}>
        {text}
        <svg width="37" height="59" viewBox="0 0 37 59" fill="none" xmlns="http://www.w3.org/2000/svg" bind:this={icon}>
            <path d="M36.4375 8.0625L30.2557 -2.70216e-07L0.437499 29.5L30.2557 59L36.4375 51.5625L15.9375 29.5L36.4375 8.0625Z" fill="currentColor"/>
        </svg>
    </button>
    {#if expanded}
        <div transition:fade="{{duration: 120}}">
            <slot/>
        </div>
    {/if}
</div>

<style lang="scss">
  .GenericDropdown {
    width: 100%;
    height: 4vh;

    button {
      background-color: var(--foreground-color);
      
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 8px;

      width: 100%;
      height: 100%;

      border-radius: 8px;
      padding: 0;

      p {
        margin-top: 4px;
        margin-bottom: 4px;
      }

      svg {
        width: 0.4vw;
        color: var(--contrast-color);
      }
    }

    div {
      display: flex;
      flex-direction: column;
      align-items: center;

      position: absolute;
      background-color: var(--foreground-color);
      border-radius: 8px;
      gap: 8px;

      width: auto;
      height: auto;
      padding: 8px 16px;
      margin-top: 8px;
      max-height: 30vh;
      overflow-y: auto;
    }
  }
</style>