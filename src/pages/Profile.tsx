import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import { User, Camera, Save } from 'lucide-react';

const Profile = () => {
    const { user, updateProfilePicture, updateProfile } = useAuth();
    const navigate = useNavigate();

    const [fullName, setFullName] = useState(user?.fullName || '');
    const [username, setUsername] = useState(user?.username || '');
    const [email] = useState(user?.email || '');
    const [profilePicture, setProfilePicture] = useState(user?.profilePicture || '');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    if (!user) {
        navigate('/login');
        return null;
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Check file size (limit to 2MB before compression)
            if (file.size > 2 * 1024 * 1024) {
                setError('Image is too large. Please choose an image smaller than 2MB.');
                return;
            }

            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    // Create canvas for compression
                    const canvas = document.createElement('canvas');
                    const maxSize = 300; // Max width/height
                    let width = img.width;
                    let height = img.height;

                    // Calculate new dimensions
                    if (width > height) {
                        if (width > maxSize) {
                            height *= maxSize / width;
                            width = maxSize;
                        }
                    } else {
                        if (height > maxSize) {
                            width *= maxSize / height;
                            height = maxSize;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;

                    const ctx = canvas.getContext('2d');
                    ctx?.drawImage(img, 0, 0, width, height);

                    // Convert to base64 with compression (0.7 quality)
                    const compressedImage = canvas.toDataURL('image/jpeg', 0.7);
                    setProfilePicture(compressedImage);
                };
                img.src = event.target?.result as string;
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        try {
            setError('');

            // Update profile picture if changed
            if (profilePicture !== user.profilePicture) {
                updateProfilePicture(profilePicture);
            }

            // Update name if changed
            if (fullName !== user.fullName || username !== user.username) {
                updateProfile(fullName, username);
            }

            setSuccess('Profile updated successfully!');
            setTimeout(() => setSuccess(''), 3000);
        } catch (err: any) {
            if (err.name === 'QuotaExceededError' || err.message?.includes('quota')) {
                setError('Storage limit exceeded. Try a smaller profile picture.');
            } else {
                setError(err.message || 'Failed to update profile');
            }
        }
    };

    return (
        <div className="min-h-screen bg-surface">
            <Navbar />

            <div className="max-w-2xl mx-auto px-4 py-12">
                <div className="bg-white border-2 border-black shadow-brutal rounded-xl p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <User className="w-8 h-8" />
                        <h1 className="text-3xl font-bold">Profile Settings</h1>
                    </div>

                    {/* Profile Picture */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="relative group">
                            {profilePicture ? (
                                <img
                                    src={profilePicture}
                                    alt={fullName}
                                    className="w-32 h-32 rounded-full border-4 border-black object-cover"
                                />
                            ) : (
                                <div className="w-32 h-32 rounded-full border-4 border-black bg-primary flex items-center justify-center text-white font-bold text-4xl">
                                    {fullName.split(' ').map(n => n[0]).join('').toUpperCase()}
                                </div>
                            )}

                            <label className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full border-2 border-black cursor-pointer hover:bg-primary/90 transition-all">
                                <Camera className="w-5 h-5" />
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageUpload}
                                />
                            </label>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">Click camera to upload new photo</p>
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="w-full px-4 py-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Username
                            </label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                disabled
                                className="w-full px-4 py-2 border-2 border-black rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                            />
                            <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                        </div>
                    </div>

                    {/* Messages */}
                    {success && (
                        <div className="mt-6 bg-green-50 border-2 border-green-500 text-green-700 px-4 py-3 rounded-lg">
                            {success}
                        </div>
                    )}

                    {error && (
                        <div className="mt-6 bg-red-50 border-2 border-red-500 text-red-700 px-4 py-3 rounded-lg">
                            {error}
                        </div>
                    )}

                    {/* Buttons */}
                    <div className="flex gap-4 mt-8">
                        <button
                            onClick={() => navigate('/')}
                            className="flex-1 px-6 py-3 bg-white text-gray-700 font-bold rounded-lg border-2 border-black shadow-brutal-sm hover:shadow-none transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="flex-1 px-6 py-3 bg-primary text-white font-bold rounded-lg border-2 border-black shadow-brutal hover:shadow-none transition-all flex items-center justify-center gap-2"
                        >
                            <Save className="w-5 h-5" />
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
