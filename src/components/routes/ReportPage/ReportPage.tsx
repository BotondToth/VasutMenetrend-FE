import React from "react";
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

function createData(year: number, month: string, sold: number, discount: number, income: number, profit: number) {
    return {year, month, sold, discount, income, profit};
}

//TODO: fetch rows from backend
const rows = [
    createData(2020,'Január', 543, 443, 325000, 10000),
    createData(2019, 'Február', 343, 143, 125000, -25000),
    createData(2018, 'Március', 720, 220, 525000, 20000),
    createData(2020,'Április', 610, 100, 424000, 80000),
];


export default function ReportPage() {
    const classes = useStyles();
    const [selectedYear, setSelectedYear] = React.useState(new Date().getFullYear());

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSelectedYear(event.target.value as number);
        financialDataForYear = {
            income: getOutgoingsForYear(),
            outgoings: getOutgoingsForYear()
        };
    };

    const getIncomeForYear = () => {
        return rows.filter(row => row.year === selectedYear).reduce((a, b) => +a + +b.income, 0);
    };

    const getOutgoingsForYear = () => {
        return rows.filter(row => row.year === selectedYear).reduce((a, b) => +a + +(b.profit - b.income), 0);
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
                        //TODO: fetch years from backend
                        <MenuItem value={2020}>2020</MenuItem>
                        <MenuItem value={2019}>2019</MenuItem>
                        <MenuItem value={2017}>2018</MenuItem>
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
                        {rows.map((row) => (
                            row.year === selectedYear &&
                            <TableRow key={row.month}>
                                <TableCell component="th" scope="row">
                                    {row.month}
                                </TableCell>
                                <TableCell align="right">{row.sold}</TableCell>
                                <TableCell align="right">{row.discount}</TableCell>
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