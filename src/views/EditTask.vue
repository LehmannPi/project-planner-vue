<template>
  <form @submit.prevent="handleSubmit">
    <label>Tarefa</label>
    <div class="dados">
      <input class="task" type="text" v-model="task" required />
      <div class="time">
        <span class="material-icons timer"> timer </span>
        <input class="time-val" type="number" step="0.1" v-model="time" required />
        <label>horas</label>
      </div>
    </div>
    <button>Editar Tarefa</button>
  </form>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      task: "",
      time: 0,
      uri: "http://localhost:3000/tasks/" + this.id,
    };
  },
  mounted() {
    fetch(this.uri)
      .then((res) => res.json())
      .then((data) => {
        this.task = data.task;
        this.time = data.time;
      })
      .catch((err) => console.log(err));
  },
  methods: {
    handleSubmit() {
      fetch(this.uri, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task: this.task, time: this.time }),
      })
        .then(() => {
          this.$router.push("/");
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style scoped>
form {
  background: white;
  padding: 20px;
  border-radius: 10px;
}
label {
  display: block;
  color: #bbb;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 1px;
  margin: 20px 0 10px 0;
}
input {
  padding: 10px;
  border: 0;
  border-bottom: 1px solid #ddd;
  width: 65%;
  box-sizing: border-box;
}
textarea {
  border: 1px solid #ddd;
  padding: 10px;
  /* width: 100%; */
  box-sizing: border-box;
  height: 100px;
}
form button {
  display: block;
  margin: 20px auto 0;
  background: #00ce89;
  color: white;
  padding: 10px;
  border: 0;
  border-radius: 6px;
  font-size: 16px;
}
.dados {
  width: 100%;
  display: flex;
  /* box-sizing: border-box; */
  justify-content: space-between;
  align-content: center;
}
.time {
  display: flex;
  width: 30%;
  justify-content: space-around;
  /* align-content: center; */
}
.time input {
  width: 45%;
}
.time label {
  margin: auto;
}
.timer {
  position: relative;
  margin: auto;
}
</style>