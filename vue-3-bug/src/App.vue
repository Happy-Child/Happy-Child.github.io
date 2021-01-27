<template>
  <h1>Hello Vue 3.0.5!!!!</h1>
  <button @click="inc">Clicked {{ count }} times.</button>
  <Example :count="count" />
</template>

<script>
import {computed, ref, watch} from "vue";

const Example = {
  template: `
    <div>
      <h1>Child component, count: {{ count }}</h1>
      <h1>Child component, computedCount: {{ computedCount }}</h1>
    </div>
  `,
  name: 'Example',
  props: {
    count: {
      type: Number,
      default: 0,
    },
  },
  setup({ count }) {
    const computedCount = computed(() => {
      return count * 123;
    });

    watch(count, () => {
      console.log('watch count:', count);
    });

    return {
      computedCount,
    }
  }
};

export default {
  components: {
    Example,
  },
  setup() {
    const count = ref(0);

    const inc = () => {
      count.value++;
    };

    return {
      count,
      inc
    };
  }
};
</script>

<style scoped>
h1 {
  font-family: Arial, Helvetica, sans-serif;
}
</style>
