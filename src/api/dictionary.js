import request from '@/utils/request';

// 根据类型查询字典值
export function getDictByType(data) {
  return request({
    url: '/sysDictData/getDictByType',
    method: 'post',
    data: data
  })
}
