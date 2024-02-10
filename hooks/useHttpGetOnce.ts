import { useEffect, useState } from "react";


type ProcessDataFn<T,R> = (data: T) => R;
/**
 * Custom React hook for fetching data using the HTTP GET method.
 *
 * @template T - The type of the original data fetched from the API.
 * @template R - The type of the processed data after applying the processData function.
 *
 * @param {string} url - The URL of the API endpoint to fetch data from.
 * @param {ProcessDataFn<T, R>} [processData] - Optional function to preprocess the fetched data before setting it in the state.
 * @returns {{
*   data: R | null,               // The processed data after applying the processData function, or null if data is not fetched yet.
*   error: string | null,         // Error message if there's an issue with the API request, otherwise null.
*   isLoading: boolean            // True if data is currently being fetched, false otherwise.
* }}
*/

//TODO: useHttpGetOnce should expose a get() method rather than running 
const useHttpGetOnce  = <T extends object,R extends object>(
    url: string,
    processData: ProcessDataFn<T,R> = (data) => data as unknown as R
) => {
    const [data, setData] = useState<R>([] as R);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsloading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsloading(true);
            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                });
                if (!response.ok) {
                    setError('Error with WEB API')
                    throw new Error("Network response was not ok");
                }
                const results: T = await response.json();
                const processedData: R = processData(results);
                setData(processedData);
                setIsloading(false);
            } catch (err) {
                console.error(err);
                setError(JSON.stringify(err));
                setIsloading(false);
            }
        };
        fetchData();
    }, []);


    //Return Hooks
    //return { data, setData, error, isLoading };
    return {data, setData, error, isLoading };
};

export default useHttpGetOnce ;