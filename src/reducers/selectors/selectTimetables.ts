import {State} from "../../store";
import {TimetableState} from "../../models/TimetableResponse";

export const selectTimetables = (state: State): TimetableState => state.timetables;
