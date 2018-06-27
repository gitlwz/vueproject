<template>
    <div>
        <div class="vux-demo">
            <h1>{{msg}}</h1>
            <h2>{{count}}</h2>
        </div>
        <group title="cell demo">
            <cell :title="$t('Default')" value="cool" is-link></cell>
        </group>
        <x-button type="primary" @click.native="btnClick">{{$t('Default')}} </x-button>
        <x-button type="primary" @click.native="btnClick2">英文文切换 </x-button>
        <x-button type="primary" @click.native="btnClick3">发送请求 </x-button>
        <x-button type="primary" @click.native="btnClick4">测试vuex </x-button>
        <x-button type="primary" @click.native="btnClick5">跳转到页面二 </x-button>
        <x-button type="primary" @click.native="btnClick6">测试i18n </x-button>
    </div>
</template>
<i18n>
Default:
  zh-CN: 默认
</i18n>
<script>
import { Group, Cell, XButton } from "vux";
import requestHybrid from "../hybrid/index.js";
import { mapState, mapActions } from 'vuex'
import Router from 'vue-router'
export default {
    components: {
        Group,
        Cell,
        XButton
    },
    data() {
        return {
            // note: changing this line won't causes changes
            // with hot-reload because the reloaded component
            // preserves its current state and we are modifying
            // its initial state.
            msg: "返回数据"
        };
    },
    computed:{
        ...mapState({
            count: state => state.HelloFromVux.count
        }),
    },
    methods: {
        ...mapActions('HelloFromVux',[
            'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`
        ]),
        btnClick: function() {
            this.$i18n.set("zh-CN");
        },
        btnClick2: function() {
            this.$i18n.set("en");
        },
        btnClick3: function() {
            requestHybrid({
                tagname: "getCooike",
                callback: data => {
                    this.msg = data;
                }
            });
        },
        btnClick4:function(){
            this.increment()
        },
        btnClick5:function(){
            this.$router.push('/page')
        },
        btnClick6:function(){
            console.log(this.$i18n.translate('Default'))
            console.log(this.$i18n.locale())
            console.log(this.$i18n.locales())
        }
    }
};
</script>

<style>
.vux-demo {
    text-align: center;
}
.logo {
    width: 100px;
    height: 100px;
}
</style>
