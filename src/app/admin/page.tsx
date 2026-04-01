export default function AdminDashboardPage() {
  return (
    <div className="container py-10 space-y-6">
      <h1 className="text-3xl font-semibold text-dark">Admin Dashboard</h1>
      <div className="grid md:grid-cols-4 gap-4">
        <div className="glass rounded-2xl p-4 text-dark shadow-sm">Total Users: 1,254</div>
        <div className="glass rounded-2xl p-4 text-dark shadow-sm">Total Listings: 389</div>
        <div className="glass rounded-2xl p-4 text-dark shadow-sm">Leads Count: 1,120</div>
        <div className="glass rounded-2xl p-4 text-secondary font-semibold shadow-sm">Earnings: Rs 2,78,000</div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="glass rounded-2xl p-5 text-dark shadow-sm">Approve / Reject listings</div>
        <div className="glass rounded-2xl p-5 text-dark shadow-sm">Manage users and blog posts</div>
        <div className="glass rounded-2xl p-5 text-dark shadow-sm">Mark listings as featured</div>
        <div className="glass rounded-2xl p-5 text-dark shadow-sm">Track leads and deal commissions</div>
      </div>
    </div>
  );
}
