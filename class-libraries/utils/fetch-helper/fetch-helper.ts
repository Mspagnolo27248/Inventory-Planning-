


export async function getFromApi<T>(uri:string):Promise<T> {
    return new Promise((resolve, reject) => {
        fetch(uri, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    reject(new Error(`Network response was not ok status:${response.status}`));
                }
                return response.json();
            })
            .then(data => resolve(data))
            .catch((error: Error) => reject(error));
    })
};


/**
 * Helper function to make a POST request to an API endpoint with the provided data.
 * @param uri The URI of the API endpoint.
 * @param data The data to be sent in the request body.
 * @returns A promise that resolves to the response data.
 */
export async function postToApi<T>(uri: string, data: any): Promise<T> {
    return new Promise((resolve, reject) => {
      fetch(uri, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => {
          if (!response.ok) {
            reject(new Error(`Network response was not ok status:${response.status}`));
          }
          return response.json();
        })
        .then(data => resolve(data))
        .catch((error: Error) => reject(error));
    });
  }
  


  /**
 * Helper function to make a PUT request to an API endpoint with the provided data.
 * @param uri The URI of the API endpoint.
 * @param data The data to be sent in the request body.
 * @returns A promise that resolves to the response data.
 */
export async function putToApi<T>(uri: string, data: any): Promise<T> {
  return new Promise((resolve, reject) => {
    fetch(uri, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (!response.ok) {
          reject(new Error(`Network response was not ok status:${response.status}`));
        }
        return response.json();
      })
      .then(data => resolve(data))
      .catch((error: Error) => reject(error));
  });
}


 

type Fetcher<T> = () => Promise<T>;

export function getFromCacheOrFetcher<T>(cacheName: string, fetcher: Fetcher<T>): Promise<T> {
  // Check if the data is cached
  const cachedData = sessionStorage.getItem(cacheName);

  if (cachedData) {
    try {
      // Parse and return the cached data
      const parsedData: T = JSON.parse(cachedData);
      return Promise.resolve(parsedData);
    } catch (error) {
      // Handle JSON parsing error or other cache-related errors
      
      console.error("Error parsing cached data:", error);
      // Fall through to fetching fresh data
    }
  }

  // Fetch data from the fetcher function
  return fetcher()
    .then((data) => {      
      // Cache the fetched data for future use
      sessionStorage.setItem(cacheName, JSON.stringify(data));
      return data;
    })
    .catch((error) => {
      // Handle fetch errors
      console.error("Error fetching data:", error);
      throw error; // Rethrow the error for the caller to handle
    });
}
