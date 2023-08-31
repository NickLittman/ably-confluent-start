import React from 'react';
import Ably from 'ably';

const DisplayJson = ({ data }: { data: Ably.Types.Message }) => {  
  return (
    <div className="space-y-2">
      {Object.entries(data).map(([key, value]) => {
        if (typeof value === 'object' && value !== null && key !== 'data') {
          return (
            <div key={key}>
              <strong>{key}:</strong>
              <div className="pl-4">
                <DisplayJson data={value} />
              </div>
            </div>
          );
        }

        if (key === 'data') return;
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
