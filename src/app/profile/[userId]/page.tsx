"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { User, Mail, Calendar, Globe, ExternalLink, Edit, ArrowLeft, FileText, ImageIcon, Heart, Eye } from "lucide-react";
import { API_BASE_URL, validateApiUrl } from "../../../config";
import toast from "react-hot-toast";
import Link from "next/link";

export default function ProfilePage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.userId as string;
  
  const [profile, setProfile] = useState<any>(null);
  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const isOwnProfile = false;

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setCurrentUser(user);
      if (user._id === userId) {
        // This is the user's own profile
      }
    }
    fetchProfile();
    fetchTemplates();
  }, [userId]);

  const fetchProfile = async () => {
    if (!validateApiUrl()) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/users/profile/${userId}`);
      if (res.ok) {
        const data = await res.json();
        setProfile(data.user);
      } else {
        toast.error("Profile not found");
        router.push("/templates");
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
      toast.error("Error loading profile");
    } finally {
      setLoading(false);
    }
  };

  const fetchTemplates = async () => {
    if (!validateApiUrl()) {
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/users/${userId}/templates`);
      if (res.ok) {
        const data = await res.json();
        setTemplates(data.templates || []);
      }
    } catch (err) {
      console.error("Error fetching templates:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center">
        <div className="text-white text-xl">Loading profile...</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center">
        <div className="text-white text-xl">Profile not found</div>
      </div>
    );
  }

  const isOwn = currentUser && currentUser._id === userId;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black py-20 px-4 sm:px-6 lg:px-8">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Back Button */}
        <Link
          href="/templates"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Templates
        </Link>

        {/* Profile Header */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl p-8 mb-8 border border-white/10 shadow-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-24 h-24 rounded-full border-4 border-purple-500/50 object-cover"
                />
              ) : (
                <div className="w-24 h-24 rounded-full border-4 border-purple-500/50 bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                  <User size={40} className="text-white" />
                </div>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">{profile.name}</h1>
                  <p className="text-gray-400">@{profile.username}</p>
                </div>
                {isOwn && (
                  <Link
                    href="/account?tab=profile"
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg font-semibold transition-all hover:scale-105 flex items-center gap-2"
                  >
                    <Edit size={18} />
                    Edit Profile
                  </Link>
                )}
              </div>

              {profile.bio && (
                <p className="text-gray-300 mb-4">{profile.bio}</p>
              )}

              {/* Profile Stats */}
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-400">
                  <Mail size={16} />
                  {profile.email}
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Calendar size={16} />
                  Joined {new Date(profile.createdAt).toLocaleDateString()}
                </div>
                {profile.portfolioLink && (
                  <a
                    href={profile.portfolioLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    <ExternalLink size={16} />
                    Portfolio
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Templates Section */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <FileText size={24} />
            Templates Created ({templates.length})
          </h2>

          {templates.length === 0 ? (
            <div className="text-center py-16 bg-white/5 rounded-2xl border border-white/10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/5 rounded-full mb-4">
                <FileText className="text-gray-500" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No templates yet</h3>
              <p className="text-gray-400">
                {isOwn ? "Start creating templates to see them here!" : "This user hasn't created any public templates yet."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template) => (
                <div
                  key={template._id}
                  onClick={() => router.push(`/builder?saved=${template._id}`)}
                  className="group relative cursor-pointer rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-950 shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 border border-white/10"
                >
                  {/* Thumbnail */}
                  <div className="relative overflow-hidden">
                    {template.thumbnail ? (
                      <img
                        src={template.thumbnail}
                        alt={template.name}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-48 bg-white/5 flex items-center justify-center">
                        <ImageIcon className="text-gray-500" size={32} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-40 group-hover:opacity-80 transition-opacity duration-300" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                      {template.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                      <span className="flex items-center gap-1">
                        <FileText size={14} />
                        {template.layout?.length || 0} Sections
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:scale-105 transition-transform text-sm flex items-center justify-center gap-2">
                        <Eye size={16} />
                        View Template
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

