<script lang="ts" setup>
import type { VxeGridProps } from '#/adapter/vxe-table';

import { onMounted } from 'vue';

import { Page } from '@vben/common-ui';

import { Button } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';

interface RowType {
  id: number;
  name: string;
  role: string;
  sex: string;
}

const gridOptions: VxeGridProps<RowType> = {
  columns: [
    { type: 'seq', width: 70 },
    { field: 'name', title: 'Name' },
    { field: 'role', title: 'Role' },
    { field: 'sex', title: 'Sex' },
  ],
  data: [],
  height: 'auto',
  pagerConfig: {
    enabled: false,
  },
  scrollY: {
    enabled: true,
    gt: 0,
  },
  showOverflow: true,
};

const [Grid, gridApi] = useVbenVxeGrid({ gridOptions });

// 模拟行数据
const loadList = (size = 200) => {
  try {
    const dataList: RowType[] = [];
    for (let i = 0; i < size; i++) {
      dataList.push({
        id: 10_000 + i,
        name: `Test${i}`,
        role: 'Developer',
        sex: '男',
      });
    }
    gridApi.setGridOptions({ data: dataList });
  } catch (error) {
    console.error('Failed to load data:', error);
    // Implement user-friendly error handling
  }
};

onMounted(() => {
  loadList(1000);
});
</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #toolbar-tools>
        <Button class="mr-2" type="primary" @click="() => gridApi.query()">
          刷新当前页面
        </Button>
        <Button class="mr-2" type="primary" @click="() => gridApi.reload()">
          刷新并返回第一页
        </Button>
        <Button
          type="primary"
          class="mr-3"
          danger
          @click="() => gridApi.reload()"
        >
          删除选中
        </Button>
      </template>
    </Grid>
  </Page>
</template>
