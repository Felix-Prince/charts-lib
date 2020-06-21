import React from "react";
import EChartsObject from "echarts";
import PropsTypes from "prop-types";

interface EChartsProps {
    option: EChartsObject.EChartOption;
    notMerge?: boolean;
    lazyUpdate?: boolean;
}

// const propTypes = {
//     option: PropsTypes.object.isRequire,
//     notMerge: PropsTypes.boolean,
//     lazyUpdate: PropsTypes.boolean,
// };

export default class ECharts extends React.Component<EChartsProps> {
    private echartsDOM: HTMLDivElement | HTMLCanvasElement = (<div></div>);
    // static propTypes = propTypes;

    componentDidMount() {
        this.renderChart();
    }

    componentDidUpdate(prevProps: EChartsProps) {
        this.renderChart();
    }

    private getInstance = () => {
        if (!this.echartsDOM) {
            return null;
        }

        return (
            EChartsObject.getInstanceByDom(this.echartsDOM) ||
            EChartsObject.init(this.echartsDOM, {}, { height: 300 })
        );
    };

    private renderChart = () => {
        const echartInstance = this.getInstance();

        if (!echartInstance) {
            return null;
        }

        const { option, notMerge, lazyUpdate } = this.props;

        echartInstance.setOption(option, notMerge, lazyUpdate);
    };

    private saveDOM = (node: any) => {
        node && (this.echartsDOM = node);
    };

    render() {
        return <div ref={this.saveDOM}></div>;
    }
}
