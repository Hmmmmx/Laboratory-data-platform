import { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';

export default function Charts(props: { options: any; style: any; }) {
    const { options, style } = props;
    const chartsNode = useRef(null);
    const [initCharts, setinitCharts] = useState<echarts.ECharts>(null as any)
    useEffect(() => {
        if (!initCharts) {
            setinitCharts(chartsNode.current ? echarts.init(chartsNode.current) : null as any);
        }
        initCharts && (initCharts as echarts.ECharts).setOption(options);
        // 监听echartsResize函数，实现图表自适应
        window.addEventListener('resize', echartsResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initCharts, options]);
    const echartsResize = () => {
        if (initCharts) {
            initCharts.resize();
        }
    }
    //页面卸载，销毁监听
    useEffect(() => {
        return () => {
            window.removeEventListener('resize', echartsResize);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return <div ref={chartsNode} style={style} />;
}