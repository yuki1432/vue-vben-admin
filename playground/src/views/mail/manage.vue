<script lang="ts" setup>
import type { VxeGridProps } from '#/adapter/vxe-table';
import type { RowType } from './types';

import { h, onMounted, ref } from 'vue';

import { Page } from '@vben/common-ui';

import { Button, Input, message, Modal } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { requestClient } from '#/api/request';

const contentModalVisible = ref(false);
const currentEditRow = ref<null | RowType>(null);
const editContent = ref('');

const gridOptions: VxeGridProps<RowType> = {
  proxyConfig: {
    ajax: {
      query: async ({ page }) => {
        const data = await requestClient.get('mail/index', {
          // url: 'mail',
          params: {
            page: page.currentPage,
            pageSize: page.pageSize,
          },
        });
        // console.error(data);
        return {
          total: data.length,
          items: data,
        };
      },
    },
    autoLoad: true,
  },
  columns: [
    { type: 'checkbox', width: 50 },
    { type: 'seq', width: 70 },
    { field: 'title', title: '标题', width: 200 },
    { field: 'condition', title: '接收条件', width: 120 },
    { field: 'level', title: '等级', width: 100 },
    { field: 'startTime', title: '开始时间', width: 180 },
    { field: 'endTime', title: '结束时间', width: 180 },
    { field: 'sender', title: '发件人', width: 120 },
    {
      field: 'content',
      title: '正文内容',
      minWidth: 200,
      showOverflow: true,
      slots: {
        default: ({ row }: { row: RowType }) => {
          return h(
            Button,
            {
              type: 'link',
              onClick: () => handleEditContent(row),
            },
            () => `${row.content.slice(0, 20)}...`,
          );
        },
      },
    },
  ],
  data: [],
  height: 'auto',
  pagerConfig: {
    enabled: true,
    pageSize: 10,
  },
  scrollY: {
    enabled: true,
    gt: 0,
  },
  showOverflow: true,
  rowConfig: {
    isHover: true,
  },
  rowStyle: ({ row }: { row: RowType }) => ({
    backgroundColor: row.isExpired ? '#fff1f0' : '',
    color: row.isExpired ? '#ff4d4f' : '',
  }),
};

const [Grid, gridApi] = useVbenVxeGrid({ gridOptions });

// 处理编辑内容
const handleEditContent = (row: RowType) => {
  currentEditRow.value = row;
  editContent.value = row.content;
  contentModalVisible.value = true;
};

// 保存编辑的内容
const handleSaveContent = () => {
  if (currentEditRow.value) {
    requestClient.post('mail', {
      data: {
        id: currentEditRow.value.id,
        content: editContent.value,
      },
    }).then(() => {
      message.success('内容已更新');
      gridApi.reload();
    });
  }
  contentModalVisible.value = false;
};

// 删除选中的邮件
const handleDeleteSelected = () => {
  const selectedRows = gridApi.grid?.getCheckboxRecords() as RowType[];
  if (selectedRows.length === 0) {
    message.warning('请先选择要删除的邮件');
    return;
  }

  Modal.confirm({
    title: '确认删除',
    content: `确定要删除选中的 ${selectedRows.length} 封邮件吗？`,
    onOk: () => {
      requestClient.post('mail', {
        // url: '',
        data: {
          ids: selectedRows.map((row) => row.id),
        },
      }).then(() => {
        message.success('删除成功');
        gridApi.reload();
      });
    },
  });
};

// 取消选中
const handleClearSelection = () => {
  gridApi.grid?.clearCheckboxRow();
};
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
        <Button class="mr-2" type="primary" @click="handleClearSelection">
          取消选中
        </Button>
        <Button
          type="primary"
          class="mr-3"
          danger
          @click="handleDeleteSelected"
        >
          删除选中
        </Button>
      </template>
    </Grid>

    <Modal
      v-model:visible="contentModalVisible"
      title="编辑邮件内容"
      @ok="handleSaveContent"
    >
      <Input.TextArea
        v-model:value="editContent"
        :rows="10"
        style="width: 100%"
      />
    </Modal>
  </Page>
</template>

<style>
/* 移除之前的样式，因为我们现在使用内联样式 */
</style>
