<script>
import HeaderComponent from "../components/HeaderComponent.vue";

export default {
  components: {
    HeaderComponent,
  },
  data() {
    return {
      categories: [],
      listCategories: [],
      searchInput: "",
    };
  },
  methods: {
    filter(array, value) {
      function find(object) {
        return Object.values(object).some(
          (v) => v === value || (v && typeof v === "object" && find(v))
        );
      }

      return array.filter(find);
    },
    async onClickInStar(id) {
      let index = this.listCategories.findIndex((item) => item.id === id);

      if (index !== -1) {
        let star = this.listCategories[index].star;
        this.listCategories[index].star = !star;
      }

      const response = await fetch(
        `http://localhost:3001/stars?originalId=${id}`
      );
      const data = await response.json();

      if (data[0]) {
        await fetch(`http://localhost:3001/stars/${data[0].id}`, {
          method: "DELETE",
        });
        return;
      }

      const item = this.listCategories.filter(
        (element) => element.id === id
      )[0];

      const saveItem = {
        title: item.title,
        category: item.category,
        image: item.image,
        address: item.address,
        descriptionImage: item.descriptionImage,
        originalId: item.id,
      };

      await fetch("http://localhost:3001/stars", {
        method: "POST",
        body: JSON.stringify(saveItem),
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    async search() {
      if (this.searchInput.length === 0) return;

      const responsePlaces = await fetch("http://localhost:3001/places");
      const responseStars = await fetch("http://localhost:3001/stars");
      const places = await responsePlaces.json();
      const stars = await responseStars.json();

      if (places.length > 0) {
        let placesFinded = places.filter((value) =>
          this.categories.includes(value.category)
        );

        const resultFilter = this.filter(placesFinded, this.searchInput);

        const result = resultFilter.map((element) => {
          let index = stars.findIndex((star) => star.originalId === element.id);

          if (index !== -1) {
            element.star = true;
          } else {
            element.star = false;
          }

          return element;
        });

        this.listCategories = result;
      }
    },
  },
};
</script>

<template>
  <HeaderComponent />
  <div class="home-container">
    <div class="input-container">
      <input
        class="input-text"
        type="text"
        placeholder="Buscar"
        v-model="searchInput"
      />
      <button class="button-lupa" @click="search">
        <img class="icon-lupa" src="../assets/lupa.png" alt="lupa de busca" />
      </button>
    </div>
    <div class="checkbox-container">
      <input type="checkbox" id="Restaurante" value="1" v-model="categories" />
      <label for="Restaurante">Restaurante</label>
      <input type="checkbox" id="Hospital" value="2" v-model="categories" />
      <label for="Hospital">Hospital</label>
      <input type="checkbox" id="Delegacias" value="3" v-model="categories" />
      <label for="Delegacias">Delegacias</label>
      <input type="checkbox" id="Praias" value="4" v-model="categories" />
      <label for="Praias">Praias</label>
      <input type="checkbox" id="Hoteis" value="5" v-model="categories" />
      <label for="Hoteis">Hoteis</label>
      <input type="checkbox" id="Shoppings" value="6" v-model="categories" />
      <label for="Shoppings">Shoppings</label>
    </div>
    <div class="listing-category">
      <div v-for="item in listCategories" :key="item.id">
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
          <button class="icon-star" @click="onClickInStar(item.id)">
            <font-awesome-icon
              icon="star"
              :style="{
                color: item.star ? '#0f928c' : '#ddd',
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
.input-container {
  display: flex;
  align-items: center;
  flex-direction: row;
  height: 40px;
  padding: 10px;
}

.button-lupa {
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  border: 1px solid #484848;
  border-radius: 10px;
  margin-left: 5px;
  transition: 0.3s;
}

.button-lupa:hover {
  scale: 1.1;
}

.icon-lupa {
  height: 30px;
  width: 30px;
}

.input-text {
  outline: none;
  padding: 10px;
  height: 40px;
  width: 420px;
  border-radius: 8px;
  border: 1px solid #484848;
}

.checkbox-container {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 10px;
}

label {
  margin-left: 6px;
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

.icon-star {
  position: absolute;
  right: 20px;
  background: transparent;
  outline: none;
  border: none;
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

.description-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 10px;
}
</style>
