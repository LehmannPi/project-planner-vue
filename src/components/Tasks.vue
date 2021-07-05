<template>
  <input
    type="checkbox"
    @click="toggleCompleteTask(task)"
    v-model="task.done"
    :value="done"
  />
  <label class="task">{{ task.task }}</label>
  <div class="icons">
    <span @click="showStuff" class="material-icons">edit</span>
    <span class="material-icons">delete</span>
  </div>
</template>

<script>
export default {
  props: ["task", "id", "tasks"],
  data() {
    return {
      uri: "http://localhost:3000/projects/" + this.id,
    };
  },
  methods: {
    transformaEmObj(tarefas) {
      let auxt = {};
debugger;
      for (let i = 0; i < tarefas.lenght; i++) {
        console.log(tarefas[i]);
        // if (typeof tarefas[i] == "object") {
          auxt = Object.assign(auxt, tarefas[i]);
        // }
      }
      console.log(auxt);
      return auxt;
    },
    showStuff() {
      //   console.log(this.task);
      //   console.log(this.id);
      //   console.log(this.tasks);
      var aux = this.transformaEmObj(this.tasks);
      fetch(this.uri, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tasks: [
            Object.assign(aux, {
              task: this.task.task,
              done: !this.task.done,
            }),
          ],
        }),
      }).catch((err) => console.log(err));
    },
  },
};
//   body: JSON.stringify({ tasks: [{
//       task: this.task.task,
//       done: !this.task.done
</script>

<style>
</style>