"use client";

import { useState, useEffect } from "react";
import { Heart, Save, Download, Trash2, Eye, Edit, Calendar, FileText, ExternalLink, Lock, Globe, BarChart3, TrendingUp, Users, Upload, X, ImageIcon, User, Link as LinkIcon } from "lucide-react";
import { API_BASE_URL, validateApiUrl } from "../../config";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AccountPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"wishlist" | "saved" | "exported" | "profile">("saved");
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [savedTemplates, setSavedTemplates] = useState<any[]>([]);
  const [exportedTemplates, setExportedTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [showVisibilityModal, setShowVisibilityModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [newVisibility, setNewVisibility] = useState<boolean>(false);
  const [updatingVisibility, setUpdatingVisibility] = useState(false);
  
  // Thumbnail edit modal state
  const [showThumbnailModal, setShowThumbnailModal] = useState(false);
  const [editingThumbnailTemplate, setEditingThumbnailTemplate] = useState<any>(null);
  const [thumbnailValue, setThumbnailValue] = useState<string>("");
  const [thumbnailInputMode, setThumbnailInputMode] = useState<"upload" | "link">("upload");
  const [thumbnailLink, setThumbnailLink] = useState("");
  const [updatingThumbnail, setUpdatingThumbnail] = useState(false);
  
  // Delete confirmation modal state
  const [showDeleteSavedModal, setShowDeleteSavedModal] = useState(false);
  const [deleteSavedId, setDeleteSavedId] = useState<string | null>(null);
  const [deleteSavedName, setDeleteSavedName] = useState<string>("");
  const [deletingSaved, setDeletingSaved] = useState(false);
  
  const [showDeleteWishlistModal, setShowDeleteWishlistModal] = useState(false);
  const [deleteWishlistSlug, setDeleteWishlistSlug] = useState<string | null>(null);
  const [deleteWishlistName, setDeleteWishlistName] = useState<string>("");
  const [deletingWishlist, setDeletingWishlist] = useState(false);
  
  // Profile edit state
  const [profileBio, setProfileBio] = useState<string>("");
  const [profilePortfolioLink, setProfilePortfolioLink] = useState<string>("");
  const [profileAvatar, setProfileAvatar] = useState<string>("");
  const [updatingProfile, setUpdatingProfile] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (!token || !storedUser) {
      router.push("/login");
      return;
    }

    const userData = JSON.parse(storedUser);
    setUser(userData);
    setProfileBio(userData.bio || "");
    setProfilePortfolioLink(userData.portfolioLink || "");
    setProfileAvatar(userData.avatar || "");
    fetchAllData(token);
  }, [router]);

  const fetchAllData = async (token: string) => {
    if (!validateApiUrl()) {
      setLoading(false);
      toast.error("API configuration error. Please check your environment variables.");
      return;
    }
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

  const handleRemoveWishlistClick = (templateSlug: string, templateName: string) => {
    setDeleteWishlistSlug(templateSlug);
    setDeleteWishlistName(templateName);
    setShowDeleteWishlistModal(true);
  };

  const confirmDeleteWishlist = async () => {
    if (!deleteWishlistSlug) return;
    
    const token = localStorage.getItem("token");
    if (!token) return;

    setDeletingWishlist(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/templates/wishlist/${deleteWishlistSlug}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setWishlist(wishlist.filter((item) => item.templateSlug !== deleteWishlistSlug));
        setShowDeleteWishlistModal(false);
        setDeleteWishlistSlug(null);
        setDeleteWishlistName("");
        toast.success("Removed from wishlist");
      } else {
        const error = await res.json();
        toast.error(error.message || "Failed to remove from wishlist");
      }
    } catch (err) {
      console.error("Error removing from wishlist:", err);
      toast.error("Error removing from wishlist. Please try again.");
    } finally {
      setDeletingWishlist(false);
    }
  };

  const handleDeleteSavedClick = (id: string, name: string) => {
    setDeleteSavedId(id);
    setDeleteSavedName(name);
    setShowDeleteSavedModal(true);
  };

  const confirmDeleteSaved = async () => {
    if (!deleteSavedId) return;
    
    const token = localStorage.getItem("token");
    if (!token) return;

    setDeletingSaved(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/templates/saved/${deleteSavedId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setSavedTemplates(savedTemplates.filter((t) => t._id !== deleteSavedId));
        setShowDeleteSavedModal(false);
        setDeleteSavedId(null);
        setDeleteSavedName("");
        toast.success("Template deleted successfully");
      } else {
        const error = await res.json();
        toast.error(error.message || "Failed to delete template");
      }
    } catch (err) {
      console.error("Error deleting saved template:", err);
      toast.error("Error deleting template. Please try again.");
    } finally {
      setDeletingSaved(false);
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

  const handleThumbnailEdit = (template: any) => {
    setEditingThumbnailTemplate(template);
    setThumbnailValue(template.thumbnail || "");
    setThumbnailLink(template.thumbnail && !template.thumbnail.startsWith("data:") ? template.thumbnail : "");
    setThumbnailInputMode(template.thumbnail && template.thumbnail.startsWith("data:") ? "upload" : "link");
    setShowThumbnailModal(true);
  };

  const handleUpdateProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    if (!validateApiUrl()) {
      toast.error("API configuration error. Please check your environment variables.");
      return;
    }

    setUpdatingProfile(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/users/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          bio: profileBio,
          portfolioLink: profilePortfolioLink,
          avatar: profileAvatar,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        // Update local user state
        const updatedUser = { ...user, ...data.user };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        toast.success("Profile updated successfully!");
      } else {
        const error = await res.json();
        toast.error(error.message || "Failed to update profile");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error("Error updating profile. Please try again.");
    } finally {
      setUpdatingProfile(false);
    }
  };

  const handleThumbnailUpdate = async () => {
    if (!editingThumbnailTemplate) return;
    if (!localStorage.getItem("token")) return;
    if (!validateApiUrl()) {
      toast.error("API configuration error. Please check your environment variables.");
      return;
    }

    setUpdatingThumbnail(true);
    const token = localStorage.getItem("token");

    try {
      const thumbnailToSend = thumbnailInputMode === "link" && thumbnailLink.trim() 
        ? thumbnailLink.trim() 
        : thumbnailValue;

      const res = await fetch(`${API_BASE_URL}/api/templates/saved/${editingThumbnailTemplate._id}/thumbnail`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ thumbnail: thumbnailToSend || "" }),
      });

      if (res.ok) {
        const data = await res.json();
        // Update local state
        setSavedTemplates((prev) =>
          prev.map((t) =>
            t._id === editingThumbnailTemplate._id ? data.template : t
          )
        );
        setShowThumbnailModal(false);
        setEditingThumbnailTemplate(null);
        setThumbnailValue("");
        setThumbnailLink("");
        toast.success("Thumbnail updated successfully!");
      } else {
        const error = await res.json();
        toast.error(error.message || "Failed to update thumbnail");
      }
    } catch (err) {
      console.error("Error updating thumbnail:", err);
      toast.error("Error updating thumbnail. Please check your connection.");
    } finally {
      setUpdatingThumbnail(false);
    }
  };

  const handleVisibilityChange = (template: any) => {
    setSelectedTemplate(template);
    setNewVisibility(!template.isPublic);
    setShowVisibilityModal(true);
  };

  const confirmVisibilityChange = async () => {
    if (!selectedTemplate) return;
    
    const token = localStorage.getItem("token");
    if (!token) return;

    setUpdatingVisibility(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/templates/saved/${selectedTemplate._id}/visibility`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isPublic: newVisibility }),
      });

      if (res.ok) {
        const data = await res.json();
        // Update the template in the list
        setSavedTemplates(savedTemplates.map(t => 
          t._id === selectedTemplate._id ? { ...t, isPublic: newVisibility, ...data.template } : t
        ));
        setShowVisibilityModal(false);
        setSelectedTemplate(null);
        
        // Show success message
        if (newVisibility) {
          toast.success("Template is now public! It will be visible to all users on the Templates page.", {
            duration: 5000,
          });
        } else {
          toast.success("Template is now private. Only you can see it.", {
            duration: 4000,
          });
        }
      } else {
        const error = await res.json();
        toast.error(error.message || "Failed to update visibility");
      }
    } catch (err) {
      console.error("Error updating visibility:", err);
      toast.error("Failed to update visibility. Please check your connection.");
    } finally {
      setUpdatingVisibility(false);
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

  // Dashboard stats
  const stats = {
    totalTemplates: savedTemplates.length,
    publicTemplates: savedTemplates.filter(t => t.isPublic).length,
    privateTemplates: savedTemplates.filter(t => !t.isPublic).length,
    totalExports: exportedTemplates.length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Dashboard Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-2">
                Dashboard
              </h1>
              <p className="text-gray-400">
                Welcome back, {user?.name || "User"}
              </p>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <div className="px-4 py-2 bg-white/5 rounded-lg border border-white/10">
                <span className="text-sm text-gray-400">Total Templates</span>
                <div className="text-2xl font-bold text-white">{stats.totalTemplates}</div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-2">
                <Save className="text-purple-400" size={24} />
                <TrendingUp className="text-green-400" size={20} />
              </div>
              <div className="text-3xl font-bold text-white mb-1">{stats.totalTemplates}</div>
              <div className="text-sm text-gray-400">Total Templates</div>
            </div>
            
            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-2">
                <Globe className="text-green-400" size={24} />
                <Users className="text-blue-400" size={20} />
              </div>
              <div className="text-3xl font-bold text-white mb-1">{stats.publicTemplates}</div>
              <div className="text-sm text-gray-400">Public Templates</div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-2">
                <Lock className="text-blue-400" size={24} />
                <BarChart3 className="text-purple-400" size={20} />
              </div>
              <div className="text-3xl font-bold text-white mb-1">{stats.privateTemplates}</div>
              <div className="text-sm text-gray-400">Private Templates</div>
            </div>
            
            <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-2">
                <Download className="text-orange-400" size={24} />
                <TrendingUp className="text-green-400" size={20} />
              </div>
              <div className="text-3xl font-bold text-white mb-1">{stats.totalExports}</div>
              <div className="text-sm text-gray-400">Total Exports</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-white/10 pb-4">
          <button
            onClick={() => setActiveTab("wishlist")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === "wishlist"
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25"
                : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
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
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25"
                : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
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
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25"
                : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
            }`}
          >
            <div className="flex items-center gap-2">
              <Download size={18} />
              Exported Templates ({exportedTemplates.length})
            </div>
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === "profile"
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25"
                : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
            }`}
          >
            <div className="flex items-center gap-2">
              <User size={18} />
              Profile
            </div>
          </button>
        </div>

        {/* Content */}
        <div>
          {/* WISHLIST TAB */}
          {activeTab === "wishlist" && (
            <div>
              {wishlist.length === 0 ? (
                <div className="text-center py-16 bg-white/5 rounded-2xl border border-white/10">
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
                            onClick={() => handleRemoveWishlistClick(item.templateSlug, item.templateName)}
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

          {/* SAVED TEMPLATES TAB */}
          {activeTab === "saved" && (
            <div>
              {savedTemplates.length === 0 ? (
                <div className="text-center py-16 bg-white/5 rounded-2xl border border-white/10">
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
                      <div className="relative group">
                        {template.thumbnail ? (
                          <img
                            src={template.thumbnail}
                            alt={template.name}
                            className="w-full h-48 object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200'%3E%3Crect fill='%23333' width='400' height='200'/%3E%3Ctext fill='%23999' font-family='sans-serif' font-size='18' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3ENo Image%3C/text%3E%3C/svg%3E";
                            }}
                          />
                        ) : (
                          <div className="w-full h-48 bg-white/5 flex items-center justify-center">
                            <ImageIcon className="text-gray-500" size={32} />
                          </div>
                        )}
                        {/* Edit Thumbnail Button */}
                        <button
                          onClick={() => handleThumbnailEdit(template)}
                          className="absolute top-2 right-2 p-2 bg-black/60 hover:bg-black/80 text-white rounded-lg transition-all opacity-0 group-hover:opacity-100"
                          title="Edit thumbnail"
                        >
                          <Edit size={16} />
                        </button>
                      </div>
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-xl font-bold text-white flex-1">{template.name}</h3>
                          {/* Visibility Toggle */}
                          <button
                            onClick={() => handleVisibilityChange(template)}
                            className={`p-2 rounded-lg transition-all ${
                              template.isPublic
                                ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                                : "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
                            }`}
                            title={template.isPublic ? "Public - Click to make private" : "Private - Click to make public"}
                          >
                            {template.isPublic ? <Globe size={18} /> : <Lock size={18} />}
                          </button>
                        </div>
                        
                        <div className="mb-3">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                            template.isPublic
                              ? "bg-green-500/20 text-green-400 border border-green-500/30"
                              : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                          }`}>
                            {template.isPublic ? "Public" : "Private"}
                          </span>
                        </div>

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
                              localStorage.setItem("savedTemplate", JSON.stringify(template));
                              router.push(`/builder?saved=${template._id}`);
                            }}
                            className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:scale-105 transition-transform text-sm flex items-center justify-center gap-2"
                          >
                            <Edit size={16} />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteSavedClick(template._id, template.name)}
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
                <div className="text-center py-16 bg-white/5 rounded-2xl border border-white/10">
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

          {/* PROFILE TAB */}
          {activeTab === "profile" && (
            <div className="max-w-3xl mx-auto">
              <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl p-8 border border-white/10 shadow-xl">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <User size={24} />
                  Edit Profile
                </h2>

                {/* Avatar Section */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-300 mb-3">Profile Avatar</label>
                  <div className="flex items-center gap-4">
                    {profileAvatar ? (
                      <img
                        src={profileAvatar}
                        alt="Avatar"
                        className="w-24 h-24 rounded-full border-4 border-purple-500/50 object-cover"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full border-4 border-purple-500/50 bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                        <User size={40} className="text-white" />
                      </div>
                    )}
                    <div className="flex-1">
                      <input
                        type="text"
                        value={profileAvatar}
                        onChange={(e) => setProfileAvatar(e.target.value)}
                        placeholder="Avatar URL (or leave empty for default)"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                      />
                      <p className="text-xs text-gray-500 mt-2">Enter an image URL for your profile picture</p>
                    </div>
                  </div>
                </div>

                {/* Bio Section */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-300 mb-3">Bio</label>
                  <textarea
                    value={profileBio}
                    onChange={(e) => setProfileBio(e.target.value)}
                    placeholder="Tell us about yourself..."
                    rows={4}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all resize-none"
                  />
                </div>

                {/* Portfolio Link Section */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                    <LinkIcon size={16} />
                    Portfolio / Resume Link
                  </label>
                  <input
                    type="url"
                    value={profilePortfolioLink}
                    onChange={(e) => setProfilePortfolioLink(e.target.value)}
                    placeholder="https://your-portfolio.com or link to your resume"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                  />
                  <p className="text-xs text-gray-500 mt-2">Add a link to your portfolio, resume, or personal website</p>
                </div>

                {/* User Info (Read-only) */}
                <div className="mb-6 p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Name:</span>
                      <p className="text-white font-semibold">{user?.name}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Username:</span>
                      <p className="text-white font-semibold">@{user?.username}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Email:</span>
                      <p className="text-white font-semibold">{user?.email}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Member Since:</span>
                      <p className="text-white font-semibold">
                        {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <button
                  onClick={handleUpdateProfile}
                  disabled={updatingProfile}
                  className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {updatingProfile ? "Updating..." : "Save Profile"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Visibility Confirmation Modal */}
      {showVisibilityModal && selectedTemplate && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-xl flex justify-center items-center z-[10001] p-4 animate-fadeIn"
          onClick={() => {
            if (!updatingVisibility) {
              setShowVisibilityModal(false);
              setSelectedTemplate(null);
            }
          }}
        >
          <div
            className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl p-8 max-w-md w-full border border-white/10 shadow-2xl animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6">
              <div className="flex items-center justify-center w-16 h-16 bg-purple-500/20 rounded-full mb-4 mx-auto">
                {newVisibility ? (
                  <Globe className="text-purple-400" size={32} />
                ) : (
                  <Lock className="text-blue-400" size={32} />
                )}
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 text-center">
                {newVisibility ? "Make Template Public?" : "Make Template Private?"}
              </h3>
              <p className="text-gray-400 text-sm text-center">
                {newVisibility
                  ? "This template will be visible to all users. They can view, edit, and export it."
                  : "This template will only be visible to you. Other users won't be able to see it."}
              </p>
            </div>
            
            <div className="bg-white/5 rounded-lg p-4 mb-6 border border-white/10">
              <div className="text-sm text-gray-300 mb-1">Template Name</div>
              <div className="text-lg font-semibold text-white">{selectedTemplate.name}</div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={confirmVisibilityChange}
                disabled={updatingVisibility}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {updatingVisibility ? "Updating..." : "Confirm"}
              </button>
              <button
                onClick={() => {
                  if (!updatingVisibility) {
                    setShowVisibilityModal(false);
                    setSelectedTemplate(null);
                  }
                }}
                disabled={updatingVisibility}
                className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-lg font-semibold transition-all border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Thumbnail Edit Modal */}
      {showThumbnailModal && editingThumbnailTemplate && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-xl flex justify-center items-center z-[10001] p-4 animate-fadeIn"
          onClick={() => {
            if (!updatingThumbnail) {
              setShowThumbnailModal(false);
              setEditingThumbnailTemplate(null);
            }
          }}
        >
          <div
            className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl p-8 max-w-md w-full border border-white/10 shadow-2xl animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">Edit Thumbnail</h3>
              <p className="text-gray-400 text-sm">Update the thumbnail image for {editingThumbnailTemplate.name}</p>
            </div>

            {/* Mode Toggle */}
            <div className="flex gap-2 mb-4">
              <button
                type="button"
                onClick={() => {
                  setThumbnailInputMode("upload");
                  setThumbnailLink("");
                }}
                disabled={updatingThumbnail}
                className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                  thumbnailInputMode === "upload"
                    ? "bg-purple-500/20 border-2 border-purple-500/50 text-purple-400"
                    : "bg-white/5 border-2 border-white/10 text-gray-400 hover:border-white/20"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                Upload
              </button>
              <button
                type="button"
                onClick={() => {
                  setThumbnailInputMode("link");
                  setThumbnailValue("");
                }}
                disabled={updatingThumbnail}
                className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                  thumbnailInputMode === "link"
                    ? "bg-purple-500/20 border-2 border-purple-500/50 text-purple-400"
                    : "bg-white/5 border-2 border-white/10 text-gray-400 hover:border-white/20"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                Link
              </button>
            </div>

            {/* Upload Mode */}
            {thumbnailInputMode === "upload" && (
              <div>
                {/* Preview */}
                {thumbnailValue && (
                  <div className="relative mb-3 group">
                    <img
                      src={thumbnailValue}
                      alt="Thumbnail preview"
                      className="w-full h-32 object-cover rounded-lg border border-white/10"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setThumbnailValue("");
                      }}
                      disabled={updatingThumbnail}
                      className="absolute top-2 right-2 p-1.5 bg-red-500/80 hover:bg-red-500 text-white rounded-lg transition-colors disabled:opacity-50"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}

                {/* Drag & Drop Area */}
                <label
                  className={`w-full border-2 border-dashed rounded-lg p-6 cursor-pointer transition-all outline-none focus:outline-none box-border overflow-hidden ${
                    thumbnailValue
                      ? "border-white/10 bg-white/5"
                      : "border-white/20 hover:border-purple-500/50 hover:bg-white/5"
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                  onDragOver={(e) => {
                    e.preventDefault();
                    if (!updatingThumbnail) {
                      e.currentTarget.classList.add("border-purple-500", "bg-white/5");
                    }
                  }}
                  onDragLeave={(e) => {
                    e.preventDefault();
                    e.currentTarget.classList.remove("border-purple-500", "bg-white/5");
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    e.currentTarget.classList.remove("border-purple-500", "bg-white/5");
                    if (updatingThumbnail) return;
                    const file = e.dataTransfer.files?.[0];
                    if (file) {
                      if (file.size > 5 * 1024 * 1024) {
                        toast.error("File size must be less than 5MB");
                        return;
                      }
                      if (!file.type.startsWith("image/")) {
                        toast.error("Only image files are allowed");
                        return;
                      }
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setThumbnailValue(reader.result as string);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                >
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden outline-none focus:outline-none"
                    disabled={updatingThumbnail}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        if (file.size > 5 * 1024 * 1024) {
                          toast.error("File size must be less than 5MB");
                          return;
                        }
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setThumbnailValue(reader.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  <div className="flex flex-col items-center gap-2 text-center">
                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center">
                      <Upload size={20} className="text-gray-400" />
                    </div>
                    <span className="text-sm font-medium text-gray-300">
                      {thumbnailValue ? "Change thumbnail" : "Drag & drop or click to upload"}
                    </span>
                    <span className="text-xs text-gray-500">PNG, JPG up to 5MB</span>
                  </div>
                </label>
              </div>
            )}

            {/* Link Mode */}
            {thumbnailInputMode === "link" && (
              <div>
                {/* Preview */}
                {thumbnailLink && (
                  <div className="relative mb-3 group">
                    <img
                      src={thumbnailLink}
                      alt="Thumbnail preview"
                      className="w-full h-32 object-cover rounded-lg border border-white/10"
                      onError={() => {
                        toast.error("Invalid image URL");
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setThumbnailLink("");
                      }}
                      disabled={updatingThumbnail}
                      className="absolute top-2 right-2 p-1.5 bg-red-500/80 hover:bg-red-500 text-white rounded-lg transition-colors disabled:opacity-50"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}

                {/* URL Input */}
                <input
                  type="url"
                  value={thumbnailLink}
                  onChange={(e) => setThumbnailLink(e.target.value)}
                  placeholder="Paste image URL here..."
                  disabled={updatingThumbnail}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                />
              </div>
            )}

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleThumbnailUpdate}
                disabled={updatingThumbnail || (thumbnailInputMode === "link" && !thumbnailLink.trim() && !thumbnailValue) || (thumbnailInputMode === "upload" && !thumbnailValue)}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {updatingThumbnail ? "Updating..." : "Update"}
              </button>
              <button
                onClick={() => {
                  if (!updatingThumbnail) {
                    setShowThumbnailModal(false);
                    setEditingThumbnailTemplate(null);
                    setThumbnailValue("");
                    setThumbnailLink("");
                  }
                }}
                disabled={updatingThumbnail}
                className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-lg font-semibold transition-all border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Saved Template Confirmation Modal */}
      {showDeleteSavedModal && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-xl flex justify-center items-center z-[10001] p-4 animate-fadeIn"
          onClick={() => {
            if (!deletingSaved) {
              setShowDeleteSavedModal(false);
              setDeleteSavedId(null);
              setDeleteSavedName("");
            }
          }}
        >
          <div
            className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl p-8 max-w-md w-full border border-white/10 shadow-2xl animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6">
              <div className="flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-full mb-4 mx-auto">
                <Trash2 className="text-red-400" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 text-center">
                Delete Template?
              </h3>
              <p className="text-gray-400 text-sm text-center">
                Are you sure you want to delete "{deleteSavedName}"? This action cannot be undone.
              </p>
            </div>
            
            <div className="bg-white/5 rounded-lg p-4 mb-6 border border-white/10">
              <div className="text-sm text-gray-300 mb-1">Template Name</div>
              <div className="text-lg font-semibold text-white">{deleteSavedName}</div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={confirmDeleteSaved}
                disabled={deletingSaved}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white rounded-lg font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {deletingSaved ? "Deleting..." : "Delete"}
              </button>
              <button
                onClick={() => {
                  if (!deletingSaved) {
                    setShowDeleteSavedModal(false);
                    setDeleteSavedId(null);
                    setDeleteSavedName("");
                  }
                }}
                disabled={deletingSaved}
                className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-lg font-semibold transition-all border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Wishlist Item Confirmation Modal */}
      {showDeleteWishlistModal && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-xl flex justify-center items-center z-[10001] p-4 animate-fadeIn"
          onClick={() => {
            if (!deletingWishlist) {
              setShowDeleteWishlistModal(false);
              setDeleteWishlistSlug(null);
              setDeleteWishlistName("");
            }
          }}
        >
          <div
            className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl p-8 max-w-md w-full border border-white/10 shadow-2xl animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6">
              <div className="flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-full mb-4 mx-auto">
                <Trash2 className="text-red-400" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 text-center">
                Remove from Wishlist?
              </h3>
              <p className="text-gray-400 text-sm text-center">
                Are you sure you want to remove "{deleteWishlistName}" from your wishlist? You can add it back anytime.
              </p>
            </div>
            
            <div className="bg-white/5 rounded-lg p-4 mb-6 border border-white/10">
              <div className="text-sm text-gray-300 mb-1">Template Name</div>
              <div className="text-lg font-semibold text-white">{deleteWishlistName}</div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={confirmDeleteWishlist}
                disabled={deletingWishlist}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white rounded-lg font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {deletingWishlist ? "Removing..." : "Remove"}
              </button>
              <button
                onClick={() => {
                  if (!deletingWishlist) {
                    setShowDeleteWishlistModal(false);
                    setDeleteWishlistSlug(null);
                    setDeleteWishlistName("");
                  }
                }}
                disabled={deletingWishlist}
                className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-lg font-semibold transition-all border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
