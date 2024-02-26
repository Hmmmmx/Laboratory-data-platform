import Charts from '../components/Charts.js'
import { getBirthInfo, getConvey, getCost, getSaleInfo } from '../api/request.js'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { transportationModes } from '@/utils/constant/index.js';

const styles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'space-around',
    width: '46%',
    height: '40vh',
    margin: '10px 0',
    paddingTop: '10px',
    border: '1px solid rgb(187, 187, 187)',
    borderRadius: '10px',
    textWrap: 'wrap',
}

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //不含最大值，含最小值
}

export default function Optimize({ corporation, }: { corporation: string, }) {
    const [costOption, setcostOption] = useState<unknown>();
    // const [staffOption, setstaffOption] = useState<unknown>();
    const [conveyOption, setconveyOption] = useState<unknown>();
    const [birthOption, setbirthOption] = useState<unknown>();
    const [saleInfo, setSaleInfo] = useState<unknown>();
    const thresold = useSelector((state: any) => state.threshold);

    useEffect(() => {
        getCost(corporation).then(res => {
            const originData = res.data;
            const tempData = []
            for (const attribute in originData) {
                let attributeZh_Cn = ''
                if (attribute == 'research') {
                    attributeZh_Cn = '研发费用'
                } else if (attribute == 'device') {
                    attributeZh_Cn = '设备费用'
                } else if (attribute == 'production') {
                    attributeZh_Cn = '生产费用'
                } else if (attribute == 'storage') {
                    attributeZh_Cn = '仓储费用'
                } else if (attribute == 'materiel') {
                    attributeZh_Cn = '原料费用'
                } else if (attribute == 'transportation') {
                    attributeZh_Cn = '运输费用'
                } else if (attribute == 'salary') {
                    attributeZh_Cn = '工资费用'
                }
                tempData.push({
                    value: (originData[attribute] * (thresold[getRandomInt(0, 2)] + thresold[getRandomInt(0, 2)])).toFixed(0),
                    name: attributeZh_Cn
                })
            }
            const temp = {
                title: {
                    text: '企业费用',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    valueFormatter: (value: number) => value + '(万元)'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left'
                },
                series: [
                    {
                        type: 'pie',
                        radius: '50%',
                        data: tempData,
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            setcostOption(temp)
        })
        // getStaff(corporation).then(res => {
        //     const originData = res.data;
        //     const tempData = []
        //     for (const attribute in originData) {
        //         tempData.push({
        //             value: originData[attribute] * (thresold[getRandomInt(0, 2)] + thresold[getRandomInt(0, 2)]),
        //             name: attribute
        //         })
        //     }
        //     const temp = {
        //         title: {
        //             text: '企业员工类型',
        //             left: 'center'
        //         },
        //         tooltip: {
        //             trigger: 'item'
        //         },
        //         legend: {
        //             orient: 'vertical',
        //             left: 'left'
        //         },
        //         series: [
        //             {
        //                 type: 'pie',
        //                 radius: '50%',
        //                 data: tempData,
        //                 emphasis: {
        //                     itemStyle: {
        //                         shadowBlur: 10,
        //                         shadowOffsetX: 0,
        //                         shadowColor: 'rgba(0, 0, 0, 0.5)'
        //                     }
        //                 }
        //             }
        //         ]
        //     };
        //     setstaffOption(temp)
        // })
        getConvey(corporation).then(res => {
            const originData = res.data;
            const tempData: { value: any; name: any; }[] = []
            originData.forEach((item: any) => {
                tempData.push({
                    value: (item.quantity * (thresold[getRandomInt(0, 2)] + thresold[getRandomInt(0, 2)])).toFixed(0),
                    name: transportationModes[item.categories as keyof typeof transportationModes]
                })
            })
            const temp = {
                title: {
                    text: '企业运输工具',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    valueFormatter: (value: number) => value + '(万辆)'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left'
                },
                series: [
                    {
                        type: 'pie',
                        radius: '50%',
                        data: tempData,
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            setconveyOption(temp)
        })
        getBirthInfo(corporation).then(res => {
            const originData = res.data;
            const tempData: { value: number; name: string; }[] = []
            originData.forEach((item: any) => {
                tempData.push({
                    value: item.quantity,
                    name: item.province
                })
            })
            const XData: any[] = []
            const YData: any[] = []
            originData.forEach((item: any) => {
                XData.push(item.country)
                YData.push(item.quantity * (thresold[getRandomInt(0, 2)] + thresold[getRandomInt(0, 2)]))
            })
            const temp = {
                title: {
                    text: '企业产地信息',
                    left: 'center'
                },
                xAxis: {
                    type: 'category',
                    data: XData
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: YData,
                        type: 'line'
                    }
                ]
            };
            setbirthOption(temp)
        })
        getSaleInfo(corporation).then(res => {
            const originData = res.data;
            const tempData: { value: number; name: string; }[] = []
            originData.forEach((item: any) => {
                tempData.push({
                    value: item.quantity,
                    name: item.country
                })
            })
            const XData: any[] = []
            const YData: any[] = []
            originData.forEach((item: any) => {
                XData.push(item.country)
                YData.push(item.quantity * (thresold[getRandomInt(0, 2)] + thresold[getRandomInt(0, 2)]))
            })
            const temp = {
                title: {
                    text: '企业销售信息',
                    left: 'center'
                },
                xAxis: {
                    type: 'category',
                    data: XData
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: YData,
                        type: 'line'
                    }
                ]
            };
            setSaleInfo(temp)
        })
    }, [corporation, thresold])


    return (
        <>
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
            }}>

                {costOption ? <Charts options={costOption} style={styles} /> : <></>}
                {conveyOption ? <Charts options={conveyOption} style={styles} /> : <></>}
                {birthOption ? <Charts options={birthOption} style={styles} /> : <></>}
                {/* {staffOption ? <Charts options={staffOption} style={styles} /> : <></>} */}
                {saleInfo ? <Charts options={saleInfo} style={styles} /> : <></>}
            </div>
        </>

    )
}
