/* @jsxImportSource @emotion/react */
import { useState, type FC, type ReactElement, useEffect } from 'react';
import { EChartsOption } from "echarts";
import { Charts } from "../components/Charts";
import { Form, Select, DatePicker } from 'antd';
import NoData from '@/components/NoData/NoData';
import dayjs from 'dayjs';
import { url } from './getData';
import { soldProducts, productTypes } from '@/utils/constant';
import { Pagination } from 'antd';
// import { update } from '@/pages/decision-metacomponents/earlyWarning/service';

const Wealth: FC = (): ReactElement => {
  // 时间选择器
  const { Option } = Select;
  const [type1, setType1] = useState('year');
  const [type2, setType2] = useState('year');
  const [type3, setType3] = useState('year');
  const [type4, setType4] = useState('year');
  const [type5, setType5] = useState('year');
  const [yearSelect, setYearSelect] = useState(2022);
  const currentTime = Math.floor(new Date("2022-01-01").getTime() / 1000);
  // let timeArr = ['2022',"2023-01-01","2023-01-01","2023-01-01","2023-01-01"];
  const [timenumber1, setTimenumber1] = useState(currentTime);
  const [timenumber2, setTimenumber2] = useState(currentTime);
  const [timenumber3, setTimenumber3] = useState(currentTime);
  const [timenumber4, setTimenumber4] = useState(currentTime);
  const [timeArr, setTimeArr] = useState(['2022', "2022-01-01", "2022-01-01", "2022-01-01", "2022-01-01"]);
  let granularity = [1, 1, 1, 1, 1];
  const upData = (_value: any, valueString: any, e: any, timenumberFun: any) => {
    console.log(valueString, 111111111)
    let timenumberArr: any;
    const timeArr2 = ['2022', "2022-01-01", "2022-01-01", "2022-01-01", "2022-01-01"];
    timeArr2[e - 1] = valueString;
    setTimeArr(timeArr2);
    // console.log(timeArr2)
    if (valueString.length == 4) {
      if (e == 1) {
        setYearSelect(valueString);
      }
      else {
        timenumberArr = Math.floor(new Date(valueString + '-12-01').getTime() / 1000);
        timenumberFun(timenumberArr);
      }
    } else if (valueString.length == 7 && valueString.substring(5, 6) != 'Q' && e > 1) {
      timenumberArr = Math.floor(new Date(valueString + '-29').getTime() / 1000);
      timenumberFun(timenumberArr);
    } else if (valueString.length == 7 && valueString.substring(5, 6) == 'Q' && e > 1) {
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
  const [first1, setFirst1] = useState(0);
  const [first2, setFirst2] = useState(0);
  const [first3, setFirst3] = useState(0);
  const [first4, setFirst4] = useState(0);
  const [first5, setFirst5] = useState(0);
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
          : (timeArr[typeNumber - 1] == '' ? undefined : dayjs(timeArr[typeNumber - 1]))}
    />;
  };
  // 折线面积
  const [thrOpt, setThrOpt] = useState<EChartsOption[]>([])
  useEffect(() => {
    fetch(url + `rest/data/element/sale/perception/trend/query?time=${yearSelect}`).then((res) => {
      return res.json()
    }).then(res => {
      setCurrentPage1(1)
      if (JSON.stringify(res) == '{}') {
        setThrOpt([])
        return;
      }
      const newData: Array<any> = [];
      const data = res;
      let i = 0;
      for (const key in data) {
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
              type: 'shadow',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          legend: {
            data: ['2024'],
            left: 'center',
            top: "16%",
            textStyle: {
              fontSize: 16
            }
          },
          grid: {
            left: "2%",
            right: "5%",
            top: "30%",
            bottom: "6%",
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: true,
            axisLabel: {
              fontSize: 12,
              color: '#1c1100',
              margin: 8,
              interval: 0
            },
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
          },
          yAxis: {
            type: 'value',
            name: "销售量",
            splitLine: {
              lineStyle: {
                width: 2
              }
            },
            axisLabel: {
              fontSize: 13,
              color: '#1c1100'
            },
          },
          series: [
            {
              name: "2024",
              data: data[key],
              type: 'line',
              smooth: true,
              areaStyle: {
                color: 'rgba(80, 135, 236,0.4)'
              },
              lineStyle: {
                color: 'rgba(80, 135, 236,0.8)',
              }
            }
          ]
        };
        newData[i] = template;
        i++;
      }
      setThrOpt(newData);
      setThrOpt2(newData.slice(0, 6));
    })
  }, [yearSelect, first1])
  //饼状图（1）
  const [firOpt, setFirOpt] = useState<EChartsOption[]>([])
  useEffect(() => {
    fetch(url + `rest/data/element/sale/perception/birth/query?time=${timenumber1}&granularity=${granularity[1]}`).then((res) => {
      return res.json()
    }).then(res => {
      setCurrentPage2(1)
      // console.log(res)
      if (JSON.stringify(res) == '{}') {
        setFirOpt([])
        return;
      }
      const data = res;
      let i = 0;
      let seriesArr: Array<any> = [];
      const newData: Array<any> = [];
      for (const key in data) {
        seriesArr = [];
        const provinceArr = [...new Set(data[key].map((item: any) => {
          return item.province
        }))]
        for (let i = 0; i < provinceArr.length; i++) {
          let sum = 0;
          sum = eval(data[key].map((item: any) => {
            return item.province == provinceArr[i] ? item.quantity : 0;
          }).join('+'));
          seriesArr[i] = { value: sum, name: provinceArr[i] };
        }
        const template = {
          title: {
            text: key,
            left: 'center',
            top: "22",
            textStyle: {
              fontWeight: 400,
              fontSize: 24
            },
          },
          tooltip: {
            trigger: 'item'
          },
          series: [
            {
              startAngle: 150,
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
                  const value_format = v.value;
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
                fontSize: 15,
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: 16,
                  fontWeight: '600'
                }
              },
              labelLine: {
                show: true
              },
              data: seriesArr,
              center: ["50%", "55%"]
            }
          ],
          avoidLabelOverlap: true
        };
        newData[i] = template;
        i++;
      }
      setFirOpt(newData);
      setFirOpt2(newData.slice(0, 6));
    })
  }, [timenumber1, first2])
  //柱状图(一对多)
  const [secOpt, setSecOpt] = useState<EChartsOption[]>([])
  useEffect(() => {
    fetch(url + `rest/data/element/sale/perception/count/query?time=${timenumber2}&granularity=${granularity[2]}`).then((res) => {
      return res.json()
    }).then(res => {
      setCurrentPage3(1)
      if (JSON.stringify(res) == '{}') {
        setSecOpt([])
        return;
      }
      // console.log(res)
      const data = res;
      let i = 0;
      const newData: Array<any> = [];
      //处理数据(对应坐标轴需求)
      for (const key in data) {
        const YnameOne = [...new Set(data[key].map((item: any) => {
          for (const k in productTypes) {
            item.categories = item.categories == k ? productTypes[k] : item.categories;
            if (item.categories == productTypes[k]) {
              break;
            }
          }
          return item.categories
        }))]
        const YnameSecond = [...new Set(data[key].map((item: any) => {
          for (const k in soldProducts) {
            item.types = item.types == k ? soldProducts[k] : item.types;
            if (item.types == soldProducts[k]) {
              break;
            }
          }
          return item.types
        }))]
        const quantityArr: Array<any> = [];
        const seriesArr: Array<any> = [];
        for (let i = 0; i < YnameSecond.length; i++) {
          const quantityArr2: Array<any> = [];
          data[key].map((item: any) => {
            const quantity = item.types == YnameSecond[i] ? item.quantity : null;
            if (quantity) {
              quantityArr2[YnameOne.findIndex(item2 => { return item2 == item.categories })] = quantity;
            }
          })
          quantityArr[i] = quantityArr2;
          seriesArr[i] = {
            name: YnameSecond[i],
            type: 'bar',
            data: quantityArr[i],
          }
        }
        const template = {
          title: {
            text: key,
            left: 'center',
            top: '20',
            textStyle: {
              fontWeight: 400,
              fontSize: 22
            }
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            top: "14%",
            textStyle: {
              fontSize: 16
            }
          },
          grid: {
            left: "3%",
            right: "8%",
            top: "28%",
            bottom: "6%",
            containLabel: true
          },
          xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
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
            data: YnameOne,
            axisLabel: {
              fontSize: 15,
              color: '#1c1100'
            },
          },
          series: seriesArr
        };
        newData[i] = template
        i++
      }
      setSecOpt(newData);
      setSecOpt2(newData.slice(0, 6));
    })
  }, [timenumber2, first3])
  //饼状图（2）
  const [fourOpt, setFourOpt] = useState<EChartsOption[]>([])
  useEffect(() => {
    fetch(url + `rest/data/element/sale/perception/profit/query?time=${timenumber3}&granularity=${granularity[3]}`).then((res) => {
      return res.json()
    }).then(res => {
      setCurrentPage4(1)
      if (JSON.stringify(res) == '{}') {
        setFourOpt([])
        return;
      }
      const data = res;
      let i = 0;
      let seriesArr: Array<any> = [];
      const newData: Array<any> = [];
      let sunValue = 0;
      for (const key in data) {
        seriesArr = [];
        const categoriesArr = [...new Set(data[key].map((item: any) => {
          for (const k in productTypes) {
            item.categories = item.categories == k ? productTypes[k] : item.categories;
            if (item.categories == productTypes[k]) {
              break;
            }
          }
          return item.categories
        }))]
        for (let i = 0; i < categoriesArr.length; i++) {
          let sum = 0;
          sum = eval(data[key].map((item: any) => {
            return item.categories == categoriesArr[i] ? Math.round(item.income / 10000) : 0;
          }).join('+'));
          sunValue += sum;
          seriesArr[i] = { value: sum, name: categoriesArr[i] };
        }
        const template = {

          title: [
            {
              text: `总计：\n${sunValue}万元`,
              top: '48%',
              left: 'center',
              textStyle: {
                fontWeight: 400,
                fontSize: 16,
                lineHeight: 26,

              }
            },
            {
              text: key,
              left: 'center',
              top: "22",
              textStyle: {
                fontWeight: 400,
                fontSize: 22
              }
            }
          ],
          tooltip: {
            trigger: 'item'
          },
          series: [
            {
              startAngle: 200,
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
                  const value_format = v.value + '万元';
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
              data: seriesArr,
              center: ["50%", "56%"]
            }
          ],
          avoidLabelOverlap: true
        };
        newData[i] = template;
        i++;
      }
      setFourOpt(newData);
      setFourOpt2(newData.slice(0, 6))
    })
  }, [timenumber3, first4])
  // 饼状图（3）
  const [fiveOpt, setFiveOpt] = useState<EChartsOption[]>([])
  useEffect(() => {
    fetch(url + `rest/data/element/sale/perception/export/query?time=${timenumber4}&granularity=${granularity[4]}`).then((res) => {
      return res.json()
    }).then(res => {
      if (JSON.stringify(res) == '{}') {
        setFiveOpt([])
        return;
      }
      const data = res;
      let i = 0;
      const seriesArr: Array<any> = [];
      const newData: Array<any> = [];

      for (const key in data) {
        let sum = 0;
        sum = eval(data[key].map((item: any) => {
          return item.quantity;
        }).join('+'));
        seriesArr[i] = {
          name: key, value: sum
        };
        i++
      }

      // console.log(seriesArr)
      const template = {
        legend: {
          top: "0%",
          textStyle: {
            fontSize: 15
          }
        },
        tooltip: {
          trigger: 'item'
        },
        series: [

          {
            startAngle: 60,
            type: 'pie',
            radius: '65%',
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
                const value_format = v.value;
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
                fontWeight: '600',
              },
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            labelLine: {
              show: true,
              length: 15
            },
            data: seriesArr,
            center: ["50%", "56%"]
          }
        ],
        avoidLabelOverlap: true
      };
      newData[0] = template;
      setFiveOpt(newData);
    })
  }, [timenumber4, first5])
  // 柱状图(横屏)
  const [sixOpt, setSixOpt] = useState<EChartsOption[]>([]);
  useEffect(() => {
    fetch(url + `rest/data/element/sale/perception/export/query?time=${timenumber4}&granularity=${granularity[4]}`).then((res) => {
      return res.json()
    }).then(res => {
      if (JSON.stringify(res) == '{}') {
        setSixOpt([])
        return;
      }
      const data = res;
      // let i = 0;
      const seriesArr: Array<any> = [];
      const newData: Array<any> = [];
      let countryArr: Array<any> = [];
      for (const key in data) {
        // seriesArr = [];
        countryArr = [...new Set([...countryArr, ...new Set(data[key].map((item: any) => {
          return item.country
        }))])]
        for (let i = 0; i < countryArr.length; i++) {
          let sum = 0;
          sum = eval(data[key].map((item: any) => {
            return item.country == countryArr[i] ? item.quantity : 0;
          }).join('+'));
          seriesArr[i] = seriesArr[i] ? seriesArr[i] + sum : sum;
        }
      }
      const template = {

        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "12%",
          top: "20%",
          bottom: "6%",
          containLabel: true
        },
        legend: {
          top: "8%",
          textStyle: {
            fontSize: 15
          }
        },
        xAxis: {
          type: 'value',
          axisLabel: {
            fontSize: 14,
            color: '#1c1100',
            margin: 10
          },
          splitLine: {
            lineStyle: {
              width: 2
            }
          },
          name: '',
        },
        yAxis: {
          type: 'category',
          data: countryArr,
          axisLabel: {
            fontSize: 15,
            color: '#1c1100'
          },

        },
        series: [
          {
            name: '出口国家',
            type: 'bar',
            stack: 'total',
            label: {
              show: true,
              fontSize: 10
            },
            emphasis: {
              focus: 'series'
            },
            data: seriesArr,
            // barWidth: '55%',
          }
        ]
      };
      newData[0] = template
      setSixOpt(newData);
    })
  }, [timenumber4, first5])
  // 饼状图（4）
  const [seveOpt, setSeveOpt] = useState<EChartsOption[]>([])
  useEffect(() => {
    fetch(url + `rest/data/element/sale/perception/export/query?time=${timenumber4}&granularity=${granularity[4]}`).then((res) => {
      return res.json()
    }).then(res => {
      if (JSON.stringify(res) == '{}') {
        setSeveOpt([])
        return;
      }
      const data = res;
      const seriesArr: Array<any> = [];
      const newData: Array<any> = [];
      let typeArr: Array<any> = [];
      // console.log(data)
      for (const key in data) {
        // seriesArr = [];
        typeArr = [...new Set([...typeArr, ...new Set(data[key].map((item: any) => {
          for (const k in soldProducts) {
            item.types = item.types == k ? soldProducts[k] : item.types;
            if (item.types == soldProducts[k]) {
              break;
            }
          }
          return item.types
        }))])]
        for (let i = 0; i < typeArr.length; i++) {
          let sum = 0;
          sum = eval(data[key].map((item: any) => {
            console.log(item.types, typeArr[i])
            return item.types == typeArr[i] ? item.quantity : 0;
          }).join('+'));
          seriesArr[i] = seriesArr[i] ? seriesArr[i] + sum : sum;
        }
      }
      for (let k = 0; k < seriesArr.length; k++) {
        seriesArr[k] = { name: typeArr[k], value: seriesArr[k] };
      }
      // console.log(seriesArr)
      const template = {

        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            startAngle: 200,
            type: 'pie',
            radius: ['30%', '70%'],
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
                const value_format = v.value;
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
              fontSize: 15,
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
            data: seriesArr,
            center: ["50%", "56%"]
          }
        ],
        avoidLabelOverlap: true
      };
      newData[0] = template;
      setSeveOpt(newData);
    })
  }, [timenumber4, first5])
  // 饼状图（5）
  const [eigOpt, setEigOpt] = useState<EChartsOption[]>([])
  useEffect(() => {
    fetch(url + `rest/data/element/sale/perception/export/query?time=${timenumber4}&granularity=${granularity[4]}`).then((res) => {
      return res.json()
    }).then(res => {
      if (JSON.stringify(res) == '{}') {
        setEigOpt([])
        return;
      }
      const data = res;
      const seriesArr: Array<any> = [];
      const newData: Array<any> = [];
      let categoriesArr: Array<any> = [];
      for (const key in data) {
        // seriesArr = [];
        categoriesArr = [...new Set([...categoriesArr, ...new Set(data[key].map((item: any) => {
          for (const k in productTypes) {
            item.categories = item.categories == k ? productTypes[k] : item.categories;
            if (item.categories == productTypes[k]) {
              break;
            }
          }
          return item.categories
        }))])]
        for (let i = 0; i < categoriesArr.length; i++) {
          let sum = 0;
          sum = eval(data[key].map((item: any) => {
            return item.categories == categoriesArr[i] ? item.quantity : 0;
          }).join('+'));
          seriesArr[i] = seriesArr[i] ? seriesArr[i] + sum : sum;
        }
      }
      for (let k = 0; k < seriesArr.length; k++) {
        seriesArr[k] = { name: categoriesArr[k], value: seriesArr[k] };
      }
      // console.log(seriesArr)
      const template = {

        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            startAngle: 200,
            type: 'pie',
            radius: ['30%', '70%'],
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
                const value_format = v.value;
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
              fontSize: 15,
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
            data: seriesArr,
            center: ["50%", "50%"]
          }
        ],
        avoidLabelOverlap: true
      };
      newData[0] = template;
      setEigOpt(newData);
    })
  }, [timenumber4, first5])
  // 分页器
  const [currentPage1, setCurrentPage1] = useState(1);
  const [currentPage2, setCurrentPage2] = useState(1);
  const [currentPage3, setCurrentPage3] = useState(1);
  const [currentPage4, setCurrentPage4] = useState(1);
  const [thrOpt2, setThrOpt2] = useState<EChartsOption[]>([])
  const [firOpt2, setFirOpt2] = useState<EChartsOption[]>([])
  const [secOpt2, setSecOpt2] = useState<EChartsOption[]>([])
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
          <div style={{ color: "#396685", fontSize: "24px", lineHeight: '42px', marginLeft: '40px' }}>企业年度销售趋势</div>
          <Form
            layout="inline"
            css={{
              display: 'inline-flex'
            }}
          >
            <PickerWithType type={type1} onChange={PickerWithType} typeNumber={1} firstFun={setFirst1} />
            <Select size='large' value={type1} onChange={setType1} style={{ width: "80px", margin: "0 40px 0 15px " }}>
              <Option value="year">年</Option>
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
          <Pagination current={currentPage1} total={thrOpt.length} onChange={(e1, e2) => onPaginationChange(e1, e2, setThrOpt2, thrOpt, setCurrentPage1)} pageSize={6} />
        </div>
      </div>
      <div style={{ padding: "20px 3px 20px 3px", marginTop: "40px", border: "2px solid #d3d3d3" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ color: "#396685", fontSize: "24px", lineHeight: '42px', marginLeft: '40px' }}>企业产品销量情况</div>
          <Form
            layout="inline"
            css={{
              display: 'inline-flex'
            }}
          >
            <PickerWithType type={type2} onChange={PickerWithType} typeNumber={2} timenumberFun={setTimenumber1} firstFun={setFirst2} />
            <Select size='large' value={type2} onChange={setType2} style={{ width: "80px", margin: "0 40px 0 15px " }}>
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
          <Pagination current={currentPage2} total={firOpt.length} onChange={(e1, e2) => onPaginationChange(e1, e2, setFirOpt2, firOpt, setCurrentPage2)} pageSize={6} />
        </div>
      </div>
      <div style={{ padding: "20px 3px 20px 3px", marginTop: "40px", border: "2px solid #d3d3d3" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ color: "#396685", fontSize: "24px", lineHeight: '42px', marginLeft: '40px' }}>企业国内产品销量分布情况</div>
          <Form
            layout="inline"
            css={{
              display: 'inline-flex'
            }}
          >
            <PickerWithType type={type3} onChange={PickerWithType} typeNumber={3} timenumberFun={setTimenumber2} firstFun={setFirst3} />
            <Select size='large' value={type3} onChange={setType3} style={{ width: "80px", margin: "0 40px 0 15px " }}>
              <Option value="year">年</Option>
              <Option value="quarter">季度</Option>
              <Option value="month">月</Option>
            </Select>
          </Form>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "start", }}>
          {
            secOpt.length == 0 ? <div style={{ width: '100%', height: '300px' }}><NoData /> </div> : (secOpt2.map((item) => {
              return (
                <div style={{ width: "31%", height: "430px", border: "2px solid #d3d3d3", margin: "15px 1%", borderRadius: "20px", }}>
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
          <Pagination current={currentPage3} total={secOpt.length} onChange={(e1, e2) => onPaginationChange(e1, e2, setSecOpt2, secOpt, setCurrentPage3)} pageSize={6} />
        </div>
      </div>
      <div style={{ padding: "20px 3px 20px 3px", marginTop: "40px", border: "2px solid #d3d3d3" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ color: "#396685", fontSize: "24px", lineHeight: '42px', marginLeft: '40px' }}>企业销售营收分布</div>
          <Form
            layout="inline"
            css={{
              display: 'inline-flex'
            }}
          >
            <PickerWithType type={type4} onChange={PickerWithType} typeNumber={4} timenumberFun={setTimenumber3} firstFun={setFirst4} />
            <Select size='large' value={type4} onChange={setType4} style={{ width: "80px", margin: "0 40px 0 15px " }}>
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
          <Pagination current={currentPage4} total={fourOpt.length} onChange={(e1, e2) => onPaginationChange(e1, e2, setFourOpt2, fourOpt, setCurrentPage4)} pageSize={6} />
        </div>
      </div>
      <div style={{ padding: "20px 3px 20px 3px", marginTop: "40px", border: "2px solid #d3d3d3" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ color: "#396685", fontSize: "24px", lineHeight: '42px', marginLeft: '40px' }}>企业出口销量分布</div>
          <Form
            layout="inline"
            css={{
              display: 'inline-flex'
            }}
          >
            <PickerWithType type={type5} onChange={PickerWithType} typeNumber={5} timenumberFun={setTimenumber4} firstFun={setFirst5} />
            <Select size='large' value={type5} onChange={setType5} style={{ width: "80px", margin: "0 40px 0 15px " }}>
              <Option value="year">年</Option>
              <Option value="quarter">季度</Option>
              <Option value="month">月</Option>
            </Select>
          </Form>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "start", }}>
          {
            sixOpt.length == 0 ? <div style={{ width: '100%', height: '430px' }}><NoData /> </div> : (sixOpt.map((item) => {
              return (
                <div style={{ width: "34%", height: "460px", margin: "15px 1%", borderRadius: "20px", }}>
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
          {
            fiveOpt.length == 0 ? <></> : (fiveOpt.map((item) => {
              return (
                <div style={{ width: "34%", height: "460px", margin: "15px auto", borderRadius: "20px", }}>
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
          {seveOpt.length == 0 ? <></> :
            <div style={{ display: 'flex', flexDirection: "column", justifyContent: "space-around", width: "29%", height: "460px", }}>
              {
                seveOpt.length == 0 ? <></> : (seveOpt.map((item) => {
                  return (
                    <div style={{ margin: "10px 8px", borderRadius: "20px", }}>
                      <Charts
                        options={item}
                        style={{
                          height: "220%",
                          width: "100%",
                        }}
                      />
                    </div>
                  )
                })
                )
              }
              {
                eigOpt.length == 0 ? <></> : (eigOpt.map((item) => {
                  return (
                    <div style={{ margin: "10px 8px", borderRadius: "20px", }}>
                      <Charts
                        options={item}
                        style={{
                          height: "240%",
                          width: "100%",
                        }}
                      />
                    </div>
                  )
                })
                )
              }
            </div>
          }
        </div>

      </div>

    </>
  )
}


export default Wealth;