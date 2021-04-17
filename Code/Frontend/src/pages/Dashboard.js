import { useState, useEffect } from 'react';
import HeartSerivce from './../services/HeartRateService';
import SideBar from '../components/Navigation/SideBar';
import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Cookies from 'universal-cookie';
import BPMCard from './../components/Dashboard/BPMCard';
import Table from './../components/Dashboard/Table';
import Graph from './../components/Dashboard/Graph';
import NoData from './../components/Dashboard/NoData';
import moment from 'moment';
import Heading from './../components/Dashboard/Heading';
import Footer from './../components/Navigation/Footer';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import SelectDates from './../components/Dashboard/SelectDates';
import LoadingPage from './../components/Navigation/Loading';


const useStyles = makeStyles((theme) => ({
    content: {
        paddingTop: '25px',
        paddingRight: '25px',
        paddingLeft: '110px',
        '@media (min-width: 900px)': {
            paddingLeft: '265px',
          }, 
    },
    gridClass: {
        height: "",
        '@media (min-width: 1150px)': {
            height: '76vh'
          }, 
    },
    bpmCardClass: {
        width: "100%",
        '@media (min-width: 600px)': {
            width: ""
          }, 
    },
    footerClass: {
        '@media (min-width: 1150px)': {
            position: 'absolute', 
            bottom: '0', 
            width: 'calc(100% - 110px)',
            '@media (min-width: 900px)': {
                width: 'calc(100% - 265px)',
            }, 
        }
    },
    welcome: {
        textAlign: 'left',
        fontWeight: '300',
        fontSize: '28px'
    },
    output: {
        textAlign: 'left',
        fontWeight: '100',
        fontSize: '22px'
    },
}));

function createData(unNum, bpm, date) {
    return {unNum, bpm, date };
}

