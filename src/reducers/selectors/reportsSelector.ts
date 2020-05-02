import {ReportState} from "../../models/ReportResponse";
import {State} from "../../store";

export const selectReports = (state: State): ReportState => state.reports;
