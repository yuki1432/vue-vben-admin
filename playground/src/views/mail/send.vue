<script lang="ts" setup>
import { ref, watch } from 'vue';

import { Page, useVbenForm } from '@vben/common-ui';

import { Card, message } from 'ant-design-vue';

function onSubmit(values: any) {
  message.error(JSON.stringify(values));
}

const condition = ref('none');

const [BaseForm] = useVbenForm({
  commonConfig: {
    colon: true,
    componentProps: {
      class: 'w-full',
    },
  },
  fieldMappingTime: [['time', ['startTime', 'endTime'], 'YYYY-MM-DD']],
  handleSubmit: onSubmit,
  handleValuesChange(_values, _fieldsChanged) {
    if (_fieldsChanged.includes('condition')) {
      condition.value = _values.condition || 'none';
    }
  },
  layout: 'horizontal',
  schema: [
    {
      component: 'VbenInput',
      componentProps: {
        placeholder: '请输入标题',
        style: {
          width: '450px',
        },
      },
      fieldName: 'title',
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
        style: {
          width: '450px',
        },
      },
      defaultValue: 'none',
      fieldName: 'condition',
      label: '接收条件',
      rules: 'required',
    },
    {
      component: 'InputNumber',
      componentProps: {
        placeholder: '请输入等级',
        style: {
          width: '450px',
        },
        min: 0,
        precision: 0,
      },
      fieldName: 'level',
      label: '等级',
      rules: 'required',
      dependencies: {
        show(values) {
          return values.condition === 'level';
        },
        triggerFields: ['condition'],
      },
    },
    {
      component: 'RangePicker',
      componentProps: {
        placeholder: '请选择时间范围',
        style: {
          width: '450px',
        },
      },
      fieldName: 'time',
      rules: 'required',
      label: '有效时间',
    },
    {
      component: 'Textarea',
      label: '正文内容',
      fieldName: 'content',
      rules: 'required',
      componentProps: {
        rows: 12,
        style: {
          height: '300px',
        },
      },
    },
    {
      component: 'VbenInput',
      label: '附件奖励',
      fieldName: 'rewards',
      // rules: 'required',
      componentProps: {
        style: {
          width: '450px',
        },
      },
    },
    {
      component: 'VbenInput',
      label: '发件人',
      fieldName: 'sender',
      rules: 'required',
      componentProps: {
        style: {
          width: '450px',
        },
      },
    },
  ],
  wrapperClass: 'grid-cols-1 md:grid-cols-1 lg:grid-cols-1',
});

// 监听条件变化，更新等级输入框的显示状态
watch(
  () => condition.value,
  (newValue) => {
    const schema = BaseForm.getSchema();
    const levelField = schema.find((item) => item.fieldName === 'level');
    if (levelField) {
      levelField.show = newValue === 'level';
      BaseForm.setSchema(schema);
    }
  },
);
</script>

<template>
  <Page content-class="flex flex-col gap-4">
    <Card title="添加邮件">
      <BaseForm />
    </Card>
  </Page>
</template>
