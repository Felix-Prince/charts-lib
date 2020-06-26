import React, { useState } from "react";
import ReactDOM from "react-dom";
import ECharts from "@core/ECharts";

const App: React.FC = () => {
    const [chartData, setChartData] = useState([5, 20, 36, 10, 10, 20]);
    const lineOption: any = {
        title: {
            text: "ECharts 入门示例",
        },
        tooltip: {},
        legend: {
            data: ["销量"],
        },
        xAxis: {
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
            {
                name: "销量",
                type: "bar",
                data: chartData,
            },
        ],
    };

    const setData = (): void => {
        let arr: Array<number> = [];
        for (let index = 0; index < 6; index++) {
            const element = Math.round(Math.random() * 100);
            arr.push(element);
        }
        console.log("arr", arr);
        setChartData(arr);
    };
    return (
        <div>
            Hello react
            <ECharts option={lineOption} />
            <ECharts option={lineOption} />
            <button onClick={setData}>setData</button>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
