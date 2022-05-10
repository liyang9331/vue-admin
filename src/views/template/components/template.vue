<template>
    
</template>

<script>
export default {
    // 父组件传参参数
    props:{},
    // 数据
    data(){
        return {

        }
    },
    // 混入
    mixins:[],
    // 组件
    components:{},
    // 计算属性
    computed:{},
    // 监听器
    watch:{},
    // 创建之前（el、data和message都还是undefined,不可用的）
    beforeCreate(){},
    // 创建完毕（能读取到数据data的值,但是DOM还没生成）
    created(){},
    // 挂载之前（生成DOM,但此时{{ message }}还没有挂载data中的数据）
    beforeMount(){},
    // 挂载完毕（{{ message }}已经成功挂载渲染data的值）
    mounted(){},
    // 更新之前
    beforeUpdate(){},
    // 更新完毕
    updated(){},
    // 销毁之前
    beforeDestroy(){},
    // 销毁完毕（实例与视图的关系解绑，再修改message的值，视图再也不会更新了）
    destroyed(){},
    // 实例方法
    methods:{}
}
</script>
<style lang="scss" scoped>

</style>