const Dashboard = () => {
    const matchWidth = useMediaQuery('(min-width:1150px)');
    const matchWidthSec = useMediaQuery('(min-width:600px)');

    const classes = useStyles();
    const cookies = new Cookies();
    const curAppleId = cookies.get('currAppleId');
    const displayName = cookies.get('displayName');
    const [heartData, setHeartData] = useState([]);
    const [rows, setRows] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [openNoData, setOpenNoData] = useState(false);
    const [datesButtonDis, setDatesButtonDis] = useState(false);
    const [openDate, setOpenDate] = useState(false);
    const [avgRate, setAvgRate] = useState(0);
    const [lastRec, setLastRec] = useState(0);
    const [selectedDateFrom, setSelectedDateFrom] = useState(new Date());
    const [selectedDateTo, setSelectedDateTo] = useState(new Date());
    const [data, setData] = useState(JSON.parse("{}"));
    const [viewData, setViewData] = useState('full')
    const [isLoadingPage, setIsLoadingPage] = useState(false);

    if(cookies.get('currAppleId') === undefined){
        window.location.href = '/'
    }


    useEffect(() => {
        setIsLoadingPage(true)
        HeartSerivce.getUsers(curAppleId).then(response => {
            let arr = [];
            Object.keys(response.data).forEach(function(key) {
                let currDate = moment(response.data[key].date);
                let HeartRate = {
                    bpm: response.data[key].bpm,
                    date: currDate,
                    user_id: response.data[key].userid
                }
                arr.push(HeartRate);
            });
            let arrTable = arr.reverse();
            if(arrTable.length <= 0)
            {
                setDatesButtonDis(true);
                setOpenNoData(true);
            } else {
                setLastRec(arrTable[0].bpm);
                setHeartData(arrTable);
                let data = [];
                for(let i = 0; i < arrTable.length; i++){
                    data.push(createData(i, arrTable[i].bpm, arrTable[i].date.format('lll')));
                }
                setRows(data);
                let chartdata = "{";
                let currAveRate = 0;
                for(let i = ((page * rowsPerPage)); i < ((page * rowsPerPage) + rowsPerPage); i++){
                    if(i > arrTable.length - 1)
                    {
                        chartdata = chartdata.substr(0, chartdata.length -1);
                        break; 
                    }
                    currAveRate += arrTable[i].bpm;
                    chartdata += '"' + arrTable[i].date.format('MMM D h:m.s') + '": ' + arrTable[i].bpm;
                    if(i !== ((page * rowsPerPage) + rowsPerPage) - 1){
                        chartdata += ",";
                    }
                }
                chartdata += "}"
                setData(JSON.parse(chartdata));
                setAvgRate(Math.round(currAveRate / rowsPerPage));
            }
        })
        setIsLoadingPage(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        generteGraphData(heartData, rows.length, rowsPerPage, newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
        //updateGraph(0, +event.target.value, heartData);
        generteGraphData(heartData, rows.length, +event.target.value, page);
    };

    const handleCloseNoData = () => {
        setOpenNoData(false);
    };

    const handleClickOpenDate = () => {
        setOpenDate(true);
    };

    const handleCloseDate = () => {
        let dateFrom = moment(selectedDateFrom);
        let dateTo = moment(selectedDateTo);
        if(dateFrom.isAfter(dateTo) || dateTo.isBefore(dateFrom)){
            alert("The date start must not be after the end date or the end date must not be before the start date!");
        } else {
            setOpenDate(false);
            let tableData = [];
            let chartData = "{";
            let heartRates = 0;
            let numRates = 0;
            for(let i = 0; i < heartData.length; i++){
                let currDate = heartData[i].date;
                if(currDate.isAfter(dateFrom) && currDate.isBefore(dateTo)){
                    heartRates += heartData[i].bpm;
                    numRates++;
                    tableData.push(createData(i, heartData[i].bpm, heartData[i].date.format('lll')));
                    chartData += '"' + heartData[i].date.format('MMM D, YYYY h:m.s') + '": ' + heartData[i].bpm + ',';
                }
            }
            if (numRates > 0) {
                setAvgRate(Math.round(heartRates / numRates))
                chartData = chartData.substring(0, chartData.length - 1)
                chartData += "}"
                setRows(tableData);
                setPage(0);
                setRowsPerPage(-1);
                setData(JSON.parse(chartData));
            } else {
                setOpenDate(true);
                alert("No data found between those dates");
            }
        }
    };

    const handleDateChangeFrom = (date) => {
        setSelectedDateFrom(date);
    };

    const handleDateChangeTo = (date) => {
        setSelectedDateTo(date);
    };

    const handleReset = () => {
        setOpenDate(false);
        setRowsPerPage(10)
        setPage(0);
        generteGraphData(heartData, heartData.length, 10, 0);
    }

    const handelRefresh = () => {
        setViewData("full")
        HeartSerivce.getUsers(curAppleId).then(response => {
            let arr = [];
            Object.keys(response.data).forEach(function(key) {
                let currDate = moment(response.data[key].date);
                let HeartRate = {
                    bpm: response.data[key].bpm,
                    date: currDate,
                    user_id: response.data[key].userid
                }
                arr.push(HeartRate);
            });
            let arrTable = arr.reverse();
            setLastRec(arrTable[0].bpm);
            if(arrTable.length <= 0)
            {
                setDatesButtonDis(true);
                setOpenNoData(true);
            } else {
                setHeartData(arrTable);
                let data = [];
                for(let i = 0; i < arrTable.length; i++){
                    data.push(createData(i, arrTable[i].bpm, arrTable[i].date.format('lll')));
                }
                setRows(data);
                let chartdata = "{";
                let currAveRate = 0;
                for(let i = ((page * rowsPerPage)); i < ((page * rowsPerPage) + rowsPerPage); i++){
                    if(i > arrTable.length - 1)
                    {
                        chartdata = chartdata.substr(0, chartdata.length -1);
                        break; 
                    }
                    currAveRate += arrTable[i].bpm;
                    chartdata += '"' + arrTable[i].date.format('MMM D h:m.s') + '": ' + arrTable[i].bpm;
                    if(i !== ((page * rowsPerPage) + rowsPerPage) - 1){
                        chartdata += ",";
                    }
                }
                chartdata += "}"
                setData(JSON.parse(chartdata));
                setAvgRate(Math.round(currAveRate / rowsPerPage));
            }
        })
    }

    const handleTableClick = () => {
        setViewData("table");
    }

    const handleGraphClick = () => {
        setViewData("graph");
    }

    const generteGraphData = (tableData, length, numElements, page) => {
        if(numElements !== -1)
        {
            let chartdata = "{";
            let currAveRate = 0;
            for(let i = ((page * numElements)); i < ((page * numElements) + numElements); i++){
                if(i > tableData.length - 1)
                {
                    chartdata = chartdata.substr(0, chartdata.length -1);
                    break; 
                }
                currAveRate += tableData[i].bpm;
                chartdata += '"' + tableData[i].date.format('MMM D h:m.s') + '": ' + tableData[i].bpm;
                if(i !== ((page * numElements) + numElements) - 1){
                    chartdata += ",";
                }
            }
            chartdata += "}"
            setData(JSON.parse(chartdata));
            setAvgRate(Math.round(currAveRate / numElements));
        } else {
            let chartdata = "{";
            let currAveRate = 0;
            for(let i = 0; i < length; i++){
                currAveRate += tableData[i].bpm;
                chartdata += '"' + tableData[i].date.format('MMM D h:m.s') + '": ' + tableData[i].bpm;
                if(i !== length - 1){
                    chartdata += ",";
                }
            }
            chartdata += "}"
            setData(JSON.parse(chartdata));
            setAvgRate(Math.round(currAveRate / length));
        }
    }

    var body =  <Grid container className={classes.gridClass}>
                    <Grid item sm={matchWidth ? 6 : 12} style={{padding: '10px', height: '100%'}}>
                        <Table
                            rows={rows}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            handleChangePage={handleChangePage}
                            handleChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </Grid>
                    <Grid item sm={matchWidth ? 6 : 12}>
                        <div style={{padding: '10px'}} >
                            <Graph data={data}/>
                        </div>
                        <Grid container className={classes.bpmCardClass}>
                            <Grid item sm={matchWidthSec ? 6 : 12} style={{width: '100%'}}>
                                <div style={{paddingRight: '10px', paddingLeft: '10px', paddingTop: '10px', width: '100%'}}>
                                    <BPMCard title={"Average Heart Rate"} bpm={avgRate}/>
                                </div>
                            </Grid>
                            <Grid item sm={matchWidthSec ? 6 : 12} style={{width: '100%'}}>
                                <div style={{paddingRight: '10px', paddingLeft: '10px', paddingTop: '10px', width: '100%'}}>
                                    <BPMCard title={"Last Recoded Heart Rate"} bpm={lastRec}/>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>;
    if(viewData === "table"){
        body =  <div style={{padding: '15px', height: '77vh', width: '100%'}}>
                    <Table 
                        rows={rows}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </div>
    } else if (viewData === "graph"){
        body =  <div style={{padding: '15px', width: '100%'}}>
                    <Graph height={'66vh'} data={data}/> 
                </div>
    }

    return (
        <div>
            <LoadingPage 
                open={isLoadingPage}
            />
            <NoData 
                displayName={displayName}
                openNoData={openNoData}
                setOpenNoData={setOpenNoData}
                handleCloseNoData={handleCloseNoData}
            />
            <SelectDates
                openDate={openDate}
                handleCloseDate={handleCloseDate}
                selectedDateFrom={selectedDateFrom}
                selectedDateTo= {selectedDateTo}
                handleDateChangeFrom={handleDateChangeFrom}
                handleDateChangeTo={handleDateChangeTo}
                handleReset={handleReset}
            />
            <SideBar 
                handleTableClick={handleTableClick}
                handleGraphClick={handleGraphClick}
            />
            <div className={classes.content}>
                <div classes={classes.smallContent}>
                    <Heading 
                        displayName={displayName}
                        datesButtonDis={datesButtonDis}
                        handleClickOpenDate={handleClickOpenDate}
                        handelRefresh={handelRefresh}
                    />
                    {body}
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default Dashboard
