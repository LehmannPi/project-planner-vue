<template>
  <input
    type="checkbox"
    @click="toggleCompleteTask()"
    v-model="task.done"
    :value="done"
  />
  <label class="task" :class="{ done: task.done }">{{ task.task }}</label>
  <div class="time">
    <span class="material-icons timer"> timer </span>
    <label> {{ task.time }} h</label>
  </div>
  <div class="icons">
    <router-link :to="{ name: 'EditTask', params: { id: task.id } }">
      <span class="material-icons">edit</span>
    </router-link>
    <span @click="deleteTask" class="material-icons">delete</span>
  </div>
</template>

<script>
export default {
  props: ["task"],
  data() {
    return {
      uri: "http://localhost:3000/tasks/" + this.task.id,
    };
  },
  methods: {
    toggleCompleteTask() {
      fetch(this.uri, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          done: !this.task.done,
        }),
      })
        .then(() => {
          this.$emit("done", this.task.id);
        })
        .catch((err) => console.log(err));
    },
    deleteTask() {
      fetch(this.uri, { method: "DELETE" })
        .then(() => this.$emit("delete", this.task.id))
        .catch((err) => console.log(err));
    },
  },
  
};
</script>

<style>
/*  Nunca usar tags nativas no css em vue */
.tasks {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  font-size: 16px;
  padding-left: 1em;
  /* color: black; */
}
.task {
  width: 50%;
}
.time {
  display: flex;
  width: 15%;
  justify-content: space-between;
}
.tasks.complete {
  text-decoration: line-through;
}
.tasks .icons {
  padding-right: 2em;
}
.material-icons {
  color: #bbb;
  cursor: pointer;
}

.material-icons:hover {
  color: #777;
}
.material-icons.timer{
  color: #777;
  cursor: default;
}
.task.done {
  text-decoration: line-through;
}

</style>