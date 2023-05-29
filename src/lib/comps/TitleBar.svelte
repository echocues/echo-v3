<script lang="ts">
    export let subTitle: string = "Project Name";
    export let title: string = "Sound Cues";
</script>

<div class="title-bar middleground">
	<div id="title">
		<span>{subTitle}</span>
		<h2>{title}</h2>
	</div>
	<div id="tail">
		<slot/>
	</div>
</div>

<style lang="scss">
  .title-bar {
    height: 8%;

    padding-left: 1vw;
    padding-right: 1vw;
    padding-bottom: 1vh;
    padding-top: 1vh;

	display: flex;
	align-items: center;

    span {
      font-size: 0.8vw;
    }

    h2 {
      margin: 0;
    }

    #title {
	  display: flex;
	  flex-direction: column;
	  justify-content: center;
	}

	#tail {
	  margin-left: auto;
	}
  }
</style>
