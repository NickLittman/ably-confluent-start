import React from 'react';
import Ably from 'ably';

const DisplayJson = ({ data }: { data: Ably.Types.Message }) => {  
  return (
    <div className="space-y-2">
      {Object.entries(data).map(([key, value]) => {
        // If the value is an object, render it recursively
        if (typeof value === 'object' && value !== null) {
          return (
            <div key={key}>
              <strong>{key}:</strong>
              <div className="pl-4">
                <DisplayJson data={value} />
              </div>
            </div>
          );
        }

        // If the value is not an object, render it as a simple key-value pair
        return (
          <div key={key}>
            <strong>{key}:</strong> {String(value)}
          </div>
        );
      })}
    </div>
  );
};

export default DisplayJson;
