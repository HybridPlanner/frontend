import { getFutureMeetings, getPreviousMeetings } from "@/api/meetings";
import { Meeting } from "@/types/Meeting";
import { sortMeetings } from "@/utils/date";
import { useCallback, useEffect, useState } from "react";

/**
 * Custom hook for fetching meetings data.
 * @returns An object containing functions and state variables related to fetching meetings.
 */
export default function useFetchMeetings() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Meeting[] | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  const [previousData, setPreviousData] = useState<Meeting[] | undefined>(
    undefined
  );

  /**
   * Fetches future meetings from the server and updates the component state.
   * @returns {Promise<void>} A promise that resolves when the fetch is complete.
   */
  const fetchFutureMeetings = useCallback(async () => {
    console.debug("Fetching future meetings");
    setLoading(true);
    try {
      const meetings = await getFutureMeetings();
      console.debug("Future meeting fetched: %d", meetings.length);

      sortMeetings(meetings);
      setData(meetings);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  }, [setData, setError]);

  /**
   * Fetches previous meetings and updates the state with the fetched data.
   * If there are no previous meetings, it fetches meetings until the current date.
   * 
   * @returns {void}
   */
  const fetchPreviousMeetings = useCallback(async () => {
    console.debug("Fetching previous meetings");
    setLoading(true);
    try {
      let previous_date: Date;
      if (!previousData) {
        console.debug("No previous meeting, fetching until now");
        previous_date = new Date();
      } else {
        const last = previousData[previousData?.length - 1];
        previous_date = last.start_date;
      }

      const meetings = await getPreviousMeetings(previous_date);
      sortMeetings(meetings);
      console.debug(
        "Previous meeting fetched until %O: %d",
        previous_date,
        meetings.length
      );
      setPreviousData([...(previousData ?? []), ...meetings]);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  }, [setPreviousData, setError]);

  // Fetch future meetings on component mount
  useEffect(() => {
    fetchFutureMeetings();
  }, []);


  /**
   * Refreshes the meeting list by resetting the data and error states, and then fetching future meetings.
   */
  const refreshMeetingList = useCallback(async () => {
    setData(undefined);
    setError(undefined);
    await fetchFutureMeetings();
  }, [setData, fetchFutureMeetings]);

  useEffect(() => {
    let timeout: number;
    if (!(data instanceof Array) && error === undefined) {
      timeout = window.setTimeout(() => {
        setError("Something went wrong");
      }, 5000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [data, error]);

  return {
    fetchFutureMeetings,
    fetchPreviousMeetings,
    refreshMeetingList,
    data,
    previousData,
    loading,
    error,
  };
}
