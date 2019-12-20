<template>
    <div id="app">
        <notes-paper id="container">
            <template v-slot:header>
                <h1 class="header" v-text="$route.name"/>
            </template>
            <template v-slot>
                <router-view class="content"/>
            </template>
        </notes-paper>
        <notes-nav :routes="routes" id="nav"/>
    </div>
</template>

<script>
    import NotesPaper from "./components/NotesPaper";
    import NotesNav from "./components/NotesNav";
    import {routes} from "./router/index";

    export default {
        name: 'app',
        components: {
            NotesPaper,
            NotesNav
        },
        computed: {
            routes() {
                return routes.filter((route) => route.meta && route.meta.global)
            }
        }
    }
</script>

<style lang="scss">
    #app {
        display: flex;
        flex-direction: row;

        #container {
            flex: 1;
        }

        #nav {
            margin-top: 0.5rem;
            width: fit-content;
        }
    }
</style>
