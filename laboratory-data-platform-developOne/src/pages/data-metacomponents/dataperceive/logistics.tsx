/* @jsxImportSource @emotion/react */
import { useState, type FC, type ReactElement, useEffect } from 'react';
import { EChartsOption } from "echarts";
import { Charts } from "../components/Charts";
import { Form, Select, DatePicker } from 'antd';
import NoData from '@/components/NoData/NoData';
import { url } from './getData';
import dayjs from 'dayjs';
import { transportationModes, transportedGoods } from '@/utils/constant';
import { Pagination } from 'antd';
// import type { PaginationProps } from 'antd';


const Logistics: FC = (): ReactElement => {
  // 时间选择器
  const { Option } = Select;
  const [type1, setType1] = useState('year');
  const [type2, setType2] = useState('year');
  const currentTime = Math.floor(new Date("2022-01-01").getTime() / 1000);
  // let timeArr = ['2022',"2023-01-01","2023-01-01","2023-01-01","2023-01-01"];
  const [timenumber1, setTimenumber1] = useState(currentTime);
  const [timenumber2, setTimenumber2] = useState(currentTime);
  const [timeArr, setTimeArr] = useState(["2022-01-01", "2022-01-01"]);
  let granularity = [1, 1];
  // let yearSelect = 2022;
  const upData = (_value: any, valueString: any, e: any, timenumberFun: any) => {
    let timenumberArr: any;
    const timeArr2 = ["2022-01-01", "2022-01-01"];
    timeArr2[e - 1] = valueString;
    setTimeArr(timeArr2);
    if (valueString.length == 4) {
      timenumberArr = Math.floor(new Date(valueString + '-01-01').getTime() / 1000);
      timenumberFun(timenumberArr);
    } else if (valueString.length == 7 && valueString.substring(5, 6) != 'Q') {
      timenumberArr = Math.floor(new Date(valueString + '-02').getTime() / 1000);
      timenumberFun(timenumberArr);
    } else if (valueString.length == 7 && valueString.substring(5, 6) == 'Q') {
      if (valueString.substring(5, 7) == 'Q1') {
        // console.log(valueString.substring(0, 4) + '-03-01')
        timenumberArr = Math.floor(new Date(valueString.substring(0, 4) + '-03-01').getTime() / 1000);
        timenumberFun(timenumberArr);
      } else if (valueString.substring(5, 7) == 'Q2') {
        timenumberArr = Math.floor(new Date(valueString.substring(0, 4) + '-06-01').getTime() / 1000);
        timenumberFun(timenumberArr);
      } else if (valueString.substring(5, 7) == 'Q3') {
        timenumberArr = Math.floor(new Date(valueString.substring(0, 4) + '-09-01').getTime() / 1000);
        timenumberFun(timenumberArr);
      } else if (valueString.substring(5, 7) == 'Q4') {
        timenumberArr = Math.floor(new Date(valueString.substring(0, 4) + '-12-01').getTime() / 1000);
        timenumberFun(timenumberArr);
      }
    }
  };

  const [first1, setFirst1] = useState(0);
  const [first2, setFirst2] = useState(0);
  const PickerWithType = ({ type, typeNumber, timenumberFun, firstFun }: any) => {
    if (type == 'year') {
      granularity[typeNumber - 1] = 1;
      firstFun(1)
      // setCurrentPage(1)
    } else if (type == 'month') {
      granularity[typeNumber - 1] = 3;
      firstFun(2)
      // setCurrentPage(1)
    } else if (type == 'quarter') {
      granularity[typeNumber - 1] = 2;
      firstFun(3)
      // setCurrentPage(1)
    }
    return <DatePicker size='large' picker={type} onChange={(e1, e2) => upData(e1, e2, typeNumber, timenumberFun)}
      defaultValue={
        timeArr[typeNumber - 1].substring(5, 6) == 'Q' ?
          (timeArr[typeNumber - 1].substring(6, 7) == '4' ?
            dayjs(timeArr[typeNumber - 1].replace("Q4", "12")) :
            (timeArr[typeNumber - 1].substring(6, 7) == '3' ?
              dayjs(timeArr[typeNumber - 1].replace("Q3", "09")) :
              (timeArr[typeNumber - 1].substring(6, 7) == '2' ?
                dayjs(timeArr[typeNumber - 1].replace("Q2", "06")) :
                dayjs(timeArr[typeNumber - 1].replace("Q1", "03")))))
          : (timeArr[typeNumber - 1] == '' ? undefined : dayjs(timeArr[typeNumber - 1]))} />;
  };
  // 柱状图(竖屏)
  const [firOpt, setFirOpt] = useState<EChartsOption[]>([])
  useEffect(() => {
    fetch(url + `rest/data/element/convey/perception/traffic/query?time=${timenumber1}&granularity=${granularity[0]}`).then((res) => {
      return res.json()
    }).then(res => {
      console.log(granularity)
      // console.log(res)
      setCurrentPage1(1)
      const Xname: any = []//第一个图表的X轴标签
      for (const key in transportationModes) {
        Xname.push(transportationModes[key])
      }
      const data = res;
      const newData = data.map((item: any) => {
        const maxLeft = Math.ceil(Math.max(...item.mileages) / 1000000) * 100 === 0 ? 100 : Math.ceil(Math.max(...item.mileages) / 1000000) * 100;
        const maxRight = Math.ceil(Math.max(...item.cost) / 1000000) * 100 === 0 ? 100 : Math.ceil(Math.max(...item.cost) / 1000000) * 100;

        const template = {
          title: {
            text: item.corporation,
            left: 'center',
            top: "20",
            textStyle: {
              fontWeight: 400,
              fontSize: 20
            }
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999'
              }
            }
          },
          legend: {
            data: ['运输里程(万公里)', '费用(万元)'],
            top: "16%",
            textStyle: {
              fontSize: 15
            }
          },
          grid: {
            left: "5%",
            right: "5%",
            top: "30%",
            bottom: "5%",
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: Xname,
              axisPointer: {
                type: 'shadow'
              },
              boundaryGap: true,
              axisLabel: {
                fontSize: 17,
                color: '#1c1100',
                margin: 16
              },

            }
          ],
          yAxis: [
            {
              type: 'value',
              // name: '运输里程(万公里)',
              max: maxLeft,
              min: 0,
              splitNumber: 5,
              minInterval: 1,
              interval: maxLeft / 5,
              axisLabel: {
                fontSize: 17,
                color: '#1c1100'
              },
              splitLine: {
                lineStyle: {
                  width: 2
                }
              }
            },
            {
              type: 'value',
              min: 0,
              max: maxRight,
              interval: maxRight / 5,
              splitNumber: 5,
              minInterval: 1,
              axisLabel: {
                fontSize: 17,
                color: '#1c1100'
              },
            }
          ],

          series: [
            {
              name: '运输里程(万公里)',
              type: 'bar',
              data: item.mileages.map((item: any) => Math.round(item / 10000)),
              barWidth: '35%',
            },
            {
              name: '费用(万元)',
              type: 'line',
              yAxisIndex: 1,
              data: item.cost.map((item: any) => Math.round(item / 10000)),

            },

          ]
        }
        return template;
      })
      setFirOpt(newData);
      setFirOpt2(newData.slice(0, 6));
    })
  }, [timenumber1, first1])

  // 柱状图(横屏)
  const [secOpt, setSecOpt] = useState<EChartsOption[]>([])
  useEffect(() => {
    fetch(url + `rest/data/element/convey/perception/inventory/query?time=${timenumber2}&granularity=${granularity[1]}`).then((res) => {
      return res.json()
    }).then(res => {
      console.log(granularity)
      setCurrentPage2(1)
      const data = res;
      const newData = data.map((item: {
        corporation: any;
        quantity: any;
        inventory: any;
        types: any;
      }) => {
        const Yname = item.types.map((item: any) => {
          for (const key in transportedGoods) {
            item = item == key ? transportedGoods[key] : item
            if (item == transportedGoods[key]) {
              break;
            }
          }
          return item;
        })
        const template = {
          title: {
            text: item.corporation,
            left: 'center',
            top: "20",
            textStyle: {
              fontWeight: 400,
              fontSize: 20
            },
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            top: "16%",
            textStyle: {
              fontSize: 15
            }
          },
          grid: {
            left: "3%",
            right: "10%",
            top: "30%",
            bottom: "5%",
            containLabel: true
          },
          xAxis: {
            type: 'log',
            min: 1,
            axisLabel: {
              fontSize: 14,
              color: '#1c1100',
              margin: 10
            },
            splitLine: {
              lineStyle: {
                width: 2
              }
            }
          },
          yAxis: {
            type: 'category',
            data: Yname,
            axisLabel: {
              fontSize: 14,
              color: '#1c1100'
            },

          },
          series: [
            {
              name: '运输量',
              type: 'bar',
              stack: 'total',
              label: {
                show: true,
                fonntSize: 11
              },
              barMinHeight: 3,
              emphasis: {
                focus: 'series'
              },
              data: item.quantity
            },
            {
              name: '库存',
              type: 'bar',
              stack: 'total',
              label: {
                show: true,
                fonntSize: 11
              },
              barMinHeight: 3,
              emphasis: {
                focus: 'series'
              },
              data: item.inventory
            },
          ]
        };
        return template;
      })
      setSecOpt(newData);
      setSecOpt2(newData.slice(0, 6));
    })
  }, [timenumber2, first2])
  // 分页器
  const [currentPage1, setCurrentPage1] = useState(1);
  const [currentPage2, setCurrentPage2] = useState(1);

  const [firOpt2, setFirOpt2] = useState<EChartsOption[]>([])
  const [secOpt2, setSecOpt2] = useState<EChartsOption[]>([])
  const onPaginationChange = (pageNumber: any, pageSize: any, setArrFun: any, Arr: any, setPageFun: any) => {
    console.log('Page: ', pageSize);
    setPageFun(pageNumber)
    setArrFun(Arr.slice((pageNumber - 1) * 6, pageNumber * 6));
  };
  return (
    <>
      <div style={{ padding: "20px 3px 20px 3px", border: "2px solid #d3d3d3" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ color: "#396685", fontSize: "24px", lineHeight: '42px', marginLeft: '40px' }}>企业运输量及费用分布</div>
          <Form
            layout="inline"
            css={{
              display: 'inline-flex'
            }}
          >
            <PickerWithType type={type1} onChange={PickerWithType} typeNumber={1} timenumberFun={setTimenumber1} firstFun={setFirst1} />
            <Select size='large' value={type1} onChange={setType1} style={{ width: "80px", margin: "0 40px 0 15px " }}>
              <Option value="year">年</Option>
              <Option value="quarter">季度</Option>
              <Option value="month">月</Option>
            </Select>
          </Form>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "start", }}>
          {
            firOpt.length == 0 ? <div style={{ width: '100%', height: '300px' }}><NoData /> </div> : (firOpt2.map((item) => {
              return (
                <div style={{ width: "31%", height: "350px", border: "2px solid #d3d3d3", margin: "15px 1%", borderRadius: "20px", }}>
                  <Charts
                    options={item}
                    style={{
                      height: "100%",
                      width: "100%",
                    }}
                  />
                </div>)
            })
            )
          }
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Pagination current={currentPage1} total={firOpt.length} onChange={(e1, e2) => onPaginationChange(e1, e2, setFirOpt2, firOpt, setCurrentPage1)} pageSize={6} />
        </div>
      </div>
      <div style={{ padding: "20px 3px 20px 3px", marginTop: "40px", border: "2px solid #d3d3d3" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ color: "#396685", fontSize: "24px", lineHeight: '42px', marginLeft: '40px' }}>企业运输货物及对应库存分布</div>
          <Form
            layout="inline"
            css={{
              display: 'inline-flex'
            }}
          >
            <PickerWithType type={type2} onChange={PickerWithType} typeNumber={2} timenumberFun={setTimenumber2} firstFun={setFirst2} />
            <Select size='large' value={type2} onChange={setType2} style={{ width: "80px", margin: "0 40px 0 15px " }}>
              <Option value="year">年</Option>
              <Option value="quarter">季度</Option>
              <Option value="month">月</Option>
            </Select>
          </Form>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "start", }}>
          {
            secOpt.length == 0 ? <div style={{ width: '100%', height: '300px' }}><NoData /> </div> : (secOpt2.map((item: any) => {
              return (
                <div style={{ width: "31%", height: "380px", border: "2px solid #d3d3d3", margin: "15px 1%", borderRadius: "20px", }}>
                  <Charts
                    options={item}
                    style={{
                      height: "100%",
                      width: "100%",
                    }}
                  />
                </div>)
            })
            )
          }
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Pagination current={currentPage2} total={secOpt.length} onChange={(e1, e2) => onPaginationChange(e1, e2, setSecOpt2, secOpt, setCurrentPage2)} pageSize={6} />
        </div>
      </div>
    </>
  )
}

export default Logistics;