
import React from 'react';

const Stats = () => {
  const stats = [
    { id: 1, name: 'Active Farmers', value: '2,500+' },
    { id: 2, name: 'Verified Buyers', value: '850+' },
    { id: 3, name: 'Markets Connected', value: '120+' },
    { id: 4, name: 'Revenue Increased', value: '35%' },
  ];

  return (
    <div className="bg-green-600 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Trusted by farmers nationwide
          </h2>
          <p className="mt-3 text-xl text-green-100 sm:mt-4">
            Join thousands of farmers who have increased their profits with FarmConnect
          </p>
        </div>
        <dl className="mt-10 text-center sm:max-w-3xl sm:mx-auto sm:grid sm:grid-cols-4 sm:gap-8">
          {stats.map((stat) => (
            <div key={stat.id} className="flex flex-col">
              <dt className="order-2 mt-2 text-lg leading-6 font-medium text-green-100">
                {stat.name}
              </dt>
              <dd className="order-1 text-5xl font-extrabold text-white">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default Stats;
