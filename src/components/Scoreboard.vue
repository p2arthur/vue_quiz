<!-- @format -->

<template>
  <div class="scoreContainer">
    <p>computer:{{ computerPoints }}</p>
    <p>player:{{ playerPoints }}</p>
  </div>
</template>

<script>
  export default {
    name: 'Scoreboard',
    props: { playerPoints: Number, computerPoints: Number },
  };
</script>

<style lang="scss">
  .scoreContainer {
    padding: 10px;
    background-color: #fff4ff;
    display: flex;
    justify-content: center;
    gap: 10px;
  }
</style>
