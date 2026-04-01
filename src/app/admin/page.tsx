import AdminDashboardClient from "@/components/admin-dashboard-client";

export default function AdminDashboardPage() {
  return (
    <div className="container py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-dark">Admin dashboard</h1>
        <p className="text-dark/60 mt-1 text-sm">
          Approve listings, track who opened a property, and see buyer interest (with like/dislike).
        </p>
      </div>
      <div className="grid md:grid-cols-4 gap-4">
        <div className="glass rounded-2xl p-4 text-dark shadow-sm text-sm text-dark/70">
          Tip: create <code className="text-primary">admins/your-uid</code> in Firestore for access.
        </div>
      </div>
      <AdminDashboardClient />
    </div>
  );
}
