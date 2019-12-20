<template>
    <div>
        <h1>Notes</h1>
        <div>
            <h4>If lost, please return to:</h4>
            <p>
                <label>Samuel Davis</label>
                <a :href="`https://www.google.com/maps/place/${address.join(' ')}`" target="_blank">
                    <span :key="line" v-for="line in address" v-text="line"/>
                </a>
                <a :href="`tel:${phone}`" id="phone" v-text="phone"/>
                <a :href="`mailto:${email}`" v-text="email"/>
                <a :href="website" target="_blank" v-text="website"/>
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'home',
        data() {
            return {
                phone: '802-745-0057',
                email: 'samueljakdavis@gmail.com',
                website: 'https://sdavis.online',
                address: [
                    'Cornelius, NC',
                ]
            }
        }
    }
</script>

<style lang="scss" scoped>
    div:first-child {
        background-color: goldenrod;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        line-height: 1rem;

        * {
            display: block;
        }

        h4, p {
            margin: 0;
        }

        h1, p {
            margin-bottom: 4rem;
        }

        h1 {
            margin-top: 4rem;
        }

        a {
            color: black;
        }
    }
</style>
