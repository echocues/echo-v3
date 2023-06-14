<script lang="ts">
    export let enabled: boolean = false;
    
    function getClass(enabled) {
        return enabled ? "enabled" : "disabled";
    }
</script>

<button class="Toggle {getClass(enabled)} " on:click={() => enabled = !enabled}>
    <slot></slot>
</button>

<style lang="scss">
  @mixin common {
    padding: 4px 8px;
    border-radius: 8px;
    transition: background-color 100ms ease-in-out, border 100ms ease-in-out;
  }
  
  .Toggle.enabled {
    background-color: var(--accent-color);
    border: solid transparent 2px;
    
    :global(*) {
      color: var(--contrast-dark-color);
    }
    
    @include common;
  }
  
  .Toggle.disabled {
    border: solid var(--foreground-color) 2px;
    
    @include common;
  }
</style>