<script lang="ts">
    export let subTitle: string = "Project Name";
    export let title: string = "Sound Cues";
</script>

<div id="title-bar" class="middleground">
    <span>{subTitle}</span>
    <h2>{title}</h2>
</div>

<style lang="scss">
  #title-bar {
    height: 8%;

    display: flex;
    flex-direction: column;
    justify-content: center;

    padding-left: 1vw;
    padding-bottom: 1vh;
    padding-top: 1vh;

    span {
      font-size: 0.8vw;
    }

    h2 {
      margin: 0;
    }
  }
</style>