<script>
import HeaderComponent from "../components/HeaderComponent.vue";

export default {
  components: {
    HeaderComponent,
  },
  async created() {
    console.log(this.$route.params.id);
    const id = this.$route.params.id;
    const response = await fetch(`http://localhost:3001/stars/${id}`);
    const data = await response.json();

    this.item = data;
  },
  data() {
    return {
      item: {},
    };
  },
};
</script>

<template>
  <HeaderComponent />
  <div class="detail-container">
    <img class="" :src="item.image" :alt="item.descriptionImage" />
    <h1>{{ item.title }}</h1>
    <h1>{{ item.address }}</h1>
  </div>
</template>

<style scoped>
.detail-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 0;
  flex-direction: column;
}

img {
  height: 50%;
  width: 50%;
  border-radius: 10px;
}

h1 {
  margin-top: 20px;
}
</style>
