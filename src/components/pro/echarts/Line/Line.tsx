import React from "react";
import ECharts from "@core/ECharts";
import EChartsObject from "echarts";

interface LineProps {
    data: Array<number>;
    xAxis: object;
    yAxis: object;
    legend: object;
}

export default class Line extends React.Component<LineProps> {
    getOption = (): any => {
        const { data, xAxis, legend, yAxis } = this.props;

        const series = [
            {
                type: "line",
                data,
            },
        ];

        return {
            xAxis,
            yAxis,
            legend,
            series,
        };
    };

    render() {
        const lineOption = this.getOption() as EChartsObject.EChartOption;

        console.log("object", lineOption);

        return <ECharts option={lineOption} />;
    }
}
