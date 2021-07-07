import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import AddProject from "../views/AddProject.vue";
import EditProject from "../views/EditProject.vue";
import AddTask from "../views/AddTask.vue";
import EditTask from "../views/EditTask.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/add",
    name: "AddProject",
    component: AddProject,
  },
  {
    path: "/projects/?:id",
    name: "EditProject",
    component: EditProject,
    props: true,
  },
  // {
  //   path: "/projects/?:id",
  //   name: "Project",
  //   component: Project,
  //   props: true,
  // },
  {
    path: "/projects/add",
    name: "AddTask",
    component: AddTask,
    props: true,
  },
  {
    path: "/projects/?:id",
    name: "EditTask",
    component: EditTask,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
