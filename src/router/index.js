import Vue from "vue";
import { IonicVueRouter } from "@ionic/vue";

Vue.use(IonicVueRouter);

export default new IonicVueRouter({
    mode: "history",
    base: "/",
    routes: [
        {
            path: "/tabs",
            component: () =>
                import(/* webpackChunkName: "home" */ "@/pages/HomePage.vue"),
            children: [
                {
                    path: "tab1",
                    name: "tab1",
                    components: {
                        tab1: () =>
                            import(/* webpackChunkName: "tab1" */ "@/pages/Tab1.vue")
                    }
                },
                {
                    path: "tab2",
                    name: "tab2",
                    components: {
                        tab2: () =>
                            import(/* webpackChunkName: "tab2" */ "@/pages/Tab2.vue")
                    }
                }
            ]
        },
        {
            path: "/login",
            alias: "/signup",
            component: () =>
                import("@/pages/Onboarding.vue"),
        },
        {
            path: "/map",
            component: () =>
                import("@/pages/Map.vue"),
        },
        { path: "/", redirect: "login" }
    ]
})