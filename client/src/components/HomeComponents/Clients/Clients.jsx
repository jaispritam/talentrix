import React from "react";

const Clients = () => {
  const stats = [
    { value: "100k+", label: "Active Freelancers" },
    { value: "12k+", label: "Enterprise Clients" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "24h", label: "Average Match Time" },
  ];

  return (
    <section className="py-12">
      <div className="contain">
        <div className="surface-card p-6 sm:p-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((item) => (
              <div key={item.label} className="text-center lg:text-left">
                <h3 className="headline-display text-3xl sm:text-4xl font-bold text-slate-900">{item.value}</h3>
                <p className="text-sm text-textMuted mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clients;
