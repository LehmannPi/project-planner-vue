<template>
  <div class="project" :class="{ complete: project.complete }">
    <!-- Conditional class up! ^ -->
    <div class="actions">
      <h3 @click="showDetails = !showDetails">{{ project.title }}</h3>
      <div class="icons">
        <span @click="deleteProject" class="material-icons">delete</span>
        <router-link :to="{ name: 'EditProject', params: { id: project.id } }">
          <span class="material-icons">edit</span>
        </router-link>
        <span @click="toggleComplete" class="material-icons tick">done</span>
      </div>
    </div>
    <div v-if="showDetails" class="details">
      <p>{{ project.details }}</p>
      <div class="actions">
        <h4>Tarefas</h4>
        <div class="filter-nav task">
          <router-link :to="{ name: 'AddTask', params: { id: project.id } }">
            <button>Nova Tarefa</button>
          </router-link>
        </div>
      </div>
      <div class="tasks" v-for="task in project['tasks']" :key="task.task">
        <Tasks :task="task" :id="project.id" :tasks="project['tasks']" />
      </div>
    </div>
  </div>
</template>

<script>
import Tasks from "./Tasks.vue";

export default {
  components: { Tasks },
  props: ["project"],
  data() {
    return {
      showDetails: false,
      uri: "http://localhost:3000/projects/" + this.project.id,
    };
  },
  methods: {
    deleteProject() {
      fetch(this.uri, { method: "DELETE" })
        .then(() => this.$emit("delete", this.project.id))
        .catch((err) => console.log(err));
    },
    toggleComplete() {
      // Updating just one property
      fetch(this.uri, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ complete: !this.project.complete }),
      })
        .then(() => {
          this.$emit("complete", this.project.id);
          // deve ser amarrado à view desejada com @complete. Seu parametro, especificado apenas em methods.
        })
        .catch((err) => console.log(err));
    },
    // toggleCompleteTask(task) {
    //   fetch(this.uri, {
    //     method: "PATCH",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ task.done: !this.project.tasks }),
    //   })
    // }
  },
};

// ! CRIAR .CSS PARA ADD E EDIT PROJECTS
</script>

<style scoped>
.project {
  margin: 20px auto;
  background: white;
  padding: 10px 20px;
  border-radius: 4px;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.05);
  border-left: 4px solid #e90074;
}
h3 {
  cursor: pointer;
}
h4 {
  text-decoration: none;
  text-transform: uppercase;
  font-size: 16px;
}

.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.material-icons {
  font-size: 24px;
  margin-left: 10px;
  color: #bbb;
  cursor: pointer;
}
.material-icons:hover {
  color: #777;
}
.project.complete {
  border-left: 4px solid #00ce89;
}
.project.complete .tick {
  color: #00ce89;
}
.filter-nav button:hover {
  color: #555;
}
.tasks {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  font-size: 16px;
  padding-left: 1em;
  /* color: black; */
}
.tasks label {
  width: 60%;
}
.tasks.complete {
  text-decoration: line-through;
}
.tasks .icons {
  padding-right: 2em;
}
</style>