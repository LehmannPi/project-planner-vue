<template>
  <form @submit.prevent="handleSubmit">
    <label>Título</label>
    <input type="text" v-model="title" required />
    <label>Detalhes</label>
    <textarea v-model="details" required></textarea>

    <div>
      <div class="div-tarefas">
        <label>Tarefas</label>
        <label @click="addTask" class="task">Adicionar Tarefa</label>
      </div>
    </div>

    <div class="tasks" v-for="(task, index) in tasks" :key="index">
      <!-- TAREFAS LISTADAS LOCALMENTE -->
      <input type="text" v-model="task.task" required />
      <span class="material-icons" @click="deleteTask(index)">delete</span>
    </div>
    <!-- <div class="tasks" v-for="task in tasks" :key="task.id">
        <Tasks :task="task" @done="handleDone" @delete="handleDelete" />
      </div> -->

    <button>Atualizar Projeto</button>
  </form>
</template>

<script>
import Tasks from "../components/Tasks.vue";
import axios from "axios";

export default {
  props: ["id", "prj"],
  components: { Tasks },

  data() {
    return {
      title: "",
      details: "",
      tasks: [],
      uri: "http://localhost:3000/projects/" + this.id,
    };
  },
  mounted() {
    fetch(this.uri)
      .then((res) => res.json())
      .then((data) => {
        this.title = data.title;
        this.details = data.details;
      })
      .catch((err) => console.log(err));
    fetch("http://localhost:3000/tasks")
      .then((res) => res.json())
      .then((data) => {
        this.tasks = data.filter((task) => {
          return task.projectId == this.id;
        });
      })
      .catch((err) => console.log(err));
  },

  methods: {
    async handleSubmit() {
      await fetch(this.uri, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: this.title, details: this.details }),
      }).catch((err) => console.log(err));

      this.tasks.forEach((task) => {
        task.projectId = this.tasks[0].projectId;
      });

      debugger;
      for (let index = 0; index < this.tasks.length; index++) {
        debugger;
        if (this.tasks[index].id === undefined) {
          await fetch("http://localhost:3000/tasks" , {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              task: this.tasks[index].task,
              projectId: this.tasks[index].projectId,
            }),
          }).catch((err) => console.log(err));
        } else {
          await fetch("http://localhost:3000/tasks/" + this.tasks[index].id, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              task: this.tasks[index].task,
              projectId: this.tasks[index].projectId,
            }),
          }).catch((err) => console.log(err));
        }
      }
      this.$router.push("/");
    },
    addTask() {
      this.tasks.push({ task: "" });
    },
    deleteTask(index) {
      this.tasks.splice(index, 1);
      // this.tasks.splice(this.tasks.indexOf(task), 1);
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
  width: 100%;
  box-sizing: border-box;
}
textarea {
  border: 1px solid #ddd;
  padding: 10px;
  width: 100%;
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
.tasks-div {
  padding-top: 25px;
}
form button:disabled {
  background-color: #bbb;
}
form .tasks {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
form .tasks input {
  width: 80%;
}
.div-tarefas {
  display: flex;
  justify-content: space-between;
}
.task:hover {
  color: #777;
}
</style>