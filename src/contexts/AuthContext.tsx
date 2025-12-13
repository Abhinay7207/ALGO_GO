import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

interface User {
    id: string;
    email: string;
    username: string;
    fullName: string;
    profilePicture?: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    signUp: (email: string, password: string, username: string, fullName: string) => Promise<void>;
    signIn: (email: string, password: string) => Promise<void>;
    signInWithGoogle: () => Promise<void>;
    signInWithApple: () => Promise<void>;
    signOut: () => Promise<void>;
    updateProfilePicture: (imageData: string) => void;
    updateProfile: (fullName: string, username: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for existing user in localStorage
        const storedUser = localStorage.getItem('mockUser');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const signUp = async (email: string, _password: string, username: string, fullName: string) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // Check if user already exists
        const existingUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]');
        if (existingUsers.some((u: User) => u.email === email)) {
            throw new Error('User already exists');
        }

        // Create new user
        const newUser: User = {
            id: Math.random().toString(36).substr(2, 9),
            email,
            username,
            fullName,
        };

        // Save to users list
        existingUsers.push(newUser);
        localStorage.setItem('mockUsers', JSON.stringify(existingUsers));

        // Auto login
        localStorage.setItem('mockUser', JSON.stringify(newUser));
        setUser(newUser);
    };

    const signIn = async (email: string, _password: string) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        const existingUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]');
        const foundUser = existingUsers.find((u: User) => u.email === email);

        if (!foundUser) {
            throw new Error('Invalid credentials');
        }

        localStorage.setItem('mockUser', JSON.stringify(foundUser));
        setUser(foundUser);
    };

    const signInWithGoogle = async () => {
        // Simulate OAuth delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        const mockGoogleUser: User = {
            id: Math.random().toString(36).substr(2, 9),
            email: 'user@gmail.com',
            username: 'googleuser',
            fullName: 'Google User',
        };

        localStorage.setItem('mockUser', JSON.stringify(mockGoogleUser));
        setUser(mockGoogleUser);
    };

    const signInWithApple = async () => {
        // Simulate OAuth delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        const mockAppleUser: User = {
            id: Math.random().toString(36).substr(2, 9),
            email: 'user@icloud.com',
            username: 'appleuser',
            fullName: 'Apple User',
        };

        localStorage.setItem('mockUser', JSON.stringify(mockAppleUser));
        setUser(mockAppleUser);
    };

    const signOut = async () => {
        localStorage.removeItem('mockUser');
        setUser(null);
    };

    const updateProfilePicture = (imageData: string) => {
        if (!user) return;

        const updatedUser = { ...user, profilePicture: imageData };
        localStorage.setItem('mockUser', JSON.stringify(updatedUser));
        setUser(updatedUser);

        // Update in users list too
        const existingUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]');
        const userIndex = existingUsers.findIndex((u: User) => u.id === user.id);
        if (userIndex !== -1) {
            existingUsers[userIndex] = updatedUser;
            localStorage.setItem('mockUsers', JSON.stringify(existingUsers));
        }
    };

    const updateProfile = (fullName: string, username: string) => {
        if (!user) return;

        const updatedUser = { ...user, fullName, username };
        localStorage.setItem('mockUser', JSON.stringify(updatedUser));
        setUser(updatedUser);

        // Update in users list too
        const existingUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]');
        const userIndex = existingUsers.findIndex((u: User) => u.id === user.id);
        if (userIndex !== -1) {
            existingUsers[userIndex] = updatedUser;
            localStorage.setItem('mockUsers', JSON.stringify(existingUsers));
        }
    };

    const value = {
        user,
        loading,
        signUp,
        signIn,
        signInWithGoogle,
        signInWithApple,
        signOut,
        updateProfilePicture,
        updateProfile,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
