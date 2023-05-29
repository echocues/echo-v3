<div class="indeterminate-progress-bar">
    <div class="indeterminate-progress-bar__progress"></div>
</div>

<style lang="scss">
  .indeterminate-progress-bar {
    background-color: var(--foreground-color);
    border-radius: 9999px;

    height: 0.5rem;
    width: 24vw;

    position: relative;
    overflow: hidden;
  }

  .indeterminate-progress-bar__progress {
    background-color: var(--accent-color);
    border-radius: 9999px;
    position: absolute;
    bottom: 0;
    top: 0;
    width: 50%;

    animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-name: indeterminate-progress-bar;
  }

  @keyframes indeterminate-progress-bar {
    from {
      left: -50%;
    }
    to {
      left: 100%;
    }
  }
</style>
