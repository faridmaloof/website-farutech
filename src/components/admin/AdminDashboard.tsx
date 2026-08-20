import { useEffect, useState } from 'react';
import { FolderOpen, FileText, Globe, MessageSquare, Users } from 'lucide-react';

interface DashboardStats {
  totalServices: number;
  activeServices: number;
  totalApplicationTypes: number;
  totalLocations: number;
  totalBlogPosts: number;
  publishedPosts: number;
  totalLeads: number;
  newLeadsThisWeek: number;
}

const defaultStats: DashboardStats = {
  totalServices: 0,
  activeServices: 0,
  totalApplicationTypes: 0,
  totalLocations: 0,
  totalBlogPosts: 0,
  publishedPosts: 0,
  totalLeads: 0,
  newLeadsThisWeek: 0,
};

export function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>(defaultStats);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setStats({
      totalServices: 6,
      activeServices: 6,
      totalApplicationTypes: 105,
      totalLocations: 0,
      totalBlogPosts: 0,
      publishedPosts: 0,
      totalLeads: 0,
      newLeadsThisWeek: 0,
    });
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const statCards = [
    { name: 'Servicios', value: stats.totalServices, icon: FolderOpen, subtext: `${stats.activeServices} activos` },
    { name: 'Tipos de Aplicación', value: stats.totalApplicationTypes, icon: FileText, subtext: 'Total registrados' },
    { name: 'Ubicaciones', value: stats.totalLocations, icon: Globe, subtext: 'Países/Estados/Ciudades' },
    { name: 'Leads', value: stats.totalLeads, icon: MessageSquare, subtext: `${stats.newLeadsThisWeek} esta semana` },
    { name: 'Blog Posts', value: stats.totalBlogPosts, icon: Users, subtext: `${stats.publishedPosts} publicados` },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statCards.map((card) => (
          <div key={card.name} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                <card.icon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">{card.name}</p>
                <p className="text-2xl font-semibold text-gray-900">{card.value}</p>
                <p className="text-xs text-gray-400 mt-1">{card.subtext}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Bienvenido al Panel de Administración</h2>
        <p className="text-gray-600 mb-4">Desde aquí puedes gestionar todos los aspectos del sitio web:</p>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          <li>Servicios y tipos de aplicación</li>
          <li>Ubicaciones geográficas</li>
          <li>Entradas del blog</li>
          <li>Información de contacto</li>
          <li>Leads y CRM</li>
        </ul>
      </div>
    </div>
  );
}

export default AdminDashboard;
