import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Line } from "@pro/echarts";

const App: React.FC = () => {
    const [chartData, setChartData] = useState([5, 20, 36, 10, 10, 20]);
    const xAxis = {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
    };
    const yAxis = {
        type: "value",
    };
    const legend = {
        data: ["销量"],
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
            <Line
                data={chartData}
                xAxis={xAxis}
                yAxis={yAxis}
                legend={legend}
            />
            <button onClick={setData}>setData</button>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
