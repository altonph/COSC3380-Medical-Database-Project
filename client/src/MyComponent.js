import React, { useEffect, useState } from 'react';

function MyComponent() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://cosc3380-medical-database-project-server-cfx9qpwg7.vercel.app')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setData(data);
      })
      .catch(error => {
        setError(error);
      });
  }, []); // Runs once when component mounts

  return (
    <div>
      {error && <p>Error: {error.message}</p>}
      {data && (
        <div>
          <p>Data:</p>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default MyComponent;
