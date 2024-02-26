/* eslint-disable no-case-declarations */
/* @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { Form, Select, InputNumber, Button,DatePicker } from 'antd';
import { firstLevelMenuEnum, earlyWarningStaffTFR, earlyWarningWealthTFR, earlyWarningConveyTFR, earlyWarningProductionTFR, earlyWarningSaleTFR } from '@/utils/constant';
import { useAppDispatch } from '@/stores/hooks';
import { update, getEarlyWaring, getEarlyWaringOptionOnRedux, getEarlyWaringReturnOnRedux } from '../service';
import type { ReactElement } from "react";
import dayjs from 'dayjs';

const Operation = (props: { firstLevelPathKey: string }): ReactElement => {
  const { firstLevelPathKey } = props;
  const firstLevelPaths = Object.keys(firstLevelMenuEnum);
  enum categoriesEnum {
    'staff' = 1,
    'wealth' = 2,
    'convey' = 3,
    'production' = 4,
    'sale' = 5,
  }

  // 保存在redux的选择的预警数据以及其更新方法
  const { earlyWarningOption, updateOptionData } = getEarlyWaringOptionOnRedux(firstLevelPathKey);
  // 保存在redux的返回的预警数据以及其更新方法
  const { earlyWarningReturn, updateReturnData } = getEarlyWaringReturnOnRedux(firstLevelPathKey);

  const dispath = useAppDispatch();
  const [companyOptions, setCompanyOptions] = useState<{ value: string, label: string }[]>();  // 可选公司选项
  const [form] = Form.useForm();  // 表单实例
  const [gran,setGran]=useState<number>(1);
  const [now,setNow]=useState(['2024','2024-01-01','2024-01-01']);
  const text=['年','季度','月'];

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

  // // 年份选项
  // const yearsOptions = generateYears();

  /**
   * 获取预警页各链阈值波动范围选项
   * @param firstLevelPathKey 当前一级路由路径
   * @returns 预警页各链阈值波动范围选项
   */
  const getTFR = (firstLevelPathKey: string): { value: string, label: string }[] => {
    switch (firstLevelPathKey) {
      case firstLevelPaths[0]:
        // 预警页人力链阈值波动范围选项
        return Object.keys(earlyWarningStaffTFR).map(option => ({
          value: option,
          label: option,
        }));

      case firstLevelPaths[1]:
        // 预警页资金链阈值波动范围选项
        return Object.keys(earlyWarningWealthTFR).map(option => ({
          value: option,
          label: option,
        }));

      case firstLevelPaths[2]:
        // 预警页物流链阈值波动范围选项
        const as1=Object.keys(earlyWarningConveyTFR).map((item:any)=>{
          if(item==="运输费用1")
            return "运输费用"
          return item;
         })
        return as1.map(option => ({
          value: option,
          label: option,
        }));

      case firstLevelPaths[3]:
       const as=Object.keys(earlyWarningProductionTFR).map((item:any)=>{
        if(item==="生产费用1")
          return "生产费用"
        return item;
       })
      //  console.log(121111111,as);
        
        // 预警页生产链阈值波动范围选项
        return as.map((option:any) => ({
          value: option,
          label: option,
        }));

      case firstLevelPaths[4]:
        // 预警页销售链阈值波动范围选项
        return Object.keys(earlyWarningSaleTFR).map(option => ({
          value: option,
          label: option,
        }));

      default:
        return [{ value: '', label: '' }]
    }
  }

  // 选择紧急程度变化的回调
  const onAlarmTypeChange = (alarmType: string) => {
    // 更新紧急程度并保存到redux
    const newEarlyWarningOption = {
      ...earlyWarningOption,
      alarmType,
    }
    dispath(updateOptionData(newEarlyWarningOption))
  }

  // 选择公司变化的回调
  const onCompanyChange = (company: string) => {
    // 更新选择的公司并保存到redux
    const newEarlyWarningOption = {
      ...earlyWarningOption,
      company,
    }
    dispath(updateOptionData(newEarlyWarningOption))
  }

  /**
   * 更新可选公司选项
   * @param returnData 请求返回的预警数据
   */
  const updateCompanyOption = (returnData: object) => {
    const companyOptions = Object.keys(returnData).map(option => ({
      value: option,
      label: option,
    }));
    setCompanyOptions(companyOptions);
  }

  // 阈值波动范围Select的输入搜索
  const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  /**
   * 请求预警数据
   * @param requestParams 请求参数
   */
  const requestEarlyWaring = (requestParams: {
    attributes: string,
    attributesValue: number,
    categories: number,
    granularity: string,
    time: number,
  }) => {
    const { attributes, attributesValue, categories, granularity, time, } = requestParams;
    // 1. 让后台更新数据
    update([{
      attributes,
      attributesValue,
      categories,
    }])

    // 2. 获取预警数据
    getEarlyWaring(firstLevelPathKey, { attributes, categories, granularity, time }).then((res: any) => {
      const returnData = res.data;

      // 更新可选公司选项
      updateCompanyOption(returnData);

      if(!form.getFieldValue('company')){
        form.setFieldValue('company',Object.keys(returnData)[0]);
      }
      if(!form.getFieldValue('attributes')){
        form.setFieldValue('attributes', getTFR(firstLevelPathKey)[0].label);
      }

      // 根据选择将预警数据保存到redux
      dispath(updateReturnData(returnData));
    });
  }

  /**
   * 点击生成预警按钮提交表单
   * @param value 表单数据
   */
  const onFinish = (value: any) => {

    if(firstLevelPathKey === 'production'&&value.attributes==='生产费用'){
      value.attributes="生产费用1"
    }
    if(firstLevelPathKey === 'convey'&&value.attributes==='运输费用'){
      value.attributes="运输费用1"
    }
    // 将选择的预警数据保存到redux
    const optionData = {
      ...value,
      granularity: gran,
      time:new Date(now[gran-1]).getTime()/1000,
      categories: categoriesEnum[firstLevelPathKey as keyof typeof categoriesEnum],
    }
    dispath(updateOptionData(optionData));

    // console.log("first",firstLevelPathKey, value);
    

    // 请求参数
    const requestParams = {
      attributes: value.attributes,
      attributesValue: value.attributesValue,
      categories: categoriesEnum[firstLevelPathKey as keyof typeof categoriesEnum],
      granularity: gran.toString(),
      time: new Date(now[gran-1]).getTime()/1000,
    }
    // 请求预警数据
    requestEarlyWaring(requestParams);
  }

  useEffect(() => {
    // 拿到redux的缓存
    if (earlyWarningOption === undefined) {
      // 初始化
      const requestParams = {
        attributes: getTFR(firstLevelPathKey)[0].label,
        attributesValue: 100,
        categories: categoriesEnum[firstLevelPathKey as keyof typeof categoriesEnum],
        granularity: '1',
        time: new Date(now[gran-1]).getTime()/1000,
      };  // 请求参数
      requestEarlyWaring(requestParams);  // 请求预警数据
      form.resetFields();  // 如果缓存为空，则清空表单数据，防止xx链的选项展示在yy链上
    } else {
      if (earlyWarningReturn !== undefined) {
        // 更新可选公司选项
        updateCompanyOption(earlyWarningReturn);
      }
      form.setFieldsValue(earlyWarningOption);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstLevelPathKey])

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
    <Form
      form={form}
      onFinish={onFinish}
    >
      <div
        css={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          marginTop: '10px',
        }}
      >
        <div>
          请选择要查询的周期于年份：
          <Form.Item
            initialValue='1'
            css={{
              display: 'inline-block',
              margin: 0,
              marginRight: '5px',
              width: '100px',
            }}
          >
            <Select
            defaultValue={text[gran-1]}
            onChange={changeGranularity}
              options={[
                {
                  value: '1',
                  label: '年',
                },
                {
                  value: '2',
                  label: '季度',
                },
                {
                  value: '3',
                  label: '月',
                },
              ]}
            />
          </Form.Item>
          <Form.Item
          css={{
            display: 'inline-block',
            margin: 0,
            marginRight: '5px',
          }}
          >
            <DatePickerCon type={gran}/>
          </Form.Item>
        </div>
        <div>
          请选择或搜索预警阈值波动范围：
          <Form.Item
            name='attributes'
            css={{
              display: 'inline-block',
              margin: 0,
              width: '100px',
            }}
          >
            <Select
              showSearch
              optionFilterProp="children"
              filterOption={filterOption}
              options={getTFR(firstLevelPathKey)}
            />
          </Form.Item>
        </div>
        <div>
          请输入阈值：
          <Form.Item
            name='attributesValue'
            initialValue={100}
            css={{
              display: 'inline-block',
              margin: 0,
              width: '100px',
            }}
          >
            <InputNumber />
          </Form.Item>
        </div>
        <div>
          <Form.Item>
            <Button type='primary' htmlType='submit'>
              生成预警
            </Button>
          </Form.Item>
        </div>
      </div>
      <div
        css={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          margin: '10px 0',
        }}
      >
        <>
          <div>
            请选择公司：
            <Form.Item
              name='company'
              css={{
                display: 'inline-block',
                margin: 0,
                width: '100px',
              }}
            >
              <Select
                value={earlyWarningOption?.company}
                options={companyOptions}
                onChange={company => { onCompanyChange(company) }}
              />
            </Form.Item>
          </div>
          <div>
            高/低于预警：
            <Form.Item
              name='alarmType'
              initialValue={2}
              css={{
                display: 'inline-block',
                margin: 0,
                width: '100px',
              }}
            >
              <Select
                options={[
                  {
                    value: 2,
                    label: '全部',
                  },
                  {
                    value: 1,
                    label: '高于预警',
                  },
                  {
                    value: 0,
                    label: '低于预警',
                  },
                ]}
                onChange={alarmType => { onAlarmTypeChange(alarmType) }}
              />
            </Form.Item>
          </div>
        </>
      </div>
    </Form>
  )
}

export default Operation;