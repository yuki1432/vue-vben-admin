// 邮件标题模板
const titles = [
  '系统维护通知',
  '账号安全提醒',
  '活动奖励发放',
  '新功能上线公告',
  '服务器升级通知',
  '账号异常提醒',
  '节日活动预告',
  '系统更新说明',
  '账号解封通知',
  '违规处罚通知',
];

// 邮件内容模板
const contents = [
  '尊敬的用户，您好！我们将在近期进行系统维护，维护期间可能影响您的正常使用，请提前做好相关准备。',
  '您的账号存在异常登录情况，请及时修改密码并开启二次验证，保护账号安全。',
  '恭喜您获得活动奖励，奖励已发放至您的账号，请注意查收。',
  '新功能已上线，新增了更多便捷功能，欢迎体验使用。',
  '服务器将于今晚进行升级维护，预计维护时间2小时，请提前做好相关准备。',
  '检测到您的账号存在异常行为，请及时处理，避免影响正常使用。',
  '即将开启节日活动，丰厚奖励等你来拿，敬请期待！',
  '系统已更新至最新版本，新增多项功能优化，欢迎体验。',
  '您的账号已解除封禁，可以正常使用了。',
  '由于违反平台规则，您的账号已被处罚，请遵守平台规则。',
];

// 发件人列表
const senders = [
  '系统管理员',
  '安全中心',
  '活动中心',
  '运营团队',
  '客服中心',
  '技术团队',
  '平台管理员',
];

// 生成模拟数据
const generateMockData = (size = 100) => {
  const dataList = [];
  const now = new Date();

  for (let i = 0; i < size; i++) {
    // 随机生成开始时间（过去30天内）
    const startTime = new Date(
      now.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000,
    );
    // 随机生成结束时间（开始时间后的1-15天）
    const endTime = new Date(
      startTime.getTime() + (1 + Math.random() * 14) * 24 * 60 * 60 * 1000,
    );
    const isExpired = endTime < now;

    // 随机选择邮件类型
    const condition = Math.random() > 0.5 ? 'level' : 'none';
    // 如果是等级条件，随机生成1-100的等级要求
    const level =
      condition === 'level' ? Math.floor(Math.random() * 100) + 1 : undefined;

    const titleIndex = Math.floor(Math.random() * titles.length);
    const contentIndex = Math.floor(Math.random() * contents.length);
    const senderIndex = Math.floor(Math.random() * senders.length);

    dataList.push({
      id: 10_000 + i,
      title: titles[titleIndex],
      condition,
      level,
      startTime: startTime.toLocaleString(),
      endTime: endTime.toLocaleString(),
      content: contents[contentIndex],
      sender: senders[senderIndex],
      isExpired,
    });
  }
  return dataList;
};

export const mockData = generateMockData();
