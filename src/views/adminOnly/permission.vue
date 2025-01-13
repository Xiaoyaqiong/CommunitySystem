<template>
  <el-form
    class="permissform"
    ref="permissionRef"
    :model="permissionForm"
    :rules="ruleForm"
    label-position="right"
    label-width="80px"
  >
    <el-form-item label="用户角色" prop="role">
      <el-select
        v-model="permissionForm.role"
        placeholder="Role"
        class="m-2"
        size="large"
        style="width: 240px"
        @change="changeRole"
      >
        <el-option
          v-for="item in roleOptions"
          :key="item.id"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-tree
        ref="treeRef"
        :data="permissData"
        show-checkbox
        node-key="permiss"
        :default-expand-all="true"
        :props="defaultProps"
    /></el-form-item>
    <el-form-item>
      <el-button type="primary" @click="confirmPermiss(permissionRef)"
        >确认更改</el-button
      ></el-form-item
    >
  </el-form>
</template>
<script lang="ts" setup>
import { ref, reactive } from "vue";
import {
  ElMessage,
  ElTree,
  type FormInstance,
  type FormRules,
} from "element-plus";
import { usePermissStore } from "@/stores/permiss";
import { permissData } from "@/components/sideBarTitle";

const ruleForm = reactive<FormRules>({
  role: [{ required: true, message: "请选择角色", trigger: "change" }],
});
const permissionRef = ref<FormInstance>();

interface Tree {
  id: number;
  label: string;
  children?: Tree[];
}

const treeRef = ref<InstanceType<typeof ElTree>>();

const permissionForm = reactive({
  role: "",
});
const roleOptions = [
  {
    id: 0,
    value: "admin",
    label: "admin",
  },
  {
    id: 1,
    value: "user",
    label: "user",
  },
];

const defaultProps = {
  children: "children",
  label: "label",
};
const permissStore = usePermissStore();
permissStore.getAllPermission();
const changeRole = () => {
  treeRef.value!.setCheckedKeys(permissStore.roles[permissionForm.role]);
};

const confirmPermiss = async (formEl: FormInstance) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      permissStore.updatePermiss(
        permissionForm.role,
        treeRef.value!.getCheckedKeys(false)
      );
    } else {
      ElMessage.info("请检查格式");
    }
  });
  // console.log(permissionForm.role, treeRef.value!.getCheckedKeys(false));
};
</script>
<style scoped>
.permissform {
  margin: 10px;
}
.role-title {
  margin: 0 10px 15px 0;
}
.el-tree {
  margin: 15px 0;
  font-size: 16px;
}
</style>
