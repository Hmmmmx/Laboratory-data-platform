/* @jsxImportSource @emotion/react */
import { Button, Card, Form, Input, Select, Space, Table, Upload, UploadProps, message } from 'antd';
import { FC, ReactElement, Fragment, useRef, useState, useEffect } from 'react';
import { CloudServerOutlined, DownloadOutlined, FileExcelTwoTone, UploadOutlined } from '@ant-design/icons'
import { deleteDevice, getCsv, getDevice, getTableData, uploadFile } from './service';
import style from './index.module.css';
import AddDeviceModal from './addDeviceModal';
import { productTypes, products, soldProducts, employeePositions, employee, transportationModes, transportedGoods } from '../../../utils/constant';

const props: UploadProps = {
  action: 'http://8.134.59.53/rest/data/access/file/upload',
  customRequest: (options: any) => {
    const formData = new FormData();
    formData.append("file", options.file);
    uploadFile(formData).then(res => {
      options.onSuccess(res, options.file);
      message.success("上传成功！")
    })
  },
};

// 格式化事件时间戳
const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000); // 将时间戳转换为Date对象
  const year = date.getFullYear();
  const month: any = (date.getMonth() + 1).toString().padStart(2, '0'); // 月份从0开始，需要加1，并补0
  const day: any = (date.getDate() + 1).toString().padStart(2, '0');

  return `${year}-${month}-${day}`
}

const columns = [
  {
    title: '企业名称',
    dataIndex: 'corporation',
    key: 'corporation',
  },
  {
    title: '员工类型',
    dataIndex: 'staffCategories',
    key: 'staffCategories',
  },
  {
    title: '员工职位',
    dataIndex: 'positions',
    key: 'positions',
  },
  {
    title: '员工技能',
    dataIndex: 'skill',
    key: 'skill',
  },
  {
    title: '员工数量',
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: '研发费用',
    dataIndex: 'research',
    key: 'research',
  },
  {
    title: '设备费用',
    dataIndex: 'device',
    key: 'device',
  },
  {
    title: '生产费用',
    dataIndex: 'production',
    key: 'production',
  },
  {
    title: '仓储费用',
    dataIndex: 'storage',
    key: 'storage',
  },
  {
    title: '物料费用',
    dataIndex: 'materiel',
    key: 'materiel',
  },
  {
    title: '运输费用',
    dataIndex: 'transportation',
    key: 'transportation',
  },
  {
    title: '人工费用',
    dataIndex: 'salary',
    key: 'salary',
  },
  {
    title: '总收入',
    dataIndex: 'revenue',
    key: 'revenue',
  },
  {
    title: '利润',
    dataIndex: 'profit',
    key: 'profit',
  },
  {
    title: '固定资产',
    dataIndex: 'fixedAssets',
    key: 'fixedAssets',
  },
  {
    title: '流动资产',
    dataIndex: 'cashAssets',
    key: 'cashAssets',
  },
  {
    title: '融资',
    dataIndex: 'finance',
    key: 'finance',
  },
  {
    title: '运输工具',
    dataIndex: 'conveyCategories',
    key: 'conveyCategories',
  },
  {
    title: '运输货物',
    dataIndex: 'conveyTypes',
    key: 'conveyTypes',
  },
  {
    title: '运输量',
    dataIndex: 'conveyQuantity',
    key: 'conveyQuantity',
  },
  {
    title: '运输剩余库存',
    dataIndex: 'conveyInventory',
    key: 'conveyInventory',
  },
  {
    title: '运输里程数',
    dataIndex: 'mileage',
    key: 'mileage',
  },
  {
    title: '货物运输费用',
    dataIndex: 'conveyCost',
    key: 'conveyCost',
  },
  {
    title: '生产产品类型',
    dataIndex: 'productionCategories',
    key: 'productionCategories',
  },
  {
    title: '生产产品',
    dataIndex: 'productionTypes',
    key: 'productionTypes',
  },
  {
    title: '产品产量',
    dataIndex: 'productionQuantity',
    key: 'productionQuantity',
  },
  {
    title: '生产产品费用',
    dataIndex: 'productionCost',
    key: 'productionCost',
  },
  {
    title: '生产产品省份',
    dataIndex: 'productionProvince',
    key: 'productionProvince',
  },
  {
    title: '生产产品国家',
    dataIndex: 'productionCountry',
    key: 'productionCountry',
  },
  {
    title: '生产产品质量',
    dataIndex: 'quality',
    key: 'quality',
  },
  {
    title: '销售产品类型',
    dataIndex: 'saleCategories',
    key: 'saleCategories',
  },
  {
    title: '销售产品',
    dataIndex: 'saleTypes',
    key: 'saleTypes',
  },
  {
    title: '产品销量',
    dataIndex: 'saleQuantity',
    key: 'saleQuantity',
  },
  {
    title: '销售营收',
    dataIndex: 'income',
    key: 'income',
  },
  {
    title: '销售支出',
    dataIndex: 'saleCost',
    key: 'saleCost',
  },
  {
    title: '销售省份',
    dataIndex: 'saleProvince',
    key: 'saleProvince',
  },
  {
    title: '销售国家',
    dataIndex: 'saleCountry',
    key: 'saleCountry',
  },
  {
    title: '销售库存',
    dataIndex: 'saleInventory',
    key: 'saleInventory',
  },
  {
    title: '服务评价',
    dataIndex: 'score',
    key: 'score',
  },
  {
    title: '事件时间',
    dataIndex: 'eventTime',
    key: 'eventTime',
    render: (text: number) => {
      const time: string = formatDate(text);
      return time;
    }
  },
  // {
  //   title: '更新时间',
  //   dataIndex: 'updateTime',
  //   key: 'updateTime',
  //   render: (text: number) => {
  //     const time: string = formatDate(text);
  //     return time;
  //   }
  // },
];

