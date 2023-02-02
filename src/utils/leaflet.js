import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import 'leaflet.pm';
import 'leaflet.pm/dist/leaflet.pm.css';
import WKT from "terraformer-wkt-parser"


delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '',
  iconUrl: require('@/assets/image/defaultIcon.png'),
  shadowUrl: '',
  iconSize: [30, 30]
})

//初始化地图
export function initMap(element, center, zoom) {
  const corner1 = L.latLng(90, -25) // 地图左上角
  const corner2 = L.latLng(-90, 335) // 地图右上角
  const bounds = L.latLngBounds(corner1, corner2) // 根据2个经纬度来确定一个矩形
  let container = document.getElementById(element)
  let map = L.map(container, {
    center: center, // 地图中心
    minZoom: 3,
    maxZoom: 16,
    zoom: zoom, //缩放比列
    zoomControl: false, //禁用 + - 按钮
    doubleClickZoom: true, // 禁用双击放大
    attributionControl: false, // 移除右下角leaflet标识
  });
  map.pm.addControls({
    position: 'topright',
    drawPolygon: false, // 添加绘制多边形
    drawMarker: false, //添加按钮以绘制标记
    drawCircleMarker: false, //添加按钮以绘制圆形标记
    drawPolyline: false, //添加按钮绘制线条
    drawRectangle: false,	//添加按钮绘制矩形
    drawCircle: false, //  添加按钮绘制圆圈
    editMode: false, //  添加按钮编辑多边形
    dragMode: false, //   添加按钮拖动多边形
    cutPolygon: false, // 添加一个按钮以删除图层里面的部分内容
    removalMode: false  // 清除图层
  });
 
  map.pm.setLang('zh');
  map.setMaxBounds(bounds) 
  return map
}

// 清除所有图层
export function deleteDrawRectangle(map) {
  map.eachLayer(function (layer) {
    if (!layer._container) {
      layer.remove()
    }
  })
}

// 在线icon
export const OnlineIcon = L.icon({
  iconUrl: require('@/assets/image/carema.png'),
  // shadowUrl: iconShadow,
  iconSize: [24, 41], //  图标的大小
  shadowSize: [41,41], //  影子的大小
  iconAnchor: [24, 41], //  图标将对应标记点的位置值1：为图标坐标第一个值(即32)的一半，值2：为图标坐标第二个值(即52)
  shadowAnchor: [4, 62], // 相同的影子
  popupAnchor: [1, -24] // 该点是相对于iconAnchor弹出信息的位置  这个是我手动调出来的，文档默认原始值是[-1，-76]，我是去一半值，取一半值调出来的
})
// 离线icon
export const OfflineIcon = L.icon({
  iconUrl: require('@/assets/image/grayCarema.png'),
  iconSize: [24, 41], 
  shadowSize: [41,41],
  iconAnchor: [24, 41],
  shadowAnchor: [4, 62],
  popupAnchor: [1, -24] 
})
// 故障icon
export const FaultIcon = L.icon({
  iconUrl: require('@/assets/image/redCarema.png'),
  iconSize: [24, 41],
  shadowSize: [41,41], 
  iconAnchor: [24, 41],
  shadowAnchor: [4, 62],
  popupAnchor: [1, -24]
})

// 添加一个点
export function drawMarker(item, eventName, callback, isDrag) {
  let marker = {}
  if(item.status == '1') {
    marker = L.marker(item.latlng, {
      icon: OnlineIcon,
      markerData: item,
      draggable: isDrag
    }).bindPopup(item.name).on(eventName, callback)
  } else if(item.status == '2') {
    marker = L.marker(item.latlng, {
      icon: OfflineIcon,
      markerData: item
    }).bindPopup(item.name).on(eventName, callback)
  } else {
    marker = L.marker(item.latlng, {
      icon: FaultIcon,
      markerData: item
    }).bindPopup(item.name).on(eventName, callback)
  }
  return marker
}

// 显示多边形
export function drawPolygon(mapJson, style, id, name, callback) {
  let json = WKT.parse(mapJson)
  json.coordinates[0].map(item => {
    item.reverse()
  })
  let polygon = L.polygon(json.coordinates[0], { color: style, layerData: {id:id, name: name} }).on('click', callback)
  return polygon
}

// 给多边形添加中心点文字
export function taggingLabel(layer) {
  var content = "<div>" + layer.options.layerData.name + "</div>"
  // marker的icon文字
  var myIcon = L.divIcon({
    html: "<div>"+content+"</div>",
    className: 'my-div-icon',
    iconSize: 30
  });

  //中心点位
  let tagLabel = L.marker(layer.getBounds().getCenter(), { icon: myIcon})
  return tagLabel
}

// 数据看板添加点
export function drawMarkerData(item, url, event, callback) {
  let icon = L.divIcon({
		html: `<div class="live">
      <span></span>
    </div>`,
		iconSize: [18, 18]
  })

  let customPopup = '<img style="height:150px;object-fit: contain;" src="' + url + '" />'
    // specify popup options 
  var customOptions =
    {
    'className' : 'custom'
    }

  let marker = {}
  marker = L.marker(item.latlng, {
    icon: icon,
    markerData: item
  }).bindPopup(customPopup, customOptions).on(event, callback)
  return marker
}