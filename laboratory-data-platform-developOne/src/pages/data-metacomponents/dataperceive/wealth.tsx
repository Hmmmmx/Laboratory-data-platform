/* @jsxImportSource @emotion/react */
import { useState, type FC, type ReactElement, useEffect } from 'react';
import { EChartsOption } from "echarts";
import { Charts } from "../components/Charts";
import { Form, Select, DatePicker } from 'antd';
import NoData from '@/components/NoData/NoData';
import { url } from './getData';
import dayjs from 'dayjs';
import { Pagination } from 'antd';

//Y轴标签名
const Yname = ["总收入", "生产支出", "设备支出", "物料支出", "仓储支出", "运输支出", "人工支出", "研发支出"]

const Wealth: FC = (): ReactElement => {
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
    // console.log(timeArr2)
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
  // 饼状图
  const [fourOpt, setFourOpt] = useState<EChartsOption[]>([])
  useEffect(() => {
    fetch(url + `rest/data/element/wealth/perception/asset/query?time=${timenumber1}&granularity=${granularity[0]}`).then((res) => {
      return res.json()
    }).then(res => {
      console.log(res)
      setCurrentPage1(1)
      const data = res;
      const newData: Array<any> = [];
      let i = 0;
      for (const key in data) {
        const newArr = [
          { value: Math.round(data[key][0].profit / 10000), name: "利润" },
          { value: Math.round(data[key][0].fixedAssets / 10000), name: "固定资产" },
          { value: Math.round(data[key][0].cashAssets / 10000), name: "流动资产" },
          { value: Math.round(data[key][0].finance / 10000), name: "风投融资" },
        ]
        const template = {

          title: {
            text: key,
            left: 'center',
            top: "22",
            textStyle: {
              fontWeight: 400,
              fontSize: 22
            },
          },
          tooltip: {
            trigger: 'item'
          },
          series: [
            {
              startAngle: 60,
              type: 'pie',
              radius: ['30%', '60%'],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
              },
              label: {
                show: true,

                formatter(v: any) {
                  let text = v.name;
                  const value_format = v.value + '万';
                  if (text.length <= 5) {
                    return `${text}\n${value_format}\n`;
                  } else if (text.length > 5 && text.length <= 10) {
                    return text = `${text.slice(0, 5)}\n${text.slice(5)}\n${value_format}\n`
                  } else if (text.length > 10 && text.length <= 15) {
                    return text = `${text.slice(0, 5)}\n${text.slice(5, 10)}\n${text.slice(10)}\n${value_format}\n`
                  } else if (text.length > 15 && text.length <= 20) {
                    return text = `${text.slice(0, 5)}\n${text.slice(5, 10)}\n${text.slice(10, 15)}\n${text.slice(15)}\n${value_format}\n`
                  }
                },
                fontSize: 14,
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: 15,
                  fontWeight: '600'
                }
              },
              labelLine: {
                show: true
              },
              data: newArr,
              center: ["50%", "58%"]
            }
          ],
          avoidLabelOverlap: true
        };
        newData[i] = template
        i++
      }
      setFourOpt(newData);
      setFourOpt2(newData.slice(0, 6));
    })
  }, [timenumber1, first1])
  // 柱状图(横屏)
  const [thrOpt, setThrOpt] = useState<EChartsOption[]>([]);
  useEffect(() => {
    fetch(url + `rest/data/element/wealth/perception/finance/query?time=${timenumber2}&granularity=${granularity[1]}`).then((res) => {
      return res.json()
    }).then(res => {
      setCurrentPage2(1)
      const newData: Array<any> = [];
      const data = res;
      // console.log(res)
      let i = 0;
      for (const key in data) {
        const dataValue = data[key][0];
        const Yvalue = [
          Math.round(dataValue.revenue / 10000),
          Math.round(dataValue.production / 10000),
          Math.round(dataValue.device / 10000),
          Math.round(dataValue.materiel / 10000),
          Math.round(dataValue.storage / 10000),
          Math.round(dataValue.transportation / 10000),
          Math.round(dataValue.salary / 10000),
          Math.round(dataValue.research / 10000)
        ]

        const template = {
          title: {
            text: key,
            left: 'center',
            top: "20",
            textStyle: {
              fontWeight: 400,
              fontSize: 22
            },
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: "3%",
            right: "9%",
            top: "16%",
            bottom: "6%",
            containLabel: true
          },
          xAxis: {
            type: 'log',
            name: '万',
            logBase: 10,
            min: 1,
            axisLabel: {
              fontSize: 13,
              color: '#1c1100',
              margin: 10,
              interval: 0,
            },
            splitLine: {
              lineStyle: {
                width: 2
              },
            }
          },
          yAxis: {
            type: 'category',
            data: Yname,
            axisLabel: {
              fontSize: 14,
              color: '#1c1100',
              textStyle: {
                align: 'right',
              }
            },

          },
          series: [
            {
              // name: '人员数量',
              type: 'bar',
              stack: 'total',
              label: {
                show: true,
                align: 'left',
                // left:100000
              },
              emphasis: {
                focus: 'series'
              },
              data: Yvalue,
              barWidth: '55%',
              barMinHeight: 3,
            }
          ]
        };

        newData[i] = template
        i++
      }
      setThrOpt(newData);
      setThrOpt2(newData.slice(0, 6));

    })
  }, [timenumber2, first2])
  // 分页器
  const [currentPage1, setCurrentPage1] = useState(1);
  const [currentPage2, setCurrentPage2] = useState(1);
  const [thrOpt2, setThrOpt2] = useState<EChartsOption[]>([])
  const [fourOpt2, setFourOpt2] = useState<EChartsOption[]>([])
  const onPaginationChange = (pageNumber: any, pageSize: any, setArrFun: any, Arr: any, setPageFun: any) => {
    console.log('Page: ', pageSize);
    setPageFun(pageNumber)
    setArrFun(Arr.slice((pageNumber - 1) * 6, pageNumber * 6));
  };

  return (
    <>
      <div style={{ padding: "20px 3px 20px 3px", border: "2px solid #d3d3d3" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ color: "#396685", fontSize: "24px", lineHeight: '42px', marginLeft: '40px' }}>企业内部资产分布情况</div>
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
            fourOpt.length == 0 ? <div style={{ width: '100%', height: '300px' }}><NoData /> </div> : (fourOpt2.map((item) => {
              return (
                <div style={{ width: "31%", height: "340px", border: "2px solid #d3d3d3", margin: "15px 1%", borderRadius: "20px", }}>
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
          <Pagination current={currentPage1} total={fourOpt.length} onChange={(e1, e2) => onPaginationChange(e1, e2, setFourOpt2, fourOpt, setCurrentPage1)} pageSize={6} />
        </div>
      </div>
      <div style={{ padding: "20px 3px 20px 3px", marginTop: "40px", border: "2px solid #d3d3d3" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ color: "#396685", fontSize: "24px", lineHeight: '42px', marginLeft: '40px' }}>企业财务分布情况</div>
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
            thrOpt.length == 0 ? <div style={{ width: '100%', height: '300px' }}><NoData /> </div> : (thrOpt2.map((item) => {
              return (
                <div style={{ width: "31%", height: "400px", border: "2px solid #d3d3d3", margin: "15px 1%", borderRadius: "20px", }}>
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
          <Pagination current={currentPage2} total={thrOpt.length} onChange={(e1, e2) => onPaginationChange(e1, e2, setThrOpt2, thrOpt, setCurrentPage2)} pageSize={6} />
        </div>
      </div>
    </>
  )

}


export default Wealth;