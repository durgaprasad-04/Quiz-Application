import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";


/** redux actions */
import * as Action from '../redux/question_reducer'
import { getServerData } from "../helper/helper";

/** fetch question hook to fetch api data and set value to store */
// Import statements...

export const useFetchQestion = () => {
    const dispatch = useDispatch();   
    const [getData, setGetData] = useState({ isLoading: false, apiData: [], serverError: null });

    useEffect(() => {
        setGetData(prev => ({ ...prev, isLoading: true }));

        (async () => {
            try {
               const  [{ questions, answers }]  = await getServerData(`http://localhost:5000/api/questions`,(data) => data)
                if (questions.length > 0) {
                    setGetData(prev => ({ ...prev, isLoading: false, apiData: questions }));
                    dispatch(Action.startExamAction({ question: questions, answers }));
                } else {
                    throw new Error("No Question Available");
                }
            } catch (error) {
                setGetData(prev => ({ ...prev, isLoading: false, serverError: error }));
            }
        })();
    }, [dispatch]);

    // Return statement...


    return [getData, setGetData];

}

/** MoveAction Dispatch function */
export const MoveNextQuestion = () => async (dispatch) => {
    try {
        dispatch(Action.moveNextAction()); /** increase trace by 1 */
    } catch (error) {
        console.log(error)
    }
}

/** PrevAction Dispatch function */
export const MovePrevQuestion = () => async (dispatch) => {
    try {
        dispatch(Action.movePrevAction()); /** decrease trace by 1 */
    } catch (error) {
        console.log(error)
    }
}