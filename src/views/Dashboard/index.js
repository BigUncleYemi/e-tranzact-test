import React from 'react';
import { userData, adminTableData } from '../../helpers/seed';
import Footer from '../../Componenets/Footer';
import Nav from '../../Componenets/Nav';
import MUIDataTable from "mui-datatables";
import {
  createMuiTheme,
  MuiThemeProvider,
} from "@material-ui/core/styles";


class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) this.props.history.replace("/login");
  }

  componentDidMount() {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      this.props.history.replace("/login");
      return false;
    }
    // Simulate API call for details for that user id
    const user = userData.filter(user => userId === user._id);
    if (!user.length) {
      this.props.history.replace("/login");
      return false;
    }
    this.setState(() => ({
      user: user[0],
      loading: false
    }));

    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) {
      this.props.history.replace("/login");
      return false;
    }

    // Simulate API call for details for admin table, and set state
    this.setState(() => ({
      loading: false
    }));
  }

  getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MUIDataTable: {
          paper: {
            boxShadow: "none",
            border: "1px solid #dee2e6"
          }
        },
        MuiCheckbox: {
          root: {
            color: "inherit",
          }
        },
        MUIDataTableSelectCell: {
          headerCell: {
            backgroundColor: "#1e2d43",
            color: "#ebebeb",
          }
        },
        MUIDataTableToolbar: {
          titleText: {
            color: "#1e2d43",
            fontSize: 25
          }
        },
        MUIDataTableHeadCell: {
          fixedHeader: {
            backgroundColor: "#1e2d43",
            color: "#ebebeb",
          }
        }
      }
    });

  render() {
    const { loading, user = {} } = this.state;
    const columns = ["First Name", "Last name", "Date", "ID Type", "Status", "Reason"];
    let tableData = adminTableData.length !== 0 ? adminTableData.map(dataArray => [dataArray.firstName, dataArray.lastName, dataArray.date, dataArray.idType, dataArray.status, dataArray.reason]) : [];
    const options = {
      filter: true,
      selectableRows: true,
      filterType: "dropdown",
      responsive: "scroll",
      rowsPerPage: 10,
    };
    return loading
      ? (<div>Loading...</div>)
      : (
        <div className="container profile">
          <Nav />
          <div className="row my-4">
            <div className="col-md-2 p-4">
              <img className="rounded-circle shadow" height="200" alt="profile" src={`https://joeschmoe.io/api/v1/${user.username}`} />
            </div>
            <div className="col-md-7 p-5 admin-details">
              <div className="d-flex justify-content-start">
                <div className="mx-3">
                  <h5>Username</h5>
                  <p>{user.username}</p>
                </div>
              </div>
              <div className="d-flex justify-content-start">
                <div className="mx-3">
                  <h5>First name</h5>
                  <p>{user.firstName}</p>
                </div>
                <div className="mx-3">
                  <h5>Last name</h5>
                  <p>{user.lastName}</p>
                </div>
              </div>
              <div className="d-flex justify-content-start">
                <div className="mx-3">
                  <h5>Email</h5>
                  <p>{user.email}</p>
                </div>
                <div className="mx-3">
                  <h5>Phone Number</h5>
                  <p>{user.phoneNumber}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="my-4">
            <MuiThemeProvider theme={this.getMuiTheme()}>
              <MUIDataTable
                title={"Admin Dashboard"}
                data={tableData}
                columns={columns}
                options={options}
              />
            </MuiThemeProvider>
          </div>
          <Footer />
        </div>
      )
  }
}

export default Dashboard;
