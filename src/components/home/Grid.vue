<template>
  <div>
    <van-grid :column-num="5">
      <van-grid-item
        @click="ye(item.id)"
        v-for="(item, index) in channel"
        :key="index"
        :icon="item.icon_url"
        :text="item.name"
      />
    </van-grid>
  </div>
</template>

<script>
export default {
  props: ["channel"],
  data() {
    return {};
  },
  methods: {
    ye(id) {
      this.$router.push(`/fenleidaohan?id=${id}`);
    },
  },
};
</script>

<style>
</style>