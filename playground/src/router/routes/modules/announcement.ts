import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'grommet-icons:announce',
      order: 0,
      title: $t('page.announcement.title'),
    },
    name: 'Announcement',
    path: '/announcement',
    children: [
      {
        name: '/announcement/Send',
        path: 'send',
        component: () => import('#/views/announcement/send.vue'),
        meta: {
          affixTab: true,
          icon: 'grommet-icons:send',
          title: $t('page.announcement.send.title'),
        },
      },
      {
        name: '/announcement/Manage',
        path: 'manage',
        component: () => import('#/views/announcement/manage.vue'),
        meta: {
          icon: 'eos-icons:cluster-management-outlined',
          title: $t('page.announcement.manage.title'),
        },
      },
    ],
  },
];

export default routes;
