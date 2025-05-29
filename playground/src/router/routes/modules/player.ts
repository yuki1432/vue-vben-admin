import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'lucide:layout-dashboard',
      order: 1,
      title: $t('page.gm.title'),
    },
    name: 'GM',
    path: '/gm',
    children: [
      {
        name: 'OnlinePlayers',
        path: '/gm/online-players',
        component: () => import('#/views/dashboard/analytics/index.vue'),
        meta: {
          affixTab: true,
          icon: 'teenyicons:user-circle-solid',
          title: $t('page.gm.online_players.title'),
        },
      },
      {
        name: 'Players',
        path: '/gm/players',
        component: () => import('#/views/dashboard/workspace/index.vue'),
        meta: {
          icon: 'teenyicons:users-solid',
          title: $t('page.gm.players.title'),
        },
      },
    ],
  },
];

export default routes;
