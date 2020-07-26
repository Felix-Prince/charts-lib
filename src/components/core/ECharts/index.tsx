import React from "react";
import EChartsObject from "echarts";
import PropsTypes from "prop-types";

export interface EChartsProps {
    option: EChartsObject.EChartOption;
    notMerge?: boolean;
    lazyUpdate?: boolean;
    theme?: string | object;
    opts?: {
        devicePixelRatio?: number;
        renderer?: string;
        width?: number | string;
        height?: number | string;
    };
}

const propTypes = {
    option: PropsTypes.object.isRequired,
    notMerge: PropsTypes.bool,
    lazyUpdate: PropsTypes.bool,
    theme: PropsTypes.oneOfType([PropsTypes.string, PropsTypes.object]),
    opts: PropsTypes.shape({
        devicePixelRatio: PropsTypes.number,
        renderer: PropsTypes.string,
        width: PropsTypes.oneOfType([PropsTypes.number, PropsTypes.string]),
        height: PropsTypes.oneOfType([PropsTypes.number, PropsTypes.string]),
    }),
};

const defaultProps = {
    opts: {
        height: 300,
    },
};

export default class ECharts extends React.Component<EChartsProps> {
    private echartsDOM:
        | HTMLDivElement
        | HTMLCanvasElement = document.createElement("div");
    static propTypes = propTypes;
    static defaultProps = defaultProps;

    componentDidMount() {
        this.renderChart();
    }

    componentDidUpdate() {
        this.renderChart();
    }

    private getInstance = () => {
        if (!this.echartsDOM) {
            return null;
        }

        const { theme, opts } = this.props;

        return (
            EChartsObject.getInstanceByDom(this.echartsDOM) ||
            EChartsObject.init(this.echartsDOM, theme, opts)
        );
    };

    private renderChart = () => {
        const echartInstance = this.getInstance();

        if (!echartInstance) {
            return null;
        }
        // 重新渲染前把之前的注册的事件移除
        echartInstance.off("legendselectchanged", this.legendselectchanged);

        const { option, notMerge, lazyUpdate } = this.props;

        echartInstance.setOption(option, notMerge, lazyUpdate);

        echartInstance.on("legendselectchanged", this.legendselectchanged);
    };

    private legendselectchanged = (params) => {
        console.log("params", params);
    };

    private saveDOM = (node: any) => {
        node && (this.echartsDOM = node);
    };

    render() {
        return <div ref={this.saveDOM}></div>;
    }
}
