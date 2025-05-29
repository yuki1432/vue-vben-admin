<script lang="ts" setup>
import { Page, useVbenForm } from '@vben/common-ui';

import { Card, message } from 'ant-design-vue';

// import { Check } from 'lucide-vue-next';

function onSubmit(values: any) {
  message.error(JSON.stringify(values));
}

const [BaseForm] = useVbenForm({
  // 所有表单项共用，可单独在表单内覆盖
  commonConfig: {
    // 在label后显示一个冒号
    colon: true,
    // 所有表单项
    componentProps: {
      class: 'w-full',
    },
  },
  fieldMappingTime: [['time', ['startTime', 'endTime'], 'YYYY-MM-DD']],
  // 提交函数
  handleSubmit: onSubmit,
  handleValuesChange(_values, fieldsChanged) {
    // message.info(`表单以下字段发生变化：${fieldsChanged.join('，')}`);
    // message.error(JSON.stringify(_values));
  },

  // 垂直布局，label和input在不同行，值为vertical
  // 水平布局，label和input在同一行
  layout: 'horizontal',
  schema: [
    {
      // 组件需要在 #/adapter.ts内注册，并加上类型
      component: 'Input',
      // 对应组件的参数
      componentProps: {
        placeholder: '请输入标题',
        style: {
          width: '450px',
        },
      },
      // 字段名
      fieldName: 'title',
      // 界面显示的label
      label: '标题',
      rules: 'required',
    },
    {
      component: 'Select',
      componentProps: {
        options: [
          { label: '无条件', value: 'none' },
          { label: '等级条件', value: 'level' },
        ],
      },
      defaultValue: 'none',
      fieldName: 'condition',
      label: '接收条件',
      rules: 'required',
    },
    // {
    //   // 组件需要在 #/adapter.ts内注册，并加上类型
    //   component: 'ApiSelect',
    //   // 对应组件的参数
    //   componentProps: {
    //     // 菜单接口转options格式
    //     afterFetch: () => {
    //       // return data.map((item: any) => ({
    //       //   label: item.name,
    //       //   value: item.path,
    //       // }));
    //       return [
    //         {
    //           label: '系统邮件',
    //         },
    //         {
    //           label: '邮件',
    //         },
    //       ];
    //     },
    //     // 菜单接口
    //     api: 'a',
    //     autoSelect: 'first',
    //   },
    //   // 字段名
    //   fieldName: 'mailType',
    //   // 界面显示的label
    //   label: '邮件类型',
    // },
    {
      component: 'RangePicker',
      // 对应组件的参数
      componentProps: {
        // 菜单接口
        // api: getAllMenusApi,
        // 菜单接口转options格式
        labelField: 'name',
        valueField: 'path',
        childrenField: 'children',
      },
      // 字段名
      fieldName: 'time',
      // 界面显示的label
      label: '有效时间',
    },
    {
      component: 'Textarea',
      label: '正文内容',
      fieldName: 'content',
      rules: 'required',
      componentProps: {
        rows: 12, // 设置行数，每行约25px，12行约300px
        style: {
          height: '300px',
        },
      },
    },
    {
      component: 'VbenInput',
      label: '发件人',
      fieldName: 'sender',
      rules: 'required',
      // formItemClass: 'col-span-1 col-start-3',
      // align: 'right',
      componentProps: {
        style: {
          width: '450px',
        },
      },
    },
  ],
  // 大屏一行显示3个，中屏一行显示2个，小屏一行显示1个
  wrapperClass: 'grid-cols-1 md:grid-cols-1 lg:grid-cols-1',
});
</script>

<template>
  <Page content-class="flex flex-col gap-4">
    <!-- <template #extra>
      <DocButton class="mb-2" path="/components/common-ui/vben-form" />
    </template> -->
    <Card title="添加邮件">
      <!-- <template #extra>
        <Button type="primary">设置表单值</Button>
      </template> -->
      <BaseForm />
    </Card>
  </Page>
</template>
