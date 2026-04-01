export default function UserDashboardPage() {
  return (
    <div className="container py-10 space-y-6">
      <h1 className="text-3xl font-semibold text-dark">User Dashboard</h1>
      <div className="grid md:grid-cols-4 gap-4">
        <div className="glass rounded-2xl p-4 text-dark shadow-sm">My Listings: 2</div>
        <div className="glass rounded-2xl p-4 text-dark shadow-sm">Total Views: 500</div>
        <div className="glass rounded-2xl p-4 text-dark shadow-sm">Lead Inquiries: 18</div>
        <div className="glass rounded-2xl p-4 text-dark shadow-sm">Plan: Free</div>
      </div>
      <div className="glass rounded-2xl p-5 shadow-sm">
        <h2 className="font-semibold mb-2 text-dark">Manage Listings</h2>
        <p className="text-dark/70">Add / Edit / Delete property controls can be connected to Firestore and Storage actions.</p>
      </div>
    </div>
  );
}
