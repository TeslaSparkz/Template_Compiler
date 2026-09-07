<template>
  <div class="card">
    <h1>Count: {{ count }}</h1>
    <button a-click="toggleBox">Toggle Box</button>
    <button a-click="incrementCount">Increment Count</button>

    <div v-if="showBox" class="box">
      <p>Status: {{exports.data.showBox ? 'Visible' : 'Hidden'}}</p>
    </div>

    <div v-if="count > 2" class="alert">
      <p>Count {{count}} is greater than 2!</p>
    </div>
  </div>
</template>

<script>
  class ExampleComponent extends AComponent {
    constructor() {
      super();
      this.data = {
        showBox: true,
        count: 0
      };
    }

    toggleBox = (data) => {
      data.showBox = !data.showBox;
      console.log("toggleBox called");
    }

    incrementCount = (data) => {
      data.count += 1;
      console.log("incrementCount called");
    }
  }
export default new ExampleComponent();
</script>

<style>
.card { padding: 20px; font-family: sans-serif; }
.box { margin-top: 10px; padding: 10px; background: #e0f7fa; }
.alert { margin-top: 10px; padding: 10px; background: #ffe0b2; }
</style>