export default function(res, type, fileName = '') {
  let blob = new Blob([res], { type: `application/${type}` })
  let a = document.createElement('a')
  let url = window.URL.createObjectURL(blob)
  a.href = url
  a.download = fileName
  a.click()
}
