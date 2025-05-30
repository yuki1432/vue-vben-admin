import { defineEventHandler, getQuery, readBody } from 'h3';
import { usePageResponseSuccess, useResponseSuccess } from '../../utils/response';
import { mockData } from './data';



export default eventHandler(async (event) => {
  const method = event.method;
  const path = event.path;

  return useResponseSuccess(mockData);

  if (path === '/api/mail/list' && method === 'GET') {
    const query = getQuery(event);
    const page = Number(query.page) || 1;
    const pageSize = Number(query.pageSize) || 10;
    return usePageResponseSuccess(page, pageSize, mockData);
  }

  if (path === '/api/mail/update' && method === 'POST') {
    const body = await readBody(event);
    const { id, content } = body;
    const index = mockData.findIndex((item) => item.id === id);
    if (index !== -1) {
      mockData[index].content = content;
    }
    return useResponseSuccess(true);
  }

  if (path === '/api/mail/delete' && method === 'POST') {
    const body = await readBody(event);
    const { ids } = body;
    const idSet = new Set(ids);
    const newData = mockData.filter((item) => !idSet.has(item.id));
    mockData.length = 0;
    mockData.push(...newData);
    return useResponseSuccess(true);
  }
}); 
