import Vue from "vue";
import { IonicVueRouter } from "@ionic/vue";

Vue.use(IonicVueRouter);

export default new IonicVueRouter({
    mode: "history",
    base: "/",
    routes: [
        {
            path: "/",
            component: () =>
                import(/* webpackChunkName: "home" */ "@/pages/Home.vue"),
            children: [
                {
                    path: "my-orders",
                    name: "myOrders",
                    components: {
                        myOrders: () =>
                            import(/* webpackChunkName: "myOrders" */ "@/components/MyOrders.vue")
                    }
                },
                {
                    path: "all-orders",
                    name: "allOrders",
                    components: {
                        allOrders: () =>
                            import(/* webpackChunkName: "allOrders" */ "@/components/AllOrders.vue")
                    }
                }
            ]
        },
        {
            path: "/signup",
            alias: "/login",
            name: "signup",
            component: () =>
                import("@/pages/Onboarding.vue"),
        }
    ]
})