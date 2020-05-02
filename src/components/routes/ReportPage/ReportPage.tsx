import React, {ReactElement, useEffect} from "react";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Select} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import jsPDF from "jspdf";
import 'jspdf-autotable'
import {getReports} from "../../../actions/reportAction";
import {useDispatch, useSelector} from "react-redux";
import {selectReports} from "../../../reducers/selectors/reportsSelector";

const useStyles = makeStyles({
    leftTable: {
        width: '30%',
        float: 'left',
        marginTop: '100px'
    },
    rightTable: {
        width: '65%',
        marginRight: '0px',
        marginLeft: 'auto',
        marginTop: '100px'
    },
    yearSelector: {
        float: 'right',
        padding: '20px'
    },
    saveButton: {
        float: 'right',
        padding: "10px",
        margin: "20px"
    }
});

export default function ReportPage() {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [selectedYear, setSelectedYear] = React.useState(new Date().getFullYear());
    const reportsState = useSelector(selectReports);

    useEffect(() => {
        dispatch(getReports());
    }, [dispatch]);


    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSelectedYear(event.target.value as number);
        financialDataForYear = {
            income: getOutgoingsForYear(),
            outgoings: getOutgoingsForYear()
        };
    };

    const getIncomeForYear = () => {
        return reportsState.reports.filter(row => row.year === selectedYear).reduce((a, b) => +a + +b.income, 0);
    };

    const getOutgoingsForYear = () => {
        return reportsState.reports.filter(row => row.year === selectedYear).reduce((a, b) => +a + +(b.profit - b.income), 0);
    };

    const getProfitForYear = () => {
        return financialDataForYear.income - Math.abs(financialDataForYear.outgoings);
    };

    const downloadReport = () => {
        const doc = new jsPDF();
        // @ts-ignore
        doc.autoTable({ html: '#sales-table' });
        doc.save(`report-${selectedYear}.pdf`)
    };

    const getMenuItems = (): ReactElement[] => {
        const uniqueYears: number[] = [];
        reportsState.reports.forEach(report => {
            if (!uniqueYears.includes(report.year)) {
                uniqueYears.push(report.year)
            }
        });

        return uniqueYears.map((year, idx) => {
                return <MenuItem key={idx} value={year}>{year}</MenuItem>
            });
    };

    let financialDataForYear = {
        income: getIncomeForYear(),
        outgoings: getOutgoingsForYear()
    };

    return (
        <>
            <TableContainer component={Paper}>
                <div>
                    <Select
                        labelId="year-select-label"
                        id="year-select"
                        value={selectedYear}
                        onChange={handleChange}
                        className={classes.yearSelector}
                    >
                        {
                            getMenuItems()
                        }
                    </Select>
                </div>

                <Table className={classes.leftTable} aria-label="summary-table">
                    <TableBody>
                        <TableRow key="incomeRow">
                            <TableCell align="left">Éves bevétel:</TableCell>
                            <TableCell align="right">{financialDataForYear.income} Ft</TableCell>
                        </TableRow>
                        <TableRow key="outgoingsRow">
                            <TableCell align="left">Éves kiadás:</TableCell>
                            <TableCell align="right">{financialDataForYear.outgoings} Ft</TableCell>
                        </TableRow>
                        <TableRow key="endRow">
                            <TableCell align="left">Éves profit:</TableCell>
                            <TableCell align="right">{getProfitForYear()} Ft</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

                <Table className={classes.rightTable} aria-label="sales-table" id="sales-table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Hónap</TableCell>
                            <TableCell align="right">Eladott jegyek száma</TableCell>
                            <TableCell align="right">Kedvezményes</TableCell>
                            <TableCell align="right">Bevétel (Ft)</TableCell>
                            <TableCell align="right">Profit</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reportsState.reports.map((row, idx) => (
                            row.year === selectedYear &&
                            <TableRow key={idx}>
                                <TableCell component="th" scope="row">
                                    {row.month}
                                </TableCell>
                                <TableCell align="right">{row.sold}</TableCell>
                                <TableCell align="right">{row.discountTickets}</TableCell>
                                <TableCell align="right">{row.income}</TableCell>
                                <TableCell align="right">{row.profit}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Button variant="outlined" color="secondary" className={classes.saveButton} onClick={() => {downloadReport()}}>
                    Mentés
                </Button>
            </TableContainer>
        </>
    );
}