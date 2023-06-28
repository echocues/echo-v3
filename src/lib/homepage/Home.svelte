<script lang="ts">
import HomeNav from "./HomeNav.svelte";
import {fade} from "svelte/transition";

enum Page {
    Landing,
    Features,
	Login
}

let currPage: Page = Page.Landing;

</script>

<main class="Home">
    <HomeNav 
		on:main={() => currPage = Page.Landing}
		on:login={() => currPage = Page.Login}
	/>
    <img id="bg" src="/waves.svg" alt="wave">
    {#if currPage === Page.Landing}
        <div in:fade={{ delay: 400 }} out:fade>
            <div id="landing">
                <div class="title">
                    <h2>Master Stage<br>Sounds with</h2>
                    <h1>Ease</h1>
                </div>
                <button class="cta" on:click={() => currPage = Page.Features}>Learn More</button>
            </div>
        </div>
    {:else if currPage === Page.Features}
        <div in:fade={{ delay: 400 }} out:fade>
            
        </div>
	{:else if currPage === Page.Login}
        <div in:fade={{ delay: 400 }} out:fade>
            <div id="login">
                <h2>Login</h2>
				<div id="fields">
					<input type="text" placeholder="Username">
					<input type="text" placeholder="Password">
					<button>or Register an Account</button>
				</div>
                <button class="cta-sub" on:click={() => currPage = Page.Features}>Login</button>
            </div>
        </div>
    {/if}
</main>

<style lang="scss">
  .Home {
    width: 100vw;
    height: 100vh;
    
    display: flex;
    flex-direction: column;
	
	background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='100%25' width='100%25'%3E%3Cdefs%3E%3Cpattern id='doodad' width='42' height='42' viewBox='0 0 40 40' patternUnits='userSpaceOnUse' patternTransform='rotate(120)'%3E%3Crect width='100%25' height='100%25' fill='rgba(0, 0, 0,0)'/%3E%3Cpath d='M0 0L20 0L20 20L0 20L0 0zM5.7 5.7L6 14L14 14L14 6zM20 20L40 20L40 40L20 40L20 20zM26 26L26 34L34.3 34.3L34 26z' fill='rgba(176, 255, 213,0.008)'/%3E%3Cpath d='M26 6L34.3 5.7L34 14L26 14zM6 26L14 26L14 34L5.7 34.3z' fill='rgba(0, 0, 0,0)'/%3E%3C/pattern%3E%3C/defs%3E%3Crect fill='url(%23doodad)' height='200%25' width='200%25'/%3E%3C/svg%3E ");
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
  }

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

  .cta-sub {
    border-radius: 8px;
    font-size: 1.2vw;
    padding: 6px 16px;
    width: 9vw;
    
    background-color: transparent;
    color: var(--contrast-color);
    border: solid 2px var(--accent-color);
    
	transition: color 200ms ease-in-out, background-color 200ms ease-in-out, border 200ms ease-in-out;
    
    &:hover {
      background-color: var(--accent-color);
      color: var(--background-color);
      border: solid 2px transparent;
    }
  }
 
  #login {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    width: auto;
    
    margin-top: 10%;
    margin-left: 10%;

    #fields {
	  display: flex;
	  flex-direction: column;
	  margin-top: 6vh;
	  margin-bottom: 16vh;
	  align-items: start;
	
	  input {
		background-color: var(--middleground-color);
		border: none;
		border-radius: 8px;
		padding: 16px 16px;
		font-family: var(--font-fam);
		font-size: .8vw;
		margin: 8px 0 8px 0;
		color: var(--contrast-color);

		&:focus {
		  outline: none;
		}
	  }

	  button {
		padding: 0;
		color: var(--accent-color);
		text-decoration: underline;
	  }
    }
  }
</style>
