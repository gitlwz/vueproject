<template>
    <div>
        <div class="vux-demo">
            <h1>{{msg}}</h1>
        </div>
        <x-button type="primary" @click.native="btnClick2">跳转页面四</x-button>
        <x-button type="primary" @click.native="btnClick">返回</x-button>
    </div>
</template>

<script>
import { XButton } from "vux";
export default {
    components: {
        XButton
    },
    data() {
        return {
            // note: changing this line won't causes changes
            // with hot-reload because the reloaded component
            // preserves its current state and we are modifying
            // its initial state.
            msg: "页面三"
        };
    },
    methods: {
        btnClick: function() {
            this.$router.go(-1);
        },
        btnClick2:function(){
            this.$router.push("/page2")
        }
    }
};
</script>
<style>
</style>
