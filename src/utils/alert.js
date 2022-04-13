import Vue from "vue"
const vue = new Vue()

export const successAlert = (msg)=>{
    vue.$message({
        showClose: true,
        message: msg,
        type: 'success'
    });
}

export const warningAlert = (msg)=>{
    vue.$message({
        showClose: true,
        message: msg,
        type: 'warning'
    });
}

