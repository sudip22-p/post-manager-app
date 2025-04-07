export default function AnalyticsCard({ title, value, icon, color }) {
  return (
    <div
      className={`bg-white rounded-xl shadow-md p-6 border-l-4 ${color} hover:shadow-lg transition-shadow`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-700 text-sm font-medium">{title}</p>
          <h3 className="text-2xl font-bold mt-1 text-gray-900">{value}</h3>
        </div>
        <div
          className={`p-3 rounded-full ${color
            .replace("border-l-", "bg-")
            .replace("-500", "-100")}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}
