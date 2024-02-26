/* @jsxImportSource @emotion/react */
import { useState, type FC, type ReactElement, useEffect, } from 'react';
import { EChartsOption } from "echarts";
import { Charts } from "../components/Charts";
import { Form, Select, DatePicker } from 'antd';
import { url } from './getData';
import NoData from '@/components/NoData/NoData';
import dayjs from 'dayjs';
import { employeePositions } from '@/utils/constant';
import { Pagination } from 'antd';

const ManPower: FC = (): ReactElement => {
  // 时间选择器
  const { Option } = Select;
  const [type1, setType1] = useState('year');
  const [type2, setType2] = useState('year');
  const [type3, setType3] = useState('year');
  const currentTime = Math.floor(new Date("2022-01-01").getTime() / 1000);
  // let timeArr = ['2022',"2023-01-01","2023-01-01","2023-01-01","2023-01-01"];
  const [timenumber1, setTimenumber1] = useState(currentTime);
  const [timenumber2, setTimenumber2] = useState(currentTime);
  const [timenumber3, setTimenumber3] = useState(currentTime);
  const [timeArr, setTimeArr] = useState(["2022-01-01", "2022-01-01", "2022-01-01"]);
  let granularity = [1,1,1];
  const [first1, setFirst1] = useState(0);
  const [first2, setFirst2] = useState(0);
  const [first3, setFirst3] = useState(0);
  // let yearSelect = 2022;
  const upData = (_value: any, valueString: any, e: any, timenumberFun: any) => {
    console.log(timenumber1)
    let timenumberArr: any;
    const timeArr2 = ["2022-01-01", "2022-01-01", "2022-01-01"];
    timeArr2[e - 1] = valueString;
    setTimeArr(timeArr2);
    // console.log(timeArr2)
    if (valueString.length == 4) {
      timenumberArr = Math.floor(new Date(valueString + '-12-01').getTime() / 1000);
      timenumberFun(timenumberArr);
    } else if (valueString.length == 7 && valueString.substring(5, 6) != 'Q') {
      timenumberArr = Math.floor(new Date(valueString + '-29').getTime() / 1000);
      timenumberFun(timenumberArr);
    } else if (valueString.length == 7 && valueString.substring(5, 6) == 'Q') {
      if (valueString.substring(5, 7) == 'Q1') {
        // console.log(valueString.substring(0, 4) + '-03-01')
        timenumberArr = Math.floor(new Date(valueString.substring(0, 4) + '-03-30').getTime() / 1000);
        timenumberFun(timenumberArr);
      } else if (valueString.substring(5, 7) == 'Q2') {
        timenumberArr = Math.floor(new Date(valueString.substring(0, 4) + '-06-30').getTime() / 1000);
        timenumberFun(timenumberArr);
      } else if (valueString.substring(5, 7) == 'Q3') {
        timenumberArr = Math.floor(new Date(valueString.substring(0, 4) + '-09-30').getTime() / 1000);
        timenumberFun(timenumberArr);
      } else if (valueString.substring(5, 7) == 'Q4') {
        timenumberArr = Math.floor(new Date(valueString.substring(0, 4) + '-12-30').getTime() / 1000);
        timenumberFun(timenumberArr);
      }
    }
  };

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
  // 柱状图(横屏)
  const [thrOpt, setThrOpt] = useState<EChartsOption[]>([]);
  useEffect(() => {
    fetch(url + `rest/data/element/staff/perception/person/query?time=${timenumber1}&granularity=${granularity[0]}`).then((res) => {
      return res.json()
    }).then(res => {
      setCurrentPage1(1)
      // console.log(res)
      const newData: Array<any> = [];
      const data = res;
      let i = 0;
      for (const key in data) {

        const Yname = data[key].map((item: any) => {
          return item.categories == 1 ? '自有人员' : '合作方人员'
        })
        const Yvalue = data[key].map((item: any) => {
          return item.amount
        })
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
          legend: {
            top: "17%",
            textStyle: {
              fontSize: 16
            }
          },
          grid: {
            left: "3%",
            right: "10%",
            top: "28%",
            bottom: "6%",
            containLabel: true
          },
          xAxis: {
            type: 'value',
            axisLabel: {
              fontSize: 15,
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
              fontSize: 15,
              color: '#1c1100'
            },

          },
          series: [
            {
              name: '人员数量',
              type: 'bar',
              stack: 'total',
              label: {
                show: true
              },
              emphasis: {
                focus: 'series'
              },
              data: Yvalue,
              barWidth: '55%',
            }
          ]
        };

        newData[i] = template
        i++
      }
      setThrOpt(newData);
      setThrOpt2(newData.slice(0, 6));

    })
  }, [timenumber1, first1])
  // 饼状图(1)
  const [fourOpt, setFourOpt] = useState<EChartsOption[]>([])
  useEffect(() => {
    fetch(url + `rest/data/element/staff/perception/position/query?time=${timenumber2}&granularity=${granularity[1]}`).then((res) => {

      return res.json()

    }).then(res => {
      setCurrentPage2(1)
      // console.log(res)
      const data = res;
      const newData: Array<any> = [];
      let i = 0;
      for (const key in data) {
        const newArr = data[key].map((item: any) => {
          for (const key in employeePositions) {
            // console.log(employeePositions[key])
            item.positions = item.positions == key ? employeePositions[key] : item.positions
            if (item.positions == employeePositions[key]) {
              break;
            }
          }
          return ({ value: item.amount, name: item.positions })
        })
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
              type: 'pie',
              radius: ['30%', '55%'],
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
                  const value_format = v.value + '名';
                  if (text.length <= 4) {
                    return `${text}\n${value_format}\n`;
                  } else if (text.length > 4 && text.length <= 8) {
                    return text = `${text.slice(0, 4)}\n${text.slice(4)}\n${value_format}\n`
                  } else if (text.length > 8 && text.length <= 12) {
                    return text = `${text.slice(0, 4)}\n${text.slice(4, 8)}\n${text.slice(8)}\n${value_format}\n`
                  } else if (text.length > 12 && text.length <= 16) {
                    return text = `${text.slice(0, 4)}\n${text.slice(4, 8)}\n${text.slice(8, 12)}\n${text.slice(12)}\n${value_format}\n`
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
              center: ["51%", "58%"]
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
  }, [timenumber2, first2])
  // 饼状图(2)
  const [fiveOpt, setFiveOpt] = useState<EChartsOption[]>([])
  useEffect(() => {
    fetch(url + `rest/data/element/staff/perception/skill/query?time=${timenumber3}&granularity=${granularity[2]}`).then((res) => {
      return res.json()
    }).then(res => {
      console.log(res)
      setCurrentPage3(1)
      const data = res;
      const newData: Array<any> = [];
      let i = 0;
      for (const key in data) {
        const newArr = data[key].map((item: any) => {
          return ({ value: item.amount, name: item.skill })
        })
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
              type: 'pie',
              radius: ['30%', '55%'],
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
                  const value_format = v.value + '名';
                  if (text.length <= 4) {
                    return `${text}\n${value_format}\n`;
                  } else if (text.length > 4 && text.length <= 8) {
                    return text = `${text.slice(0, 4)}\n${text.slice(4)}\n${value_format}\n`
                  } else if (text.length > 8 && text.length <= 12) {
                    return text = `${text.slice(0, 4)}\n${text.slice(4, 8)}\n${text.slice(8)}\n${value_format}\n`
                  } else if (text.length > 12 && text.length <= 16) {
                    return text = `${text.slice(0, 4)}\n${text.slice(4, 8)}\n${text.slice(8, 12)}\n${text.slice(12)}\n${value_format}\n`
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
      setFiveOpt(newData);
      setFiveOpt2(newData.slice(0, 6));
    })
  }, [timenumber3, first3])
  // 分页器
  const [currentPage1, setCurrentPage1] = useState(1);
  const [currentPage2, setCurrentPage2] = useState(1);
  const [currentPage3, setCurrentPage3] = useState(1);
  const [thrOpt2, setThrOpt2] = useState<EChartsOption[]>([])
  const [fourOpt2, setFourOpt2] = useState<EChartsOption[]>([])
  const [fiveOpt2, setFiveOpt2] = useState<EChartsOption[]>([])
  const onPaginationChange = (pageNumber: any, pageSize: any, setArrFun: any, Arr: any, setPageFun: any) => {
    console.log('Page: ', pageSize);
    setPageFun(pageNumber)
    setArrFun(Arr.slice((pageNumber - 1) * 6, pageNumber * 6));
  };
  return (
    <>
      <div style={{ padding: "20px 3px 20px 3px", border: "2px solid #d3d3d3" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ color: "#396685", fontSize: "24px", lineHeight: '42px', marginLeft: '40px' }}>企业自有人员、合作方人员个数</div>
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
            thrOpt.length == 0 ? <div style={{ width: '100%', height: '300px' }}><NoData /> </div> : (thrOpt2.map((item) => {
              return (
                <div style={{ width: "31%", height: "300px", border: "2px solid #d3d3d3", margin: "15px 1%", borderRadius: "20px", }}>
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
          <Pagination current={currentPage1} total={thrOpt.length} onChange={(e1, e2) => onPaginationChange(e1, e2, setThrOpt2, thrOpt, setCurrentPage1)} pageSize={6} />
        </div>
      </div>
      <div style={{ padding: "20px 3px 20px 3px", marginTop: "40px", border: "2px solid #d3d3d3" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ color: "#396685", fontSize: "24px", lineHeight: '42px', marginLeft: '40px' }}>企业人员职位分布</div>
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
            fourOpt.length == 0 ? <div style={{ width: '100%', height: '300px' }}><NoData /> </div> : (fourOpt2.map((item) => {
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
          <Pagination current={currentPage2} total={fourOpt.length} onChange={(e1, e2) => onPaginationChange(e1, e2, setFourOpt2, fourOpt, setCurrentPage2)} pageSize={6} />
        </div>
      </div>
      <div style={{ padding: "20px 3px 20px 3px", marginTop: "40px", border: "2px solid #d3d3d3" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ color: "#396685", fontSize: "24px", lineHeight: '42px', marginLeft: '40px' }}>企业人员技能分布</div>
          <Form
            layout="inline"
            css={{
              display: 'inline-flex'
            }}
          >
            <PickerWithType type={type3} onChange={PickerWithType} typeNumber={3} timenumberFun={setTimenumber3} firstFun={setFirst3} />
            <Select size='large' value={type3} onChange={setType3} style={{ width: "80px", margin: "0 40px 0 15px " }}>
              <Option value="year">年</Option>
              <Option value="quarter">季度</Option>
              <Option value="month">月</Option>
            </Select>
          </Form>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "start", }}>
          {
            fiveOpt.length == 0 ? <div style={{ width: '100%', height: '300px' }}><NoData /> </div> : (fiveOpt2.map((item) => {
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
          <Pagination current={currentPage3} total={fiveOpt.length} onChange={(e1, e2) => onPaginationChange(e1, e2, setFiveOpt2, fiveOpt, setCurrentPage3)} pageSize={6} />
        </div>
      </div>
    </>
  )

}
export default ManPower;