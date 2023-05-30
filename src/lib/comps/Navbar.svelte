<script lang="ts">
    import {onMount} from "svelte";
    import {pop} from "svelte-spa-router";

    export let selected = 0;
    let buttons = [];
    
    function select(i: number) {
        buttons[selected].classList.remove("tab-selected");
        selected = i;
        buttons[i].classList.add("tab-selected");
    }
    
    onMount(() => {
        buttons[0].classList.add("tab-selected");
    })
</script>

<nav class="middleground">
    <h3>Echo</h3>
    <div>
        <button on:click={() => select(0)} bind:this={buttons[0]} class="nav-item">
            <svg width="31" height="36" viewBox="0 0 31 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.7143 0V35.4286H22.1429V0H17.7143ZM8.85714 4.42857V31H13.2857V4.42857H8.85714ZM26.5714 8.85714V26.5714H31V8.85714H26.5714ZM0 13.2857V22.1429H4.42857V13.2857H0Z" fill="currentColor"/>
            </svg>
        </button>
        <button on:click={() => select(1)} bind:this={buttons[1]} class="nav-item">
            <svg width="29" height="34" viewBox="0 0 29 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0V33.1429H29V16.5714H12.4286V0H0ZM16.5714 0V12.4286H29L16.5714 0Z" fill="currentColor"/>
            </svg>
        </button>
        <button on:click={() => select(2)} bind:this={buttons[2]} class="nav-item">
            <svg width="35" height="31" viewBox="0 0 35 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0V13.125H13.125V0H0ZM17.5 0V4.375H35V0H17.5ZM17.5 8.75V13.125H30.625V8.75H17.5ZM0 17.5V30.625H13.125V17.5H0ZM17.5 17.5V21.875H35V17.5H17.5ZM17.5 26.25V30.625H30.625V26.25H17.5Z" fill="currentColor"/>
            </svg>
        </button>
        <button on:click={() => select(3)} bind:this={buttons[3]} class="nav-item">
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 0C7.6075 0 0 7.6075 0 17C0 26.3925 7.6075 34 17 34C26.3925 34 34 26.3925 34 17C34 7.6075 26.3925 0 17 0ZM12.75 8.5L25.5 17L12.75 25.5V8.5Z" fill="currentColor"/>
            </svg>
        </button>
    </div>
    <div id="bottom">
        <button on:click={() => select(4)} bind:this={buttons[4]} class="nav-item">
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.8803 0L12.7606 5.04489C12.3367 5.17207 11.9551 5.38404 11.5736 5.59601L6.52868 3.47631L3.47631 6.52868L5.59601 11.5736C5.38404 11.9975 5.21446 12.3367 5.04489 12.7606L0 14.8803V19.1197L5.04489 21.2394C5.21446 21.6633 5.38404 22.0025 5.59601 22.4264L3.47631 27.4713L6.52868 30.5237L11.5736 28.404C11.9551 28.5736 12.3367 28.7855 12.7606 28.9551L14.8803 34H19.1197L21.2394 28.9551C21.6209 28.7855 22.0449 28.616 22.4264 28.404L27.4713 30.5237L30.5237 27.4713L28.404 22.4264C28.5736 22.0449 28.7855 21.6209 28.9551 21.2394L34 19.1197V14.8803L28.9551 12.7606C28.8279 12.3791 28.616 11.9551 28.404 11.5736L30.5237 6.52868L27.4713 3.47631L22.4264 5.59601C22.0449 5.42643 21.6209 5.21446 21.2394 5.04489L19.1197 0L14.8803 0ZM17 10.5985C20.5187 10.5985 23.3591 13.4389 23.3591 16.9576C23.3591 20.4763 20.5187 23.3167 17 23.3167C13.4813 23.3167 10.6409 20.4763 10.6409 16.9576C10.6409 13.4389 13.4813 10.5985 17 10.5985Z" fill="currentColor"/>
            </svg>
        </button>
        <button class="nav-item" on:click={() => pop()}>
            <svg width="34" height="30" viewBox="0 0 34 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.6039 0V4.20131H29.4092V25.2079H12.6039V29.4092H33.6105V0H12.6039ZM8.40262 8.40262L0 14.7046L8.40262 21.0066V16.8052H25.2079V12.6039H8.40262V8.40262Z" fill="currentColor"/>
            </svg>
        </button>
    </div>
</nav>

<style lang="scss">
  nav {
    height: 100vh;
    width: 4.5vw;

    display: flex;
    flex-direction: column;
    align-items: center;

    gap: 0.8vh;

    .nav-item {
      background-color: rgba(0, 0, 0, 0);
      border: none;
      width: 100%;

      svg {
        width: 30%;
        color: var(--contrast-dark-color);
        transition: color 150ms ease-in-out, width 200ms ease-in;
      }

      &:hover {
        cursor: pointer;

        svg {
          width: 35%;
          color: var(--contrast-color);
        }
      }
    }
    
    .tab-selected {
      svg {
        color: var(--accent-color) !important;
      }
    }

    #bottom {
      margin-top: auto;
      margin-bottom: 1.2vh;
    }
  }
</style>