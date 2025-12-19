"use client";

import { useState, useEffect } from "react";
import { Heart, Save, Download, Trash2, Eye, Edit, Calendar, FileText, ExternalLink } from "lucide-react";
import { API_BASE_URL } from "../../config";
import { useRouter } from "next/navigation";

export default function AccountPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"wishlist" | "saved" | "exported">("wishlist");
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [savedTemplates, setSavedTemplates] = useState<any[]>([]);
  const [exportedTemplates, setExportedTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (!token || !storedUser) {
      router.push("/login");
      return;
    }

    setUser(JSON.parse(storedUser));
    fetchAllData(token);
  }, [router]);

  const fetchAllData = async (token: string) => {
    setLoading(true);
    try {
      const [wishlistRes, savedRes, exportedRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/templates/wishlist`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API_BASE_URL}/api/templates/saved`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API_BASE_URL}/api/templates/exported`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (wishlistRes.ok) {
        const data = await wishlistRes.json();
        setWishlist(data.wishlist || []);
      }

      if (savedRes.ok) {
        const data = await savedRes.json();
        setSavedTemplates(data.templates || []);
      }

      if (exportedRes.ok) {
        const data = await exportedRes.json();
        setExportedTemplates(data.exports || []);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveWishlist = async (templateSlug: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/templates/wishlist/${templateSlug}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setWishlist(wishlist.filter((item) => item.templateSlug !== templateSlug));
      }
    } catch (err) {
      console.error("Error removing from wishlist:", err);
    }
  };

  const handleDeleteSaved = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/templates/saved/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setSavedTemplates(savedTemplates.filter((t) => t._id !== id));
      }
    } catch (err) {
      console.error("Error deleting saved template:", err);
    }
  };

  const handleDeleteExported = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/templates/exported/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setExportedTemplates(exportedTemplates.filter((e) => e._id !== id));
      }
    } catch (err) {
      console.error("Error deleting exported template:", err);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatFileSize = (bytes: number) => {
    if (!bytes) return "N/A";
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-2">
            My Account
          </h1>
          <p className="text-gray-400">
            Welcome back, {user?.name || "User"}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-white/10 pb-4">
          <button
            onClick={() => setActiveTab("wishlist")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === "wishlist"
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                : "bg-white/5 text-gray-400 hover:text-white"
            }`}
          >
            <div className="flex items-center gap-2">
              <Heart size={18} />
              Wishlist ({wishlist.length})
            </div>
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === "saved"
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                : "bg-white/5 text-gray-400 hover:text-white"
            }`}
          >
            <div className="flex items-center gap-2">
              <Save size={18} />
              My Templates ({savedTemplates.length})
            </div>
          </button>
          <button
            onClick={() => setActiveTab("exported")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === "exported"
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                : "bg-white/5 text-gray-400 hover:text-white"
            }`}
          >
            <div className="flex items-center gap-2">
              <Download size={18} />
              Exported Templates ({exportedTemplates.length})
            </div>
          </button>
        </div>

        {/* Content */}
        <div>
          {/* WISHLIST TAB */}
          {activeTab === "wishlist" && (
            <div>
              {wishlist.length === 0 ? (
                <div className="text-center py-16">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white/5 rounded-full mb-4">
                    <Heart className="text-gray-500" size={32} />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">No wishlisted templates</h3>
                  <p className="text-gray-400 mb-6">Start adding templates to your wishlist from the Templates page</p>
                  <a
                    href="/templates"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:scale-105 transition-transform"
                  >
                    Browse Templates
                    <ExternalLink size={18} />
                  </a>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlist.map((item) => (
                    <div
                      key={item._id}
                      className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-950 shadow-xl border border-white/10 hover:border-purple-500/50 transition-all"
                    >
                      {item.templateThumbnail && (
                        <img
                          src={item.templateThumbnail}
                          alt={item.templateName}
                          className="w-full h-48 object-cover"
                        />
                      )}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-white mb-2">{item.templateName}</h3>
                        {item.templateCategory && (
                          <span className="inline-block px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold mb-4">
                            {item.templateCategory}
                          </span>
                        )}
                        <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                          <Calendar size={14} />
                          {formatDate(item.createdAt)}
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => router.push(`/builder?template=${item.templateSlug}`)}
                            className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:scale-105 transition-transform text-sm"
                          >
                            Use Template
                          </button>
                          <button
                            onClick={() => handleRemoveWishlist(item.templateSlug)}
                            className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* SAVED TEMPLATES TAB */}
          {activeTab === "saved" && (
            <div>
              {savedTemplates.length === 0 ? (
                <div className="text-center py-16">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white/5 rounded-full mb-4">
                    <Save className="text-gray-500" size={32} />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">No saved templates</h3>
                  <p className="text-gray-400 mb-6">Save your customized templates from the Builder page</p>
                  <a
                    href="/templates"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:scale-105 transition-transform"
                  >
                    Browse Templates
                    <ExternalLink size={18} />
                  </a>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedTemplates.map((template) => (
                    <div
                      key={template._id}
                      className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-950 shadow-xl border border-white/10 hover:border-purple-500/50 transition-all"
                    >
                      {template.thumbnail && (
                        <img
                          src={template.thumbnail}
                          alt={template.name}
                          className="w-full h-48 object-cover"
                        />
                      )}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-white mb-2">{template.name}</h3>
                        {template.originalTemplateSlug && (
                          <p className="text-sm text-gray-400 mb-2">
                            Based on: {template.originalTemplateSlug}
                          </p>
                        )}
                        <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                          <FileText size={14} />
                          {template.layout?.length || 0} sections
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                          <Calendar size={14} />
                          Updated {formatDate(template.updatedAt)}
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              // Store template data and navigate to builder
                              localStorage.setItem("savedTemplate", JSON.stringify(template));
                              router.push(`/builder?saved=${template._id}`);
                            }}
                            className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:scale-105 transition-transform text-sm flex items-center justify-center gap-2"
                          >
                            <Edit size={16} />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteSaved(template._id)}
                            className="px-4 py-2 bg-white/5 hover:bg-red-500/20 text-white rounded-lg transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* EXPORTED TEMPLATES TAB */}
          {activeTab === "exported" && (
            <div>
              {exportedTemplates.length === 0 ? (
                <div className="text-center py-16">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white/5 rounded-full mb-4">
                    <Download className="text-gray-500" size={32} />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">No exported templates</h3>
                  <p className="text-gray-400 mb-6">Export your templates from the Builder page to see them here</p>
                  <a
                    href="/templates"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:scale-105 transition-transform"
                  >
                    Browse Templates
                    <ExternalLink size={18} />
                  </a>
                </div>
              ) : (
                <div className="space-y-4">
                  {exportedTemplates.map((exportItem) => (
                    <div
                      key={exportItem._id}
                      className="rounded-2xl bg-gradient-to-br from-gray-900 to-gray-950 shadow-xl border border-white/10 p-6 hover:border-purple-500/50 transition-all"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-white">{exportItem.name}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              exportItem.status === "completed"
                                ? "bg-green-500/20 text-green-400"
                                : "bg-red-500/20 text-red-400"
                            }`}>
                              {exportItem.status}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                            <div className="flex items-center gap-2">
                              <FileText size={14} />
                              {exportItem.exportType.toUpperCase()}
                            </div>
                            {exportItem.fileSize && (
                              <div className="flex items-center gap-2">
                                <Download size={14} />
                                {formatFileSize(exportItem.fileSize)}
                              </div>
                            )}
                            <div className="flex items-center gap-2">
                              <Calendar size={14} />
                              {formatDate(exportItem.createdAt)}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteExported(exportItem._id)}
                          className="px-4 py-2 bg-white/5 hover:bg-red-500/20 text-white rounded-lg transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

