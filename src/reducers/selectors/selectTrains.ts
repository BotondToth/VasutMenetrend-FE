import {State} from "../../store";
import {TrainState} from "../../models/TrainResponse";

export const selectTrains = (state: State): TrainState => state.trains;
