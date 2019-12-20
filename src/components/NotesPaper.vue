<template>
    <div class="ruled-paper">
        <span class="rule"/>
        <slot name="header"/>
        <slot/>
    </div>
</template>

<script>
    export default {
        name: 'notes-paper',
    }
</script>

<style lang="scss">
    .ruled-paper {
        $line-height: 1rem;
        $header-height: 4 * $line-height;

        $rule-width: 0.30in;
        $rule-border: 0.05in;
        $rule-margin: 0.15in;
        $rule-size: $rule-width + $rule-border + $rule-margin;

        $rule-color: #efe4e4;
        $line-color: #d9eaf3;

        position: relative;
        display: flex;
        flex-direction: column;
        font-family: monospace;
        box-shadow: 0 0 3px 0 #888;

        > .rule {
            position: absolute;
            width: $rule-width;
            height: 100%;
            border-right: $rule-border double $rule-color;
        }

        > :not(.rule) {
            padding-left: $rule-width;
        }

        > .header {
            height: $header-height;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        > .content {
            flex: 1;
            background-image: repeating-linear-gradient($line-color 0px, $line-color 1px, transparent 2px, transparent $line-height); //calc(#{$line-height} - 1px), $line-color $line-height);
            padding: 0 $rule-width $line-height $rule-size;
        }

        * {
            margin: 0;
            padding: 0;
            border-width: 0;
            line-height: $line-height;
            background-color: transparent;
        }

        sup, sub {
            line-height: 0;
        }

        ul, ol {
            list-style-position: inside;
        }

        hr {
            margin: calc(#{$line-height / 2} - 1px) 0;
            border: 1px solid black;
        }

        input:not([type=submit]) {
            line-height: calc(#{$line-height} - 3px);
            border-bottom: 1px dashed black;
        }
    }
</style>
