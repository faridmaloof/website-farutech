/**
 * Admin Dashboard Component
 * 
 * Main dashboard with metrics and recent activity.
 */

import React, { useEffect, useState } from 'react';
import { FolderOpen, FileText, Globe, MessageSquare, Users, TrendingUp } from 'lucide-react';

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

export function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      // In production, this would call the API
      // For now, using mock data
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
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Services',
      value: stats?.totalServices || 0,
      subtitle: `${stats?.activeServices || 0} active`,
      icon: FolderOpen,
      color: 'bg-blue-500',
    },
    {
      title: 'Application Types',
      value: stats?.totalApplicationTypes || 0,
      subtitle: 'Total categories',
      icon: FileText,
      color: 'bg-green-500',
    },
    {
      title: 'Locations',
      value: stats?.totalLocations || 0,
      subtitle: 'Countries/States/Cities',
      icon: Globe,
      color: 'bg-purple-500',
    },
    {
      title: 'Blog Posts',
      value: stats?.totalBlogPosts || 0,
      subtitle: `${stats?.publishedPosts || 0} published`,
      icon: MessageSquare,
      color: 'bg-orange-500',
    },
    {
      title: 'Total Leads',
      value: stats?.totalLeads || 0,
      subtitle: `${stats?.newLeadsThisWeek || 0} this week`,
      icon: Users,
      color: 'bg-pink-500',
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to FaruTech Admin Panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {statCards.map((card) => (
          <div
            key={card.title}
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{card.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
                <p className="text-xs text-gray-500 mt-1">{card.subtitle}</p>
              </div>
              <div className={`${card.color} p-3 rounded-lg`}>
                <card.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <a
            href="/admin/services/new"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <FolderOpen className="h-5 w-5 text-blue-600 mr-3" />
            <span className="font-medium text-gray-900">Add New Service</span>
          </a>
          <a
            href="/admin/blog/new"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <MessageSquare className="h-5 w-5 text-green-600 mr-3" />
            <span className="font-medium text-gray-900">Create Blog Post</span>
          </a>
          <a
            href="/admin/leads"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Users className="h-5 w-5 text-purple-600 mr-3" />
            <span className="font-medium text-gray-900">View All Leads</span>
          </a>
        </div>
      </div>

      {/* Recent Activity Placeholder */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="text-center py-8 text-gray-500">
          <TrendingUp className="h-12 w-12 mx-auto mb-3 text-gray-400" />
          <p>No recent activity to display</p>
        </div>
      </div>
    </div>
  );
}
