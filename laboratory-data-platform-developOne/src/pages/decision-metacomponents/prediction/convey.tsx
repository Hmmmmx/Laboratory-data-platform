/* @jsxImportSource @emotion/react */
import { Button, DatePicker, Form, Select, Table } from 'antd';
import { Fragment, type FC, type ReactElement, useState, useRef, useEffect } from 'react';
import { getConveyPrediction } from './service';
import { transportationModes,transportedGoods } from '@/utils/constant';
import dayjs from 'dayjs';

// 渲染年份选择器
// const generateYears = () => {
//   const currentYear = new Date().getFullYear();
//   const options = [];
//   for (let i = currentYear - 4; i <= currentYear + 4; i++) {
//     const timestamp = new Date(i, 0, 1).getTime() / 1000;
//     options.push({ value: timestamp, label: i });
//   }
//   return options;
// }


// const options = generateYears();

const Convey: FC = (): ReactElement => {
  const granularity = useRef();
  const [dataSource, setDataSource] = useState([]);
  const [form] = Form.useForm();
  const [gran,setGran]=useState<number>(1);
  // const currentTime = Math.floor(new Date("2024-01-01").getTime() / 1000);
  const [now,setNow]=useState(['2024','2024-01-01','2024-01-01']);
  const columns = [
    {
      title: '单位名称',
      dataIndex: 'corporation',
      key: 'corporation',
    },
    {
      title: '时间',
      dataIndex: 'eventTime',
      key: 'eventTime',
      render: (text: number) => {
        const date: string = formatDate(text);
        return <span style={{ color: isFutureTime(text) ? "rgb(64, 149, 229)" : "rgba(0, 0, 0, 0.88)" }}>{date}</span>
      }
    },
    {
      title: '运输工具',
      dataIndex: 'categories',
      key: 'categories',
      render: (text: number, record: any) => {
        const type=transportationModes[text];
        return <span style={{ color: isFutureTime(record.eventTime) ? "rgb(64, 149, 229)" : "rgba(0, 0, 0, 0.88)" }}>{type}</span>
      }
    },
    {
      title: '运输货物',
      dataIndex: 'types',
      key: 'types',
      render: (text: number, record: any) => {
        const type=transportedGoods[text];
        return <span style={{ color: isFutureTime(record.eventTime) ? "rgb(64, 149, 229)" : "rgba(0, 0, 0, 0.88)" }}>{type}</span>
      }
    },
    {
      title: '运输量（万吨）',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (text: number, record: any) => {
        return <span style={{ color: isFutureTime(record.eventTime) ? "rgb(64, 149, 229)" : "rgba(0, 0, 0, 0.88)" }}>{text}</span>
      }
    },
    {
      title: '剩余库存（万吨）',
      dataIndex: 'inventory',
      key: 'inventory',
      render: (text: number, record: any) => {
        return <span style={{ color: isFutureTime(record.eventTime) ? "rgb(64, 149, 229)" : "rgba(0, 0, 0, 0.88)" }}>{text}</span>
      }
    },
    {
      title: '运输里程（公里）',
      dataIndex: 'mileage',
      key: 'mileage',
      render: (text: number, record: any) => {
        return <span style={{ color: isFutureTime(record.eventTime) ? "rgb(64, 149, 229)" : "rgba(0, 0, 0, 0.88)" }}>{text}</span>
      }
    },
    {
      title: '运输花费（万元）',
      dataIndex: 'cost',
      key: 'cost',
      render: (text: number, record: any) => {
        return <span style={{ color: isFutureTime(record.eventTime) ? "rgb(64, 149, 229)" : "rgba(0, 0, 0, 0.88)" }}>{text}</span>
      }
    },
  ];

  // 格式化事件时间戳
  const formatDate = (timestamp: number): string => {
    // console.log(timestamp);
    
    const date = new Date(timestamp * 1000); // 将时间戳转换为Date对象
    const year = date.getFullYear();
    const month: any = (date.getMonth() + 1).toString().padStart(2, '0'); // 月份从0开始，需要加1，并补0
    console.log(year,month,Math.floor((Number(month) - 1) / 3) + 1);
    const day: any = (date.getDate() + 1).toString().padStart(2, '0');
    
    if (gran === 1) {
      return `第${Math.floor((Number(month) - 1) / 3) + 1}季度`;
    } else if (gran === 2) {
      return `${month}月`;
    } else if (gran === 3) {
      return `${month}月${day}日`;
    } else {
      return '无';
    }
  }

  const isFutureTime = (timestamp: number) => {
    const currentTimestamp = Math.floor(Date.now() / 1000); // 当前时间戳（单位：秒）
    return timestamp > currentTimestamp;
  }

  const onFinish = (values: any) => {
    granularity.current = values.granularity;
    // console.log('values1111',values);
    // console.log(now);
    let time=null;
    // if(gran==2||gran==3){
      time=new Date(now[gran-1]).getTime()/1000;
      console.log(12121212,time);
    // }
    
    const params = {
      // ...values,
      time,
      granularity:gran,
      offset: 0,
      limit: 999,
    }
    getConveyPrediction(params as any).then((res: any) => {
      // console.log(res.data.convey, "res.data.convey");
      
      setDataSource(res.data.convey);
    })
  }

  //改变changeGranularity
  const changeGranularity=(i:any)=>{
    // console.log(i,"qwqw");
    setGran(i);
  }

  //选择时间
  const selectTime=(e1:any,e2:any)=>{
    console.log(e1,e2);
    if(gran==1){
      const newNow=[
        ...now
      ]
      newNow[0]=e2;
      setNow(newNow)
    }else if(gran==2){
      if(e2.substring(6,7)==1){
        const newNow=[
          ...now
        ]
        // newNow[0]=e2.substring(0,4);
        newNow[1]=e2.substring(0,4)+'-'+'03-01';
        setNow(newNow)
      }else if(e2.substring(6,7)==2){
        const newNow=[
          ...now
        ]
        // newNow[0]=e2.substring(0,4);
        newNow[1]=e2.substring(0,4)+'-'+'06-01';
        setNow(newNow)
      }else if(e2.substring(6,7)==3){
        const newNow=[
          ...now
        ]
        // newNow[0]=e2.substring(0,4);
        newNow[1]=e2.substring(0,4)+'-'+'09-01';
        setNow(newNow)
      }else if(e2.substring(6,7)==4){
        const newNow=[
          ...now
        ]
        // newNow[0]=e2.substring(0,4);
        newNow[1]=e2.substring(0,4)+'-'+'12-01';
        setNow(newNow)
      }
      
    }else if(gran==3){
      const newNow=[
        ...now
      ]
      // newNow[0]=e2.substring(0,4);
      newNow[2]=e2+'-01';
      // console.log(newNow[2]);
      setNow(newNow)
    }
  }

  useEffect(() =>{
    // if(form.getFieldValue('granularity') === undefined)
    //     form.setFieldsValue({ granularity: 1 })
    // if(form.getFieldValue('time') === undefined)
    //   form.setFieldsValue({ time: 1577808000 })
  },[])

  //日期选择器
const DatePickerCon=({type}:any)=>{
  const pickText=['year','quarter','month'];
  // console.log(now[type - 1].substring(5,6));
  
  
  return (<>
  <DatePicker picker={pickText[type-1] as any} onChange={selectTime}
    defaultValue={
      now[type - 1].substring(5, 6) == 'Q' ?
      (now[type - 1].substring(6, 7) == '4' ?
        dayjs(now[type - 1].replace("Q4", "12")) :
        (now[type - 1].substring(6, 7) == '3' ?
          dayjs(now[type - 1].replace("Q3", "09")) :
          (now[type - 1].substring(6, 7) == '2' ?
            dayjs(now[type - 1].replace("Q2", "06")) :
            dayjs(now[type - 1].replace("Q1", "03")))))
      : (now[type - 1] == '' ? undefined : dayjs(now[type - 1]))} />
  </>)
}

  return (
    <Fragment>
      <div
        css={{
          position: 'relative'
        }}
      >
        <div
          css={{
            display: 'inline-block',
            position: 'absolute',
            padding: '0 20px',
            left: '0',
            border: '1px solid #d4d4d4',
            fontSize: '16px',
            lineHeight: '36px',
            color: '#1677ff',
          }}
        >
          物流链预测情况
        </div>
        <div
          css={{
            display: 'inline-block',
            position: 'absolute',
            lineHeight: '36px',
            right: '0',
          }}
        >
          <span>请选择要查询的周期与年份：</span>
          <Form
            layout="inline"
            // initialValues={{ granularity: 1, time: 1690946777 }}
            onFinish={onFinish}
            form={form}
            css={{
              display: 'inline-flex'
            }}
          >
            <Form.Item>
              <Select
                defaultValue={gran}
                onChange={changeGranularity}
                css={{
                  width: '70px !important',
                }}
              >
                <Select.Option value={1}>年</Select.Option>
                <Select.Option value={2}>季度</Select.Option>
                <Select.Option value={3}>月</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item>
              {/* <Select
                css={{
                  width: '80px !important',
                }}
                options={options}
              >
              </Select> */}
              <DatePickerCon type={gran}/>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div
        css={{
          textAlign: 'right',
          position: 'relative',
          top: '50px',
        }}
      >
        <span
          css={{
            marginRight: '320px'
          }}
        >
          ■当前值
        </span>
        <span css={{
          color: 'rgb(64, 149, 229)',
        }}
        >
          ■下一阶段预测值
        </span>
      </div>
      <div
        css={{
          position: 'relative',
          top: '65px',
        }}
      >
        <Table
          dataSource={dataSource}
          columns={columns}
          rowKey="id"
        />
      </div>
    </Fragment>
  )
}

export default Convey;