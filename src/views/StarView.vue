<script>
import HeaderComponent from "../components/HeaderComponent.vue";

export default {
  components: {
    HeaderComponent,
  },
  created() {
    this.onLoad();
  },
  data() {
    return {
      listItems: [],
    };
  },
  methods: {
    async onClickTrash(id, event) {
      event.preventDefault();
      event.stopPropagation();
      const result = this.listItems.filter((star) => star.id !== id);
      this.listItems = result;
      await fetch(`http://localhost:3001/stars/${id}`, {
        method: "DELETE",
      });
    },
    async onLoad() {
      const response = await fetch("http://localhost:3001/stars");
      const data = await response.json();

      this.listItems = data;
    },
  },
};
</script>

<template>
  <HeaderComponent />
  <div class="home-container">
    <div class="listing-star">
      <div v-for="item in listItems" :key="item.id">
        <button
          class="place-container"
          @click="$router.push({ name: 'detail', params: { id: item.id } })"
        >
          <img
            class="img-restarant"
            :src="item.image"
            :alt="item.descriptionImage"
          />
          <div class="description-container">
            <p>{{ item.title }}</p>
            <small>{{ item.address }}</small>
          </div>
          <button class="icon-trash" @click="onClickTrash(item.id, $event)">
            <font-awesome-icon
              icon="trash"
              :style="{
                color: '#0f928c',
                height: '20px',
                width: '20px',
              }"
            />
          </button>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
small {
  text-align: start;
}
.home-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 0;
  flex-direction: column;
}

.place-container {
  display: flex;
  align-items: center;
  height: 80px;
  border: 1px solid #484848;
  width: 460px;
  border-radius: 10px;
  margin-top: 10px;
  padding: 5px;
  transition: 0.3s;
  position: relative;
}

.place-container:hover {
  transform: translateY(-6px);
  scale: 1.02;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
}

.img-restarant {
  height: 60px;
  width: 60px;
  border-radius: 50%;
}

.icon-trash {
  position: absolute;
  right: 20px;
  background: transparent;
  outline: none;
  border: none;
  display: block;
  padding: 12px 16px;
}

.description-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 10px;
}
</style>
