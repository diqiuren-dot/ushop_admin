import Vue from "vue"
let vm=new Vue()

// 成功
export let success = (msg) => {
  vm.$message({
    message: msg,
    type: "success"
  });
}

// 失败
export let err = (msg) => {
  vm.$message({
    message: msg,
    type: "warning"
  });
}