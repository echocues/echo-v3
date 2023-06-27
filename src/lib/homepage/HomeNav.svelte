<script lang="ts">
    import {createEventDispatcher} from "svelte";

    const dispatcher = createEventDispatcher();
</script>

<div class="HomeNav">
    <button on:click={() => dispatcher("main", {})}>Echo</button>
    <span>|</span>
    <button on:click={() => dispatcher("about-us", {})} class="sub">About Us</button>
    <button on:click={() => dispatcher("contact", {})} class="sub">Contact</button>
    <button on:click={() => dispatcher("pricing", {})} class="sub">Pricing</button>
    <button on:click={() => dispatcher("login", {})} class="sub">Login</button>
</div>

<style lang="scss">
    .HomeNav {
      padding-left: 16px;
      padding-top: 8px;
      
      display: flex;
      
      button {
        color: var(--contrast-dark-color);
        font-size: 1.2vw;
        transition: color 200ms ease-in-out;
        
        &:hover {
          color: var(--accent-color);
        }
      }
      
      span {
        font-size: 2vw;
        color: var(--contrast-dark-color);
        margin-left: 8px;
        margin-right: 6px;
      }
      
      .sub {
        font-size: .8vw;
        margin: 4px;
      }
    }
</style>