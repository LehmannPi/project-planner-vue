<template>
  <form @submit.prevent="handleSubmit">
    <label>Tarefa</label>
    <input type="text" v-model="title" required />
    <label>Detalhes</label>
    <textarea v-model="details" required></textarea>
    <button>Editar Tarefa</button>
  </form>
</template>

<script>
export default {
  
}
</script>

<style>

</style>