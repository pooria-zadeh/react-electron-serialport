import React from "react";
import { Line } from "react-chartjs-2";
import { timeAxisOptions, lineChartDefaults } from "./chartHelper";
import { updateObjectImmutable } from "../utils/index";

export default class extends React.Component {
  state = {
    lineData: lineChartDefaults
  };

  addNewPoints = newPoint => {
    const yLineData = this.state.lineData.datasets && this.state.lineData.datasets[0].data;
    if (yLineData) {
      
      this.setState(prevState => ({
        lineData: updateObjectImmutable(prevState.lineData, {
          data: yLineData.push(newPoint)
        })
      }));
    }
    // if (this.lineChart) {
    //   this.lineChart.setNativeProps({data:updateObjectImmutable()})
    // }
  };

  fakeDataGenerator = () => {
    let temp = 0;
    setInterval(() => {
      if (this.lineChart) {
        temp += 1;
        this.addNewPoints({ y: temp });
      }
    }, 1000);
  };

  componentDidMount() {
    this.fakeDataGenerator();
  }

  render() {
    return (
      <div>
        <Line
          ref={r => (this.lineChart = r)}
          data={this.state.lineData}
          options={timeAxisOptions}
        />
      </div>
    );
  }
}
