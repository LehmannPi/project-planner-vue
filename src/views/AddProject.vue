<template>
  <form @submit.prevent="handleSubmit">
    <!-- IMPORTANT TO .PREVENT -->
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

    <div>
      <div class="tasks" v-for="(task, index) in tasks" :key="index">
        <!-- TAREFAS LISTADAS LOCALMENTE -->
        <input type="text" required />
        <span class="material-icons" @click="deleteTask(index)">delete</span>
      </div>
    </div>
    <button :disabled="!active">Adicionar Projeto</button>
  </form>
</template>

<script>
import Tasks from "../components/Tasks.vue";

export default {
  components: { Tasks },
  data() {
    return {
      title: "",
      details: "",
      tasks: [{ task: "" }], // done, id e projectId são produzidos/inferidos/gerados
      active: true,
      projects: [],
    };
  },
  methods: {
    async handleSubmit() {
      this.active = !this.active;
      let project = {
        title: this.title,
        details: this.details,
        complete: false,
      };
      await fetch("http://localhost:3000/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(project),
      });

      await fetch("http://localhost:3000/projects")
        .then((res) => res.json())
        .then((data) => (this.projects = data))
        .catch((err) => console.log(err));

      console.log(this.projects);

      // ! Pega o projeto que acabou de ser adicionado e a div dos campos de tarefa
      let last = this.projects[this.projects.length - 1];
      let camposTarefa = document.getElementsByClassName("tasks"); //[i].children[0].value
      // * LOOP NO MODELO t[i]["campo_desejado"] = X
      // await (() => {
      debugger;
      for (let i = 0; i < this.tasks.length; i++) {
        this.tasks[i]["projectId"] = last.id;
        this.tasks[i]["task"] = camposTarefa[i].children[0].value;
        this.tasks[i]["done"] = false;
      }
      // });
      fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.tasks),
      })
        .then(() => {
          this.$router.push("/");
        })
        .catch((err) => console.log(err));
    },
    addTask() {
      this.tasks.push({ task: "" });
    },
    deleteTask(index) {
      // this.tasks.splice(this.tasks.indexOf(task), 1);
      this.tasks.shift();
      document.getElementsByClassName("tasks")[index].children[0].value = "";
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