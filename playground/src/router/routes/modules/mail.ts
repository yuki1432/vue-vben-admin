import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'fluent-color:mail-20',
      order: 1,
      title: $t('page.mail.title'),
    },
    name: 'Mail',
    path: '/mail',
    children: [
      {
        name: 'Send',
        path: '/mail/send',
        component: () => import('#/views/dashboard/analytics/index.vue'),
        meta: {
          affixTab: true,
          icon: 'grommet-icons:send',
          title: $t('page.mail.send.title'),
        },
      },
      {
        name: 'Manage',
        path: '/mail/manage',
        component: () => import('#/views/dashboard/workspace/index.vue'),
        meta: {
          icon: 'eos-icons:cluster-management-outlined',
          title: $t('page.mail.manage.title'),
        },
      },
    ],
  },
];

export default routes;