const DataManage: FC = (): ReactElement => {
  const currentFormData: any = useRef();
  const [dataSource, setDataSource] = useState({
    total: 0,
    devices: [],
  });
  const [tableDataSource, setTableDataSource] = useState([])
  const [total, setTotal] = useState(0);
  const addDeviceModalRef: any = useRef();

  const onChange = (pagination: any) => {
    const params = {
      limit: pagination.pageSize,
      offset: pagination.current - 1,
    }
    getTableData(params).then((res: any) => {
      res.data.originals = res.data.originals.map((item: any) => {
        for (const key in transportationModes) {
          item.conveyCategories = item.conveyCategories == key ? transportationModes[key] : item.conveyCategories
          if (item.conveyCategories == transportationModes[key]) {
            break
          }
        }
        for (const key in transportedGoods) {
          item.conveyTypes = item.conveyTypes == key ? transportedGoods[key] : item.conveyTypes
          if (item.conveyTypes == transportedGoods[key]) {
            break
          }
        }
        for (const key in employeePositions) {
          item.positions = item.positions == key ? employeePositions[key] : item.positions
          if (item.positions == employeePositions[key]) {
            break
          }
        }
        for (const key in employee) {
          item.staffCategories = item.staffCategories == key ? employee[key] : item.staffCategories
          if (item.staffCategories == employee[key]) {
            break
          }
        }
        for (const key in productTypes) {
          item.productionCategories = item.productionCategories == key ? productTypes[key] : item.productionCategories
          if (item.productionCategories == productTypes[key]) {
            break
          }
        }
        for (const key in products) {
          item.productionTypes = item.productionTypes == key ? products[key] : item.productionTypes
          if (item.productionTypes == products[key]) {
            break
          }
        }
        for (const key in productTypes) {
          item.saleCategories = item.saleCategories == key ? productTypes[key] : item.saleCategories
          if (item.saleCategories == productTypes[key]) {
            break
          }
        }
        for (const key in soldProducts) {
          item.saleTypes = item.saleTypes == key ? soldProducts[key] : item.saleTypes
          if (item.saleTypes == soldProducts[key]) {
            break
          }
        }
        return item
      })
      setTableDataSource(res.data.originals);
      setTotal(res.data.total);
    })
  }

  const onFinish = (values: any) => {
    currentFormData.current = { ...values };
    const params = {
      ...values,
      offset: 0,
      limit: 999,
    }
    getDevice(params).then((res: any) => {
      console.log(res.data)
      setDataSource(res.data);
    })
  }

  useEffect(() => {
    const params = {
      statement: "",
      types: 1,
      offset: 0,
      limit: 999,
    }
    getDevice(params).then((res: any) => {
      // console.log(res.data)
      setDataSource(res.data);
    })
    const tableParams = {
      limit: 10,
      offset: 0
    }
    getTableData(tableParams).then((res: any) => {
      // console.log(res.data.originals)
      res.data.originals = res.data.originals.map((item: any) => {
        for (const key in transportationModes) {
          item.conveyCategories = item.conveyCategories == key ? transportationModes[key] : item.conveyCategories
          if (item.conveyCategories == transportationModes[key]) {
            break
          }
        }
        for (const key in transportedGoods) {
          item.conveyTypes = item.conveyTypes == key ? transportedGoods[key] : item.conveyTypes
          if (item.conveyTypes == transportedGoods[key]) {
            break
          }
        }
        for (const key in employeePositions) {
          item.positions = item.positions == key ? employeePositions[key] : item.positions
          if (item.positions == employeePositions[key]) {
            break
          }
        }
        for (const key in employee) {
          item.staffCategories = item.staffCategories == key ? employee[key] : item.staffCategories
          if (item.staffCategories == employee[key]) {
            break
          }
        }
        for (const key in productTypes) {
          item.productionCategories = item.productionCategories == key ? productTypes[key] : item.productionCategories
          if (item.productionCategories == productTypes[key]) {
            break
          }
        }
        for (const key in products) {
          item.productionTypes = item.productionTypes == key ? products[key] : item.productionTypes
          if (item.productionTypes == products[key]) {
            break
          }
        }
        for (const key in productTypes) {
          item.saleCategories = item.saleCategories == key ? productTypes[key] : item.saleCategories
          if (item.saleCategories == productTypes[key]) {
            break
          }
        }
        for (const key in soldProducts) {
          item.saleTypes = item.saleTypes == key ? soldProducts[key] : item.saleTypes
          if (item.saleTypes == soldProducts[key]) {
            break
          }
        }
        return item
      })
      setTableDataSource(res.data.originals);
      setTotal(res.data.total)
    })
  }, [])

  return (
    <Fragment>
      <div
        css={{
          border: "1px solid #bbbbbb",
          padding: "20px"
        }}
      >
        <div
          css={{
            display: "flex",
          }}
        >
          <span
            css={{
              flex: "1",
            }}
          >
            已接入设备{dataSource.total}个
          </span>
          <Form
            layout="inline"
            // initialValues={{ granularity: 1, time: 1690946777 }}
            onFinish={onFinish}
            css={{
              display: 'inline-flex'
            }}
          >
            <Form.Item
              name="types"
              initialValue='1'
              css={{
                flex: "1",
              }}
            >
              <Select
                placeholder="请选择"
                css={{
                  width: '100px !important',
                }}
                options={[
                  {
                    value: '1',
                    label: 'ip地址',
                  },
                  {
                    value: '2',
                    label: '端口号',
                  },
                ]}
              >
              </Select>
            </Form.Item>
            <Form.Item
              name="statement"
              css={{
                flex: "1",
              }}
            >
              <Input placeholder='请输入查询内容' />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
            </Form.Item>
            <span
              css={{
                flex: "1",
              }}
            >
              <Button
                type="primary"
                className={style.btnSuccess}
                onClick={() => {
                  addDeviceModalRef.current.open();
                }}
              >
                添加设备
              </Button>
            </span>
          </Form>
        </div>
        <Space size={[8, 16]} wrap>
          {dataSource.devices.map((item: any, index) => (
            <Card
              key={index}
              size="small"
              title={`设备${item.id}`}
              extra={
                <Button
                  danger
                  type="text"
                  onClick={() => {
                    deleteDevice([{
                      ip: item.ip,
                      port: item.port,
                    }]).then((res: any) => {
                      if (res.data === -1) {
                        message.error("删除失败！请稍后重试！");
                      } else if (res.data === 1) {
                        message.success("删除成功！");
                        const params = {
                          ...currentFormData.current,
                          offset: 0,
                          limit: 999,
                        }
                        getDevice(params).then((res: any) => {
                          setDataSource(res.data.devices);
                        })
                      }
                    })
                  }}
                >
                  删除
                </Button>
              }
              style={{ width: 350 }}
            >
              <div style={{ display: 'flex', flexDirection: 'row' }} >
                <CloudServerOutlined style={{ fontSize: '34px', marginLeft: '10px' }} />
                <div style={{ marginLeft: '20px' }} >
                  <div>ip地址：{item.ip}</div>
                  <div>端口号：{item.port}</div>
                </div>
              </div>
            </Card>
          ))}
        </Space>
      </div>
      <div
        css={{
          marginTop: "20px",
        }}
      >
        <Card>
          <div css={{
            display: 'flex',
          }} >
            <div
              css={{
                display: 'inline-block',
                width: '100%',
                flex: '1',
                borderRight: '1px #ccc solid'
              }}
            >
              <h3>上传文件</h3>
              <div
                css={{
                  marginTop: "10px",
                }}
              >
                <Upload {...props}>
                  <Button icon={<UploadOutlined />}>上传模板格式文件</Button>
                </Upload>
              </div>
            </div>
            <div css={{ flex: '1', display: 'flex', justifyContent: 'center' }} >
              <div css={{ display: 'flex', flexDirection: 'column' }} >
                <FileExcelTwoTone style={{ fontSize: '42px', margin: '0 auto' }} twoToneColor='rgb(18, 176, 87)' />
                <Button style={{ marginTop: '15px', }} type="primary" icon={<DownloadOutlined />} onClick={() => {
                  getCsv().then((res: any) => {
                    const blob = res.data;
                    const urlObject = window.URL || window.webkitURL || window
                    const export_blob = new Blob(['\ufeff', blob])
                    const a = document.createElement('a') // 利用a标签特性下载
                    a.style.display = 'none';
                    const url = urlObject.createObjectURL(export_blob);
                    a.href = url;
                    a.setAttribute('download', '数据模板.csv')
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    message.success(`成功导出：数据模板.csv文件`);
                  })
                }} >
                  下载模板
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div >
      <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '20px' }} >产业链原始数据</div>
      <Table
        scroll={{
          x: true,
          y: 500,
        }}
        css={{ marginTop: '10px' }}
        dataSource={tableDataSource}
        columns={columns}
        onChange={onChange}
        pagination={{
          total: total,
        }}
      />;
      <AddDeviceModal modalRef={addDeviceModalRef} />
    </Fragment >
  )
}

export default DataManage;