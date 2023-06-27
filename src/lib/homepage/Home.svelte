<script lang="ts">
import HomeNav from "./HomeNav.svelte";
import {fade} from "svelte/transition";

enum Page {
    Landing,
    Features,
}

let currPage: Page = Page.Landing;

</script>

<main class="Home">
    <HomeNav on:main={() => currPage = Page.Landing}/>
    {#if currPage === Page.Landing}
        <div transition:fade>
            <img id="bg" src="/waves.svg" alt="wave">
            <div id="landing">
                <div class="title">
                    <h2>Master Stage<br>Sounds with</h2>
                    <h1>Ease</h1>
                </div>
                <button class="cta" on:click={() => currPage = Page.Features}>Learn More</button>
            </div>
        </div>
    {:else if currPage === Page.Features}
        <div transition:fade={{ delay: 400 }}>
            
        </div>
    {/if}
</main>

<style lang="scss">
  .Home {
    width: 100vw;
    height: 100vh;
    
    display: flex;
    flex-direction: column;
  }
  
  #bg {
    position: absolute;
    top: 0;
    right: 0;
    height: 100vh;
  }
  
  #landing {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    gap: 16vh;
    width: auto;
    
    margin-top: 12%;
    margin-left: 10%;
  }

  .title {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    gap: 8px;

    h2 {
      color: var(--contrast-color);
      font-size: 3vw;
      font-weight: normal;
      margin: 0;
    }

    h1 {
      color: var(--accent-color);
      font-weight: normal;
      font-size: 5vw;
      font-family: var(--display-font-fam);
      margin: 0 0 0 -5px;
    }
  }
  
  .cta {
    background-color: var(--accent-color);
    color: var(--background-color);
    border-radius: 8px;
    font-size: 1.2vw;
    padding: 6px 16px;
    width: 12vw;
    border: solid 2px transparent;
    
    transition: color 200ms ease-in-out, background-color 200ms ease-in-out, border 200ms ease-in-out;
    
    &:hover {
      background-color: transparent;
      color: var(--contrast-color);
      border: solid 2px var(--accent-color);
    }
  }
</style>
