import { useEffect, useState,  } from "react";

function useAnimeData(query, variables = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAnimeData() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          "https://graphql.anilist.co",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              query,
              variables,
            }),
          }
        );

        const result = await response.json();

        if (result.errors) {
          throw new Error(result.errors[0].message);
        }

        setData(result.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchAnimeData();
  }, [query, variables]);

  return { data, loading, error };
}

export default useAnimeData;