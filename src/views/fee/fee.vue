<template>
  <div class="fee-container">
    <el-card>
      <p class="fee-title">第{{ quarter }}季度小区生活费</p>
      <div class="handler-box">
        <div class="handler-button">
          <el-button type="primary" @click="exportXlsx" v-permission="['71']"
            >导出excel</el-button
          >
          <el-button type="success" @click="loadTemplate" v-permission="['73']"
            >下载导入模板</el-button
          >
          <el-upload
            action="#"
            :limit="1"
            accept=".xlsx, .xls"
            :show-file-list="false"
            :before-upload="beforeUpload"
            :http-request="handleMany"
          >
            <el-button type="success" v-permission="['70']"
              >批量导入</el-button
            ></el-upload
          >
          <el-button type="danger" @click="delData" v-permission="['72']"
            >删除数据</el-button
          >
        </div>
        <div class="handler-select">
          <span>季度：</span>
          <el-select
            v-model="quarter"
            class="m-2"
            size="large"
            style="width: 240px"
            @change="handleQuarter"
          >
            <el-option
              v-for="(item, index) in quarterList"
              :key="index"
              :label="item"
              :value="item"
            />
          </el-select>
        </div>
      </div>

      <el-table :data="tableData">
        <el-table-column prop="id" label="单号"></el-table-column>
        <el-table-column prop="departmentName" label="户名"></el-table-column>
        <el-table-column prop="waterFee" label="水费"></el-table-column>
        <el-table-column prop="electricFee" label="电费"></el-table-column>
        <el-table-column prop="total" label="总计"></el-table-column>
        <el-table-column prop="feeStatus" label="缴费状态"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import * as XLSX from "xlsx";
import FileSaver from "file-saver";
import service from "@/utils/request";
import { resolve } from "path";
import { ElMessage, ElMessageBox, UploadProps } from "element-plus";
import { useUserStore } from "@/stores/userdata";
const quarter = ref(1);
const quarterList = ref([1, 2, 3, 4]);
const tableData = ref([]);
const userStore = useUserStore();
const getTable = async () => {
  if (userStore.personInfo.role == 0) {
    const res = await service({
      url: "/fee/getlist?quarter=" + quarter.value,
      method: "GET",
    });
    res.data.forEach((item) => {
      item.feeStatus = item.feeStatus == "0" ? "未缴费" : "已缴费";
    });
    tableData.value = res.data;
  } else {
    const res = await service({
      url: "/fee/getCurrentUserFee",
      method: "POST",
      data: {
        user_id: userStore.personInfo.id,
        quarter: quarter.value,
      },
    });
    res.data.forEach((item) => {
      item.feeStatus = item.feeStatus == "0" ? "未缴费" : "已缴费";
    });
    tableData.value = res.data;
  }
};
onMounted(() => {
  getTable();
});
const handleQuarter = () => {
  getTable();
};
const list = [["序号", "单号", "户名", "水费", "电费", "总计", "缴费状态"]];
const exportXlsx = () => {
  tableData.value.map((item: any, i: number) => {
    const arr: any[] = [i + 1];
    const feeStatus2 = item.feeStatus == "0" ? "未缴费" : "已缴费";
    arr.push(
      ...[
        item.id,
        item.departmentName,
        item.waterFee,
        item.electricFee,
        item.total,
        feeStatus2,
      ]
    );
    list.push(arr);
  });
  const WorkSheet = XLSX.utils.aoa_to_sheet(list);
  const new_workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(new_workbook, WorkSheet, "第一页");
  XLSX.writeFile(new_workbook, `第${quarter.value}季度小区生活费.xlsx`);
};

const importList = ref<any>([]);
const beforeUpload: UploadProps["beforeUpload"] = async (rawFile) => {
  importList.value = await analysisExcel(rawFile);
  return true;
};
const analysisExcel = (file: any) => {
  return new Promise(function (resolve, reject) {
    const reader = new FileReader();
    reader.onload = function (e: any) {
      const data = e.target.result;
      const datajson = XLSX.read(data, {
        type: "binary",
      });

      const sheetName = datajson.SheetNames[0];
      const result = XLSX.utils.sheet_to_json(datajson.Sheets[sheetName]);
      resolve(result);
    };
    reader.readAsBinaryString(file);
  });
};
const handleMany = async () => {
  const list = importList.value.map((item: any, index: number) => {
    return {
      id: item["单号"],
      user_id: item["用户id"],
      departmentName: item["户名"],
      waterFee: item["水费"],
      electricFee: item["电费"],
      total: item["总计"],
      feeStatus: item["缴费状态"],
    };
  });
  const res = await service({
    url: "/fee/addList?quarter=" + quarter.value,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(list),
  });
  if (res?.code == 200) {
    tableData.value.push(...list);
    ElMessage.success(res.msg);
  } else {
    ElMessage.error(res.msg);
  }
};
const delData = async () => {
  ElMessageBox.confirm(`确定要删除第${quarter.value}季度的数据吗？`, "提示", {
    type: "warning",
  }).then(async () => {
    const res = await service({
      url: "/fee/removeAll",
      method: "DELETE",
      data: {
        quarter: quarter.value,
      },
    });
    if (res.code == 200) {
      ElMessage.success(res.msg);
      tableData.value = [];
    } else {
      ElMessage.error(res.msg);
    }
  });
};
const loadTemplate = async () => {
  try {
    const res = await service({
      url: "/upload/download",
      method: "GET",
      responseType: "blob",
    });
    const blobUrl = URL.createObjectURL(res);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = "downloaded_file.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
  } catch (error) {
    ElMessage.error("下载有误");
  }
};
</script>
<style scoped>
.fee-container {
  padding: 15px;
}
.fee-title {
  text-align: center;
  font-size: 22pt;
  margin-bottom: 3vh;
}
.handler-box {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2vh;
}
.handler-button {
  display: flex;
}
.handler-button .el-button {
  margin-right: 5px;
}
</style>
