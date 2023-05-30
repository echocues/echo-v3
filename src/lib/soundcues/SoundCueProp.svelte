<script lang="ts">
    export let propName: string;
</script>

<div class="SoundCueProp {$$props.class}" id={$$props.id}>
    <span>{propName}</span>
    <slot/>
</div>

<style lang="scss">
  div {
    display: flex;
    flex-direction: column;
    align-items: start;
    
    span {
      font-weight: 300;
      font-size: 1vw;
    }
  }
</style>
