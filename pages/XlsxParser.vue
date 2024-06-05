<script setup lang="ts">
import Button from '@/components/Button.vue'
import { useXlsxParser, type SheetSchema } from '@/composables/useXlsxParser'

const schemas: SheetSchema[] = [
  {
    sheetName: 'Sheet1',
    columns: [
      {
        field: 'type',
        title: '传感器类型',
        component: {
          type: 'select',
          options: [
            { label: '摄像头', value: 1 },
            { label: '激光雷达', value: 2 },
            { label: '毫米波雷达', value: 3 },
            { label: '鱼眼摄像头', value: 4 },
          ],
        },
        rules: [
          { message: '传感器类型不能为空！', required: true },
        ],
      },
      {
        field: 'name',
        title: '传感器名称',
        component: { type: 'input' },
        rules: [
          { message: '传感器名称不能为空！', required: true },
        ],
      },
      {
        field: 'accessMethod',
        title: '视频接入方式',
        component: {
          type: 'select',
          options: [
            { label: 'SDK', value: 1 },
            { label: 'RTSP', value: 2 },
          ],
        },
      },
      {
        field: 'protocol',
        title: '传输协议',
        component: {
          type: 'select',
          options: [
            { label: 'UDP', value: 'UDP' },
            { label: 'TCP', value: 'TCP' },
          ],
        },
      },
      {
        field: 'dataFormat',
        title: '数据格式',
        component: {
          type: 'select',
          options: [
            { label: '结构化数据', value: '结构化数据' },
          ],
        },
        rules: [
          { message: '数据格式不能为空！', required: true },
        ],
      },
      {
        field: 'sourcePath',
        title: 'RTSPurl（F,G列填一即可）',
        component: { type: 'input' },
        rules: [{ message: '' }],
      },
      {
        field: 'ip',
        title: 'IP: 端口（F,G列填一即可）',
        component: { type: 'input' },
        rules: [
          { message: '' },
        ],
      },
      {
        field: 'manufacturer',
        title: '厂家',
        component: {
          type: 'select',
          options: [
            { label: 'V-海康', value: 'HAIKANG' },
            { label: 'F-大华', value: 'DAHUA' },
            { label: 'R-大华', value: 'DAHUA' },
            { label: 'R-慧而视', value: 'HUIERSHI' },
            { label: 'R-雷科防务', value: 'LEIKE' },
            { label: 'L-图达通(捷豹)', value: 'JAGUAR' },
            { label: 'R-图达通(猎鹰)', value: 'TUDATONG_FALCON' },
            { label: 'R-速腾', value: 'SUTENG' },
          ],
        },
      },
      {
        field: 'deviceId',
        title: 'deviceID',
        component: { type: 'input' },
      },
      {
        field: 'model',
        title: '型号',
        component: { type: 'input' },
      },
      {
        field: 'cameraSn',
        title: '相机序列号',
        component: { type: 'input' },
      },
      {
        field: 'resolutionRatio.width',
        title: '相机分辨率宽度',
        component: { type: 'input' },
      },
      {
        field: 'resolutionRatio.height',
        title: '相机分辨率高度',
        component: { type: 'input' },
      },
      {
        field: 'frameRate',
        title: '帧率',
        component: {
          type: 'select',
          options: [
            { label: '25', value: 25 },
            { label: '50', value: 50 },
            { label: '60', value: 60 },
          ],
        },
      },
      {
        field: 'longitude',
        title: '经度（WGS84）',
        component: { type: 'input' },
      },
      {
        field: 'latitude',
        title: '纬度（WGS84）',
        component: { type: 'input' },
      },
      {
        field: 'installDirection',
        title: '安装方位',
        component: {
          type: 'select',
          options: [
            { label: '北', value: 'NORTH' },
            { label: '南', value: 'SOUTH' },
            { label: '西', value: 'WEST' },
            { label: '东', value: 'EAST' },
            { label: '东北', value: 'NORTH_EAST' },
            { label: '东南', value: 'SOUTH_EAST' },
            { label: '西北', value: 'NORTH_WEST' },
            { label: '西南', value: 'SOUTH_WEST' },
          ],
        },
      },
      {
        field: 'detectionDirection',
        title: '检测方向',
        component: {
          type: 'select',
          options: [
            { label: '面向路口', value: 'FacingTheIntersection' },
            { label: '远离路口', value: 'StayAwayFromIntersections' },
            { label: '车辆来向', value: 'VehicleComeDirection' },
            { label: '车辆去向', value: 'VehicleGoDirection' },
            { label: '补盲', value: 'FillInBlindness' },
          ],
        },
      },
      {
        field: 'installPole',
        title: '安装灯杆',
        component: {
          type: 'select',
          options: [
            { label: '监控杆', value: 'MonitoringRod' },
            { label: '红绿灯杆', value: 'SignalLightPole' },
          ],
        },
      },
      {
        field: 'polePosition',
        title: '灯杆位置',
        component: {
          type: 'select',
          options: [
            { label: '路口进口', value: 'IntersectionEntrance' },
            { label: '路口出口', value: 'IntersectionExit' },
          ],
        },
      },
      {
        field: 'username',
        title: '接入账号',
        component: { type: 'input' },
      },
      {
        field: 'password',
        title: '接入密码',
        component: { type: 'input' },
      },
      {
        field: 'remark',
        title: '备注',
        component: { type: 'input' },
      },
    ],
  },
]

const { parse, getTemplate, validate } = useXlsxParser(schemas)

async function handleFileChange (e: Event) {
  const t = e.target as HTMLInputElement
  if (t.files?.length) {
    const file = t.files[0]
    const data = await parse(file)

    if (validate(data)) {
      console.log('validate success')
      console.log({ data })
    }
  }
}
</script>

<template>
  <div flex="~ col gap-2 items-start">
    <div>XlsxParser</div>
    <input
      id="file"
      type="file"
      name=""
      @change="handleFileChange"
    >
    <Button size="small" shape="square" @click="getTemplate">Download</Button>
  </div>
</template>
