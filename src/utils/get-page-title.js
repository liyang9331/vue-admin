import defaultSettings from '@/settings'

const title = defaultSettings.title || '算法管理调度平台'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
