import React, { Component } from "react";
import { Bar, Line } from "react-chartjs-2";
import { Card, CardBody, Col, Row } from "reactstrap";
import { connect } from "react-redux";
import { callApi } from "../../utils/index";
import { showError } from "../../actions/feedback";
import { Link } from 'react-router-dom'
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";
import { getStyle, hexToRgba } from "@coreui/coreui/dist/js/coreui-utilities";

const brandPrimary = getStyle("--primary");
const brandSuccess = getStyle("--success");
const brandInfo = getStyle("--info");
const brandDanger = getStyle("--danger");

// Card Chart 1
const cardChartData1 = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: brandPrimary,
      borderColor: "rgba(255,255,255,.55)",
      data: [65, 59, 84, 84, 51, 55, 40]
    }
  ]
};

const cardChartOpts1 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: "transparent",
          zeroLineColor: "transparent"
        },
        ticks: {
          fontSize: 2,
          fontColor: "transparent"
        }
      }
    ],
    yAxes: [
      {
        display: false,
        ticks: {
          display: false,
          min: Math.min.apply(Math, cardChartData1.datasets[0].data) - 5,
          max: Math.max.apply(Math, cardChartData1.datasets[0].data) + 5
        }
      }
    ]
  },
  elements: {
    line: {
      borderWidth: 1
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4
    }
  }
};

// Card Chart 2
const cardChartData2 = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: brandInfo,
      borderColor: "rgba(255,255,255,.55)",
      data: [1, 18, 9, 17, 34, 22, 11]
    }
  ]
};

const cardChartOpts2 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: "transparent",
          zeroLineColor: "transparent"
        },
        ticks: {
          fontSize: 2,
          fontColor: "transparent"
        }
      }
    ],
    yAxes: [
      {
        display: false,
        ticks: {
          display: false,
          min: Math.min.apply(Math, cardChartData2.datasets[0].data) - 5,
          max: Math.max.apply(Math, cardChartData2.datasets[0].data) + 5
        }
      }
    ]
  },
  elements: {
    line: {
      tension: 0.00001,
      borderWidth: 1
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4
    }
  }
};

// Card Chart 3
const cardChartData3 = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: "rgba(255,255,255,.2)",
      borderColor: "rgba(255,255,255,.55)",
      data: [78, 81, 80, 45, 34, 12, 40]
    }
  ]
};

const cardChartOpts3 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  scales: {
    xAxes: [
      {
        display: false
      }
    ],
    yAxes: [
      {
        display: false
      }
    ]
  },
  elements: {
    line: {
      borderWidth: 2
    },
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4
    }
  }
};

// Card Chart 4
const cardChartData4 = {
  labels: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: "rgba(255,255,255,.3)",
      borderColor: "transparent",
      data: [78, 81, 80, 45, 34, 12, 40, 75, 34, 89, 32, 68, 54, 72, 18, 98]
    }
  ]
};

const cardChartOpts4 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  scales: {
    xAxes: [
      {
        display: false,
        barPercentage: 0.6
      }
    ],
    yAxes: [
      {
        display: false
      }
    ]
  }
};

// Social Box Chart
const socialBoxData = [
  { data: [65, 59, 84, 84, 51, 55, 40], label: "facebook" },
  { data: [1, 13, 9, 17, 34, 41, 38], label: "twitter" },
  { data: [78, 81, 80, 45, 34, 12, 40], label: "linkedin" },
  { data: [35, 23, 56, 22, 97, 23, 64], label: "google" }
];

const makeSocialBoxData = dataSetNo => {
  const dataset = socialBoxData[dataSetNo];
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        backgroundColor: "rgba(255,255,255,.1)",
        borderColor: "rgba(255,255,255,.55)",
        pointHoverBackgroundColor: "#fff",
        borderWidth: 2,
        data: dataset.data,
        label: dataset.label
      }
    ]
  };
  return () => data;
};

const socialChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  scales: {
    xAxes: [
      {
        display: false
      }
    ],
    yAxes: [
      {
        display: false
      }
    ]
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3
    }
  }
};

// sparkline charts
const sparkLineChartData = [
  {
    data: [35, 23, 56, 22, 97, 23, 64],
    label: "New Clients"
  },
  {
    data: [65, 59, 84, 84, 51, 55, 40],
    label: "Recurring Clients"
  },
  {
    data: [35, 23, 56, 22, 97, 23, 64],
    label: "Pageviews"
  },
  {
    data: [65, 59, 84, 84, 51, 55, 40],
    label: "Organic"
  },
  {
    data: [78, 81, 80, 45, 34, 12, 40],
    label: "CTR"
  },
  {
    data: [1, 13, 9, 17, 34, 41, 38],
    label: "Bounce Rate"
  }
];

const makeSparkLineData = (dataSetNo, variant) => {
  const dataset = sparkLineChartData[dataSetNo];
  const data = {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ],
    datasets: [
      {
        backgroundColor: "transparent",
        borderColor: variant ? variant : "#c2cfd6",
        data: dataset.data,
        label: dataset.label
      }
    ]
  };
  return () => data;
};

const sparklineChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  responsive: true,
  maintainAspectRatio: true,
  scales: {
    xAxes: [
      {
        display: false
      }
    ],
    yAxes: [
      {
        display: false
      }
    ]
  },
  elements: {
    line: {
      borderWidth: 2
    },
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3
    }
  },
  legend: {
    display: false
  }
};

// Main Chart

//Random Numbers
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var elements = 27;
var data1 = [];
var data2 = [];
var data3 = [];

for (var i = 0; i <= elements; i++) {
  data1.push(random(50, 200));
  data2.push(random(80, 100));
  data3.push(65);
}

const mainChart = {
  labels: [
    "Mo",
    "Tu",
    "We",
    "Th",
    "Fr",
    "Sa",
    "Su",
    "Mo",
    "Tu",
    "We",
    "Th",
    "Fr",
    "Sa",
    "Su",
    "Mo",
    "Tu",
    "We",
    "Th",
    "Fr",
    "Sa",
    "Su",
    "Mo",
    "Tu",
    "We",
    "Th",
    "Fr",
    "Sa",
    "Su"
  ],
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: hexToRgba(brandInfo, 10),
      borderColor: brandInfo,
      pointHoverBackgroundColor: "#fff",
      borderWidth: 2,
      data: data1
    },
    {
      label: "My Second dataset",
      backgroundColor: "transparent",
      borderColor: brandSuccess,
      pointHoverBackgroundColor: "#fff",
      borderWidth: 2,
      data: data2
    },
    {
      label: "My Third dataset",
      backgroundColor: "transparent",
      borderColor: brandDanger,
      pointHoverBackgroundColor: "#fff",
      borderWidth: 1,
      borderDash: [8, 5],
      data: data3
    }
  ]
};

const mainChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips,
    intersect: true,
    mode: "index",
    position: "nearest",
    callbacks: {
      labelColor: function(tooltipItem, chart) {
        return {
          backgroundColor:
            chart.data.datasets[tooltipItem.datasetIndex].borderColor
        };
      }
    }
  },
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          drawOnChartArea: false
        }
      }
    ],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 5,
          stepSize: Math.ceil(250 / 5),
          max: 250
        }
      }
    ]
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3
    }
  }
};

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
      summaryData: {
        availableProducts: 0,
        lastWeekCount: 0,
        usersCount: 0,
        myAdsCount: 0
      }
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected
    });
  }

  componentWillMount() {
    callApi("/getSummary")
      .then(data => {
        this.setState({
          ...this.state,
          summaryData: { ...data }
        });
      })
      .catch(err => this.props.dispatch(showError("Error getting summary")));
  }

  render() {
    const {
      availableProducts,
      myAdsCount,
      lastWeekCount,
      usersCount
    } = this.state.summaryData;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <div className="text-value">{availableProducts}</div>
                <div>Available Products</div>
              </CardBody>
              <div className="chart-wrapper mx-3" style={{ height: "70px" }}>
                <Line
                  data={cardChartData2}
                  options={cardChartOpts2}
                  height={70}
                />
              </div>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-primary">
              <CardBody className="pb-0">
                <div className="text-value">{lastWeekCount}</div>
                <div>Last Week Products</div>
              </CardBody>
              <div className="chart-wrapper mx-3" style={{ height: "70px" }}>
                <Line
                  data={cardChartData1}
                  options={cardChartOpts1}
                  height={70}
                />
              </div>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-warning">
              <CardBody className="pb-0">
                <div className="text-value">{usersCount}</div>
                <div>Members</div>
              </CardBody>
              <div className="chart-wrapper" style={{ height: "70px" }}>
                <Line
                  data={cardChartData3}
                  options={cardChartOpts3}
                  height={70}
                />
              </div>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-danger">
              <CardBody className="pb-0">
                <div className="text-value">{myAdsCount}</div>
                <div>My Ads</div>
              </CardBody>
              <div className="chart-wrapper mx-3" style={{ height: "70px" }}>
                <Bar
                  data={cardChartData4}
                  options={cardChartOpts4}
                  height={70}
                />
              </div>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs="6" sm="6" lg="3">
          <Link to='/app/productList' >
            <div className="brand-card">
              <div className="brand-card-header bg-facebook">
                <i className="fa fa-list" />
                <div className="chart-wrapper">
                  <Line
                    data={makeSocialBoxData(1)}
                    options={socialChartOpts}
                    height={90}
                  />
                </div>
              </div>
              <div className="brand-card-body">
                <div>
                  <div className="text-value">Product Lists</div>
                </div>
              </div>
            </div>
          </Link>
          </Col>

          <Col xs="6" sm="6" lg="3">
          <Link to='/app/addProduct' >
            <div className="brand-card">
              <div className="brand-card-header bg-twitter">
                <i className="fa fa-plus" />
                <div className="chart-wrapper">
                  <Line
                    data={makeSocialBoxData(2)}
                    options={socialChartOpts}
                    height={90}
                  />
                </div>
              </div>
              <div className="brand-card-body">
                <div>
                  <div className="text-value">Add Product</div>
                </div>
              </div>
            </div>
          </Link>
          </Col>
          
          </Row>
      </div>
    );
  }
}

export default connect()(Dashboard);
