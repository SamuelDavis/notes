<template>
    <nav>
        <ol>
            <li :class="{active: name === $route.name}" :key="i" :style="{backgroundColor: colors[i]}"
                v-for="({path, name}, i) in routes">
                <router-link :to="path" v-text="name"/>
            </li>
        </ol>
    </nav>
</template>

<script>
    import ColorRepo from "../services/ColorRepo";

    const colorRepo = new ColorRepo('notes-nav-color-store');

    export default {
        name: 'notes-nav',
        props: {
            routes: Array
        },
        data() {
            let colors = colorRepo.get();
            if (colors.length < this.routes.length) {
                colors = colorRepo.generateRandomColors(this.routes.length);
                colorRepo.put(colors);
            }
            return {
                colors: colors.map((color) => `rgb(${color.join(',')})`),
            }
        }
    }
</script>

<style lang="scss" scoped>
    * {
        margin: 0;
        padding: 0;
    }

    ol {
        list-style: none;

        > li {
            margin-bottom: 0.1rem;
            box-shadow: 2px 2px 3px 0 #888;

            &.active {
                position: relative;
                left: -0.5rem;
            }

            a {
                display: block;
                padding: 0.5rem;
                color: black;
                text-decoration: none;
                text-shadow: 0 0 1px white;
            }
        }
    }
</style>
