import React from "react";
import serialport from "serialport";
import tableify from "tableify";

const PortItem = props => (
  <tr>
    {Object.keys(props.port).map(key => (
      <td>{`${key}  ${props.port[key]}`}</td>
    ))}
  </tr>
);

class Serialport extends React.Component {
  port;

  state = {
    ports: [],
    error: ""
  };

  setupSerialport = () => {
    serialport.list((err, ports) => {
      if (err) {
        this.setState({
          error: err.message
        });
        return;
      } else {
        this.setState({
          error: ""
        });
      }

      if (ports.length === 0) {
        this.setState({
          error: "No ports discovered"
        });
        return;
      }
      console.log("ports", ports);
      this.setState({ ports });

      if (ports && ports.length > 0) {
        this.port = new serialport(`${ports[0].comName}`, {
          baudRate: 57600
        });
        this.port.on("error", function(err) {
          console.log("Error: ", err.message);
        });
        this.port.on("open", function() {
          console.log("opend");
        });

        this.port.on("readable", () => {
          console.log("Data:", this.port.read());
        });
      }
    });
  };

  componentDidMount() {
    this.setupSerialport();
  }

  render() {
    console.log(this.state.ports, this.state.error);
    return (
      <div>
        {this.state.error ? (
          <p>{this.state.error}</p>
        ) : (
          <table>
            {this.state.ports.map(p => (
              <PortItem port={p} />
            ))}
          </table>
        )}
      </div>
    );
  }
}

export default Serialport;
